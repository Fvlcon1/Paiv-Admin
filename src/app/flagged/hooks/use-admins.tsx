import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useFlaggedContext } from "../context/flagged-context"

export interface Admin {
    id: string,
    email: string,
    name: string,
    lastActive: string
}

const transformResponseToAdmins = (response: any): Admin => {
    const { id, email, name, last_active } = response
    return {
        id, email, name, lastActive: last_active
    }
}

const useAdmins = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
    const { refetchFlaggedClaims } = useFlaggedContext()
    const { selectedEncounterIds, setSelectedEncounterIds } = useFlaggedContext()
    const [admins, setAdmins] = useState<Admin[]>([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const getAdmins = async () => {
        const response = await protectedApi.GET("superadmin/accounts", { search: debouncedSearchQuery || undefined })
        const transformedResponse = response.map(transformResponseToAdmins)
        setAdmins(transformedResponse)
        return transformedResponse
    }

    const { data: adminsData, isLoading: adminsLoading, error: adminsError } = useQuery({
        queryKey: ["admins", debouncedSearchQuery],
        queryFn: getAdmins
    })

    useEffect(() => {
        console.log({adminsData})
    }, [adminsData])

    const assignToAdmin = async (encounterIds: string[], adminId: string) => {
        const response = await protectedApi.POST(`v2/flagged-claims/assign`, {
            admin_id: adminId,
            encounter_ids: encounterIds
        })
        return response
    }

    const { mutateAsync: assignToAdminMutation, isPending: assignToAdminLoading, error: assignToAdminError, isSuccess: assignToAdminSuccess } = useMutation({
        mutationFn: async ({ encounterIds, adminId }: { encounterIds: string[], adminId: string }) => await assignToAdmin(encounterIds, adminId),
        onSuccess: () => {
            toast.success("Claim assigned successfully")
            refetchFlaggedClaims()
        },
        onError: () => {
            toast.error("Failed to assign claim")
        },
    })

    const reAssignAdmin = async (encounterId: string, adminId: string) => {
        const response = await protectedApi.POST(`v2/flagged-claims/${encounterId}/reassign`, {
            admin_id: adminId,
            encounter_ids: [encounterId]
        })
        return response
    }

    const { mutateAsync: reAssignAdminMutation, isPending: reAssignAdminLoading, error: reAssignAdminError, isSuccess: reAssignAdminSuccess } = useMutation({
        mutationFn: async ({ encounterId, adminId }: { encounterId: string, adminId: string }) => await reAssignAdmin(encounterId, adminId),
        onSuccess: () => {
            toast.success("Claim re-assigned successfully")
            refetchFlaggedClaims()
        },
        onError: () => {
            toast.error("Failed to re-assign claim")
        },
    })

    const assignToMultipleAdmins = async () => {
        const response = await protectedApi.POST("v2/flagged-claims/assign", {
            admin_id: selectedEncounterIds,
            encounter_ids: selectedEncounterIds
        })
        return response
    }

    const { mutateAsync: assignToMultipleAdminsMutation, isPending: assignToMultipleAdminsLoading, error: assignToMultipleAdminsError, isSuccess: assignToMultipleAdminsSuccess } = useMutation({
        mutationFn: assignToMultipleAdmins,
        onSuccess: () => {
            toast.success("Claims assigned successfully")
            refetchFlaggedClaims()
        },
        onError: () => {
            toast.error("Failed to assign claims")
        },
    })

    const unAssignAdmin = async (encounterId: string) => {
        console.log({encounterId})
        console.log({link : `v2/flagged-claims/${encounterId}/unassign`})
        const response = await protectedApi.POST(`v2/flagged-claims/${encounterId}/unassign`)
        return response
    }

    const { mutateAsync: unAssignAdminMutation, isPending: unAssignAdminLoading, error: unAssignAdminError, isSuccess: unAssignAdminSuccess } = useMutation({
        mutationFn: unAssignAdmin,
        onSuccess: () => {
            toast.success("Claim unassigned successfully")
            refetchFlaggedClaims()
        },
        onError: () => {
            toast.error("Failed to unassign claim")
        },
    })

    return {
        admins,
        adminsLoading,
        adminsError,
        searchQuery,
        setSearchQuery,
        assignToAdminMutation,
        assignToAdminLoading,
        assignToAdminError,
        assignToAdminSuccess,
        assignToMultipleAdminsMutation,
        assignToMultipleAdminsLoading,
        assignToMultipleAdminsError,
        assignToMultipleAdminsSuccess,
        unAssignAdminMutation,
        unAssignAdminLoading,
        unAssignAdminError,
        unAssignAdminSuccess,
        reAssignAdminMutation,
        reAssignAdminLoading,
        reAssignAdminError,
        reAssignAdminSuccess
    }
}
export default useAdmins