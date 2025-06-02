import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"

const useDiagnosisData = () => {
    const getDiagnosisData = async () => {
        const response = await protectedApi.GET("/analytics/top-diagnoses")
        console.log({topDiagnoses : response})
        return response
    }
    const { data: diagnosisData, isPending: isDiagnosisDataPending } = useQuery({
        queryFn: getDiagnosisData,
        queryKey: ["diagnosis-data"],
        refetchOnMount: true,
    })
    return {
        diagnosisData,
        isDiagnosisDataPending
    }
}
export default useDiagnosisData