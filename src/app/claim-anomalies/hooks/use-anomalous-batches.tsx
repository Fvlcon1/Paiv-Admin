import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { transformAnomalousBatches } from "../utils/transform-anomalous-batches"
import useExplorer from "@/app/claim-explorer/hooks/use-explorer"

const useAnomalousBatches = () => {
    const {providers} = useExplorer()
    const getAnomalousBatches = async () => {
        const response = await protectedApi.GET("/v2/claims-explorer/facilities/months", {
            is_anomalous : true
        })
        const transformedResponse = transformAnomalousBatches(response)
        return transformedResponse
    }

    const {data : anomalousBatches, isLoading : anomalousBatchesLoading, error : anomalousBatchesError, refetch : refetchAnomalousBatches} = useQuery({
        queryKey : ["anomalous-batches"],
        queryFn : getAnomalousBatches
    })
    return {
        anomalousBatches,
        anomalousBatchesLoading,
        anomalousBatchesError,
        refetchAnomalousBatches,
        providers
    }
}
export default useAnomalousBatches