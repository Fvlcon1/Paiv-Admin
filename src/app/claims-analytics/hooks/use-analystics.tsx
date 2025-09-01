import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { useAnalyticsContext } from "../context/context"
import { useEffect, useState } from "react"

const useAnalytics = () => {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const getClaimsSubmittedOvertime = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-time", {
            group_by : "month",
            year : "2025",
            region : selectedRegions[0],
            district : selectedDistricts[0],
            facility_name : selectedFacilities[0]
        })
        console.log({response})
        return response
    }

    useEffect(() => {
        console.log({selectedRegions, selectedDistricts, selectedFacilities})
    }, [selectedRegions, selectedDistricts, selectedFacilities])

    const getTotalApprovedAmount = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-time", {
            group_by : "month",
            year : "2025",
            metric : "approved_amount",
            region : selectedRegions[0],
            district : selectedDistricts[0],
            facility_name : selectedFacilities[0]
        })
        console.log({response})
        return response
    }

    const getTopDiagnosis = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-diagnosis", {
            group_by : "month",
            year : "2025",
            region : selectedRegions[0],
            district : selectedDistricts[0],
            facility_name : selectedFacilities[0]
        })
        console.log({response})
        return response
    }

    const getKPISummary = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/summary")
        console.log({response})
        return response
    }

    const {data: kpiSummary, isLoading: isKpiSummaryPending} = useQuery({
        queryKey: ["kpi-summary", selectedRegions, selectedDistricts, selectedFacilities],
        queryFn: getKPISummary,
        refetchOnMount: true,
    })

    const {data: claimsSubmittedOvertime, isLoading: isClaimsSubmittedOvertimePending} = useQuery({
        queryKey: ["claims-submitted-overtime", selectedRegions, selectedDistricts, selectedFacilities],
        queryFn: getClaimsSubmittedOvertime,
        refetchOnMount: true,
    })

    const {data: totalApprovedAmount, isLoading: isTotalApprovedAmountPending} = useQuery({
        queryKey: ["total-approved-amount", selectedRegions, selectedDistricts, selectedFacilities],
        queryFn: getTotalApprovedAmount,
        refetchOnMount: true,
    })

    const {data: topDiagnosis, isLoading: isTopDiagnosisPending} = useQuery({
        queryKey: ["top-diagnosis", selectedRegions, selectedDistricts, selectedFacilities],
        queryFn: getTopDiagnosis,
        refetchOnMount: true,
    })

    return {
        claimsSubmittedOvertime,
        isClaimsSubmittedOvertimePending,
        totalApprovedAmount,
        isTotalApprovedAmountPending,
        topDiagnosis,
        isTopDiagnosisPending,
        kpiSummary,
        isKpiSummaryPending,
        selectedRegions,
        selectedDistricts,
        selectedFacilities,
        setSelectedRegions,
        setSelectedDistricts,
        setSelectedFacilities
    }
}
export default useAnalytics