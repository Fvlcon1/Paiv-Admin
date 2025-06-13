import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useDiagnosisData = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [series, setSeries] = useState<number[]>([])
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

    const getDiagnosisData = async () => {
        const response = await protectedApi.GET("/analytics/top-diagnoses")
        transformToTopDiagnosis(response)
        return response
    }

    const transformToTopDiagnosis = (data: any[]) => {
        const sortedData = [...data].sort((a, b) => a.count - b.count); // ascending sort by count
    
        const categories: string[] = [];
        const diagnosisCodes: string[] = [];
        const series: number[] = [];
    
        sortedData.forEach(item => {
            categories.push(item.diagnosis_name);
            diagnosisCodes.push(item.diagnosis_code);
            series.push(item.count);
        });
    
        setCategories(categories);
        setSeries(series);
        setDiagnosisCodes(diagnosisCodes);
    }
    
    useEffect(()=>{
        if(diagnosisData)
            transformToTopDiagnosis(diagnosisData)
    }, [])

    const { data: diagnosisData, isLoading: isDiagnosisDataPending } = useQuery({
        queryFn: getDiagnosisData,
        queryKey: ["diagnosis-data"],
        refetchOnMount: true,
    })
    return {
        diagnosisData,
        categories,
        series,
        diagnosisCodes,
        isDiagnosisDataPending
    }
}
export default useDiagnosisData