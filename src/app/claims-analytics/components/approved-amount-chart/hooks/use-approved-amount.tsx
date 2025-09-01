import { useAnalyticsContext } from "@/app/claims-analytics/context/context"
import { protectedApi } from "@/app/utils/apis/api"
import { useEffect, useState } from "react"

const useDiagnosisData = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [series, setSeries] = useState<number[]>([])
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const {totalApprovedAmount} = useAnalyticsContext()

    const transformToApprovedAmount = (data: any[]) => {
        const sortedData = [...data].sort((a, b) => a.count - b.count); // ascending sort by count
    
        const categories: string[] = [];
        const diagnosisCodes: string[] = [];
        const series: number[] = [];
    
        sortedData.forEach(item => {
            categories.push(item.month.charAt(0).toUpperCase() + item.month.slice(1));
            diagnosisCodes.push(`${item.month.charAt(0).toUpperCase() + item.month.slice(1)}`);
            series.push(item.approved_amount);
        });
    
        setCategories(categories);
        setSeries(series);
        setDiagnosisCodes(diagnosisCodes);
    }
    
    useEffect(()=>{
        if(totalApprovedAmount)
            transformToApprovedAmount(totalApprovedAmount)
    }, [totalApprovedAmount])

    return {
        categories,
        series,
        diagnosisCodes
    }
}
export default useDiagnosisData