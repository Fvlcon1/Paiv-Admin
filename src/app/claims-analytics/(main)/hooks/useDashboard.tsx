import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useDashboard = () => {
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate] = useState<string>()
    const [selectedHospital, setSelectedHospital] = useState<string>()
    const [selectedRegion, setSelectedRegion] = useState<string>()
    const [selectedDistrict, setSelectedDistrict] = useState<string>()
    const [dashboardData, setDashboardData] = useState<any>()
    
    const getDashboardData = async () => {
        const response = await protectedApi.GET("/analytics/dashboard-summary", {
            params : {
                from_date : startDate,
                to_date : endDate,
                hospital : selectedHospital,
                region : selectedRegion,
                district : selectedDistrict
            }
        })
        setDashboardData(response)
        return response
    }

    const {isPending : isDashboardDataPending, data} = useQuery({
        queryFn : getDashboardData,
        queryKey : ["dashboard-data", startDate, endDate, selectedHospital, selectedRegion, selectedDistrict],
        refetchOnMount: true,
    })

    useEffect(() => {
        if(data)
            setDashboardData(data)
    }, [data])

    return {
        dashboardData,
        setDashboardData,
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