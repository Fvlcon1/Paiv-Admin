import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAdminsContext } from "../context/admins-context"

export interface Admin {
    id: string,
    email: string,
    name: string,
    lastActive: string
}

export type GroupBy = "region" | "district" | "provider" | "batch"

const groupByToQueryKey = {
    region : "region",
    district : "district",
    provider : "facility",
    batch : "facility_month"
}

const transformResponseToAdmins = (response : any) : Admin => {
    const { id, email, name, last_active } = response
    return {
        id, email, name, lastActive: last_active
    }
}

const useAdmins = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([])
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
    const [selectedProviders, setSelectedProviders] = useState<string[]>([])
    const [selectedYearMonths, setSelectedYearMonths] = useState<string[]>([])
    const {selectedAnomalyIds} = useAdminsContext()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const getAdmins = async () => {
        const response = await protectedApi.GET("superadmin/accounts", { search : debouncedSearchQuery || undefined })
        const transformedResponse = response.map(transformResponseToAdmins)
        console.log({transformedResponse})
        return transformedResponse
    }

    const {data : admins, isLoading : adminsLoading, error : adminsError, refetch : refetchAdmins} = useQuery({
        queryKey: ["admins", debouncedSearchQuery],
        queryFn: getAdmins
    })

    const assignToAdmin = async (groupBy : GroupBy, adminId : string, yearMonths : string[], regions : string[], districts : string[], providers : string[]) => {
        console.log({yearMonths})
        const response = await protectedApi.POST("v2/anomaly-metrics/assign", {
            group_by : groupByToQueryKey[groupBy],
            assigned_to : adminId.toString(),
            region: regions,
            district: districts,
            provider_id : providers?.map((item) => item.toString()),
            year_month : yearMonths,
        })
        return response
    }

    const {mutateAsync : assignToAdminMutation, isPending : assignToAdminLoading, error : assignToAdminError, isSuccess : assignToAdminSuccess} = useMutation({
        mutationFn : ({groupBy, adminId, yearMonths, regions, districts, providers} : {groupBy : GroupBy, adminId : string, yearMonths : string[], regions : string[], districts : string[], providers : string[]}) => assignToAdmin(groupBy, adminId, yearMonths, regions, districts, providers),
        onSuccess : () => {
            toast.success("Anomalies assigned successfully")
        },
        onError : () => {
            toast.error("Failed to assign anomalies")
        }
    })

    const unAssignAdmin = async (groupBy : GroupBy, yearMonths : string[], regions : string[], districts : string[], providers : string[]) => {
        const response = await protectedApi.POST("v2/anomaly-metrics/unassign", {
            group_by : groupByToQueryKey[groupBy],
            region: regions,
            district: districts,
            provider_id : providers.map((item) => item.toString()),
            year_month : yearMonths,
        })
        return response
    }

    const {mutateAsync : unAssignAdminMutation, isPending : unAssignAdminLoading, error : unAssignAdminError, isSuccess : unAssignAdminSuccess} = useMutation({
        mutationFn : ({groupBy, yearMonths, regions, districts, providers} : {groupBy : GroupBy, yearMonths : string[], regions : string[], districts : string[], providers : string[]}) => unAssignAdmin(groupBy, yearMonths, regions, districts, providers),
        onSuccess : () => {
            toast.success("Anomalies unassigned successfully")
        },
        onError : () => {
            toast.error("Failed to unassign anomalies")
        }
    })
        

    return {
        admins,
        refetchAdmins,
        adminsLoading,
        adminsError,
        searchQuery,
        setSearchQuery,
        selectedAdmins,
        setSelectedAdmins,
        selectedRegions,
        setSelectedRegions,
        selectedDistricts,
        setSelectedDistricts,
        selectedProviders,
        setSelectedProviders,
        assignToAdminMutation,
        assignToAdminLoading,
        assignToAdminError,
        assignToAdminSuccess,
        unAssignAdminMutation,
        unAssignAdminLoading,
        unAssignAdminError,
        unAssignAdminSuccess,
        selectedYearMonths,
        setSelectedYearMonths
    }
}
export default useAdmins