import { useAnalyticsContext } from "@/app/claims-analytics/context/context"
import { protectedApi } from "@/app/utils/apis/api"
import { useEffect, useState } from "react"

const useDiagnosisData = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [series, setSeries] = useState<number[]>([])
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const {topDiagnosis} = useAnalyticsContext()

    const transformToTopDiagnosis = (data: any[]) => {
        const sortedData = [...data].sort((a, b) => b.count - a.count); // Sort by count in descending order
    
        const categories: string[] = [];
        const diagnosisCodes: string[] = [];
        const series: number[] = [];
    
        sortedData.forEach(item => {
            categories.push(item.diagnosis_name);
            // diagnosisCodes.push(`${item.diagnosis_name.charAt(0).toUpperCase() + item.diagnosis_name.charAt(1).toUpperCase()}`);
            diagnosisCodes.push(`${item.diagnosis_name}`);
            series.push(item.percentage);
        });
    
        setCategories(categories);
        setSeries(series);
        setDiagnosisCodes(diagnosisCodes);
    }
    
    useEffect(()=>{
        if(topDiagnosis)
            transformToTopDiagnosis(topDiagnosis)
    }, [topDiagnosis])

    return {
        categories,
        series,
        diagnosisCodes
    }
}
export default useDiagnosisData