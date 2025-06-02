'use client'

import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import ChartSkeleton from "../chart-skeleton"

const useLineChart = () => {
    const getLineChartData = async () => {
        const response = await protectedApi.GET("/analytics/monthly-breakdown")
        const series = convertToLineChartData(response)
        return series
    }
    const { data: lineChartData, isPending: isLineChartDataPending } = useQuery({
        queryFn: getLineChartData,
        queryKey: ["line-chart-data"],
        refetchOnMount: true,
    })

    const convertToLineChartData = (data: any) => {
        // Initialize arrays with 12 zeros
        const approvedData = new Array(12).fill(0);
        const flaggedData = new Array(12).fill(0);
        const declinedData = new Array(12).fill(0);
        const submittedData = new Array(12).fill(0);

        // Populate data based on the monthlyStats
        data?.forEach(({ month, approved, flagged, declined }: any) => {
            const index = month - 1;
            approvedData[index] = approved;
            flaggedData[index] = flagged;
            declinedData[index] = declined;
            submittedData[index] = approved + flagged + declined;
        });

        // Final series array
        const series = [
            {
                name: 'Submitted',
                data: submittedData
            },
            {
                name: 'Approved',
                data: approvedData
            },
            {
                name: 'Flagged',
                data: flaggedData
            },
            {
                name: 'Declined',
                data: declinedData
            }
        ];
        return series
    }

    return {
        lineChartSeries : lineChartData,
        isLineChartDataPending
    }
}
export default useLineChart