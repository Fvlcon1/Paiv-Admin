'use client'

import { useAnalyticsContext } from "@/app/claims-analytics/context/context"
import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useLineChart = () => {
    const { claimsSubmittedOvertime } = useAnalyticsContext()
    const [series, setSeries] = useState<any[]>([])

    const transformToApprovedAmount = (data: any[]) => {
        const categories: string[] = [];
        const diagnosisCodes: string[] = [];
        const seriesData: number[] = [];

        data.forEach(item => {
            categories.push(item.month.charAt(0).toUpperCase() + item.month.slice(1));
            diagnosisCodes.push(`${item.month.charAt(0).toUpperCase() + item.month.slice(1)}`);
            seriesData.push(item.count);
        });

        const series = [
            {
                name: 'Submitted',
                data: seriesData
            }
        ]
        console.log({series})
        setSeries(series)
    }

    useEffect(()=>{
        if(claimsSubmittedOvertime)
            transformToApprovedAmount(claimsSubmittedOvertime)
    }, [claimsSubmittedOvertime])

    return {
        lineChartSeries: series,
    }
}
export default useLineChart