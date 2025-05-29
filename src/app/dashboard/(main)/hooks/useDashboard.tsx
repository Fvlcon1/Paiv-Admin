import { protectedApi } from "@/app/utils/apis/api"
import { useMutation, useQuery } from "@tanstack/react-query"

const useDashboard = () => {
    const getDashboardData = async () => {
        const response = await protectedApi.GET("/analytics/dashboard-summary")
        return response
    }

    const {data : dashboardData, isPending : isDashboardDataPending} = useQuery({
        queryFn : getDashboardData,
        queryKey : ["dashboard-data"],
        refetchOnMount: true,
    })

    return {
        dashboardData,
        isDashboardDataPending
    }
}

export default useDashboard