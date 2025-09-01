import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"

const transformProviders = (data: any) => {
    return data.map((item: any) => ({
        providerId: item.provider.id,
        providerName: item.provider.facility_name,
        prescribingLevel: item.provider.prescribing_level,
        providerCategory: item.provider.facility_name,
        email: item.provider.org_email,
        credentialStatus: item.provider.credential_status,
        district: item.provider.district,
        lastUpdated: item.provider.last_updated_date,
        totalClaimsSubmitted: item.claims_count,
        totalApprovedAmount: item.provider.total_approved_amount,
    }))
}

const useExplorer = () => {
    const fetchProviders = async () => {
        const response = await protectedApi.GET("/v2/claims-explorer/facilities")
        console.log("what", response.provider)
        console.log({providers : transformProviders(response)})
        return transformProviders(response)
    }

    const {data: providers, isLoading: providersLoading, error: providersError} = useQuery({
        queryKey: ["providers"],
        queryFn: fetchProviders,
    })
    return {
        providers,
        providersLoading,
        providersError
    }
}
export default useExplorer