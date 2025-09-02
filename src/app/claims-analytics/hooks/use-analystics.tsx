import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { useAnalyticsContext } from "../context/context"
import { useEffect, useState } from "react"
import { transformProviders } from "../utils/transform-providers"

const useAnalytics = () => {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const getClaimsSubmittedOvertime = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-time", {
            group_by : "month",
            start_date : startDate.length > 0 ? startDate : undefined,
            end_date : endDate.length > 0 ? endDate : undefined,
            region : selectedRegions,
            district : selectedDistricts,
            facility_name : selectedFacilities
        })
        return response
    }

    const getTotalApprovedAmount = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-time", {
            group_by : "month",
            start_date : startDate.length > 0 ? startDate : undefined,
            end_date : endDate.length > 0 ? endDate : undefined,
            metric : "approved_amount",
            region : selectedRegions,
            district : selectedDistricts,
            facility_name : selectedFacilities
        })
        return response
    }

    const getTopDiagnosis = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/charts-diagnosis", {
            group_by : "month",
            start_date : startDate.length > 0 ? startDate : undefined,
            end_date : endDate.length > 0 ? endDate : undefined,
            region : selectedRegions,
            district : selectedDistricts,
            facility_name : selectedFacilities
        })
        return response
    }

    const getKPISummary = async () => {
        const response = await protectedApi.GET("v2/claims-metrics/summary", {
            start_date : startDate.length > 0 ? startDate : undefined,
            end_date : endDate.length > 0 ? endDate : undefined,
            region : selectedRegions,
            district : selectedDistricts,
            facility_name : selectedFacilities
        })
        return response
    }

    const getAllProviders = async () => {
        const response = await protectedApi.GET("v2/provider-profile/")
        const transformedResponse = transformProviders(response)
        return transformedResponse
    }

    const {data: kpiSummary, isLoading: isKpiSummaryPending} = useQuery({
        queryKey: ["kpi-summary", selectedRegions, selectedDistricts, selectedFacilities, startDate, endDate],
        queryFn: getKPISummary,
        refetchOnMount: true,
    })

    const {data: claimsSubmittedOvertime, isLoading: isClaimsSubmittedOvertimePending} = useQuery({
        queryKey: ["claims-submitted-overtime", selectedRegions, selectedDistricts, selectedFacilities, startDate, endDate],
        queryFn: getClaimsSubmittedOvertime,
        refetchOnMount: true,
    })

    const {data: totalApprovedAmount, isLoading: isTotalApprovedAmountPending} = useQuery({
        queryKey: ["total-approved-amount", selectedRegions, selectedDistricts, selectedFacilities, startDate, endDate],
        queryFn: getTotalApprovedAmount,
        refetchOnMount: true,
    })

    const {data: topDiagnosis, isLoading: isTopDiagnosisPending} = useQuery({
        queryKey: ["top-diagnosis", selectedRegions, selectedDistricts, selectedFacilities, startDate, endDate],
        queryFn: getTopDiagnosis,
        refetchOnMount: true,
    })

    const {data: providers, isLoading: isProvidersPending} = useQuery({
        queryKey: ["providers"],
        queryFn: getAllProviders,
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
        setSelectedFacilities,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        providers,
        isProvidersPending
    }
}
export default useAnalytics