import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

const useDashboard = () => {
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate] = useState<string>()
    const [selectedHospital, setSelectedHospital] = useState<string>()
    const [selectedRegion, setSelectedRegion] = useState<string>()
    const [selectedDistrict, setSelectedDistrict] = useState<string>()
    
    const getDashboardData = async () => {
        const response = await protectedApi.GET("/analytics/dashboard-summary", {
            params : {
                start_date : startDate,
                end_date : endDate,
                hospital : selectedHospital,
                region : selectedRegion,
                district : selectedDistrict
            }
        })
        return response
    }

    const {data : dashboardData, isPending : isDashboardDataPending} = useQuery({
        queryFn : getDashboardData,
        queryKey : ["dashboard-data", startDate, endDate, selectedHospital, selectedRegion, selectedDistrict],
        refetchOnMount: true,
    })

    return {
        dashboardData,
        isDashboardDataPending,
        startDate,
        endDate,
        selectedHospital,
        selectedRegion,
        selectedDistrict,
        setStartDate,
        setEndDate,
        setSelectedHospital,
        setSelectedRegion,
        setSelectedDistrict
    }
}

export default useDashboard