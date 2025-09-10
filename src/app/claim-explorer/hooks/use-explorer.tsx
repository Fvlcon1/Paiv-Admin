import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { transformProviders } from "../utils/transform-providers"
import { useState, useEffect, useCallback } from "react"

const useExplorer = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("")
    const [providerCategory, setProviderCategory] = useState<string>("")
    const [prescriberLevel, setPrescriberLevel] = useState<string>("")

    // Debounce effect
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 300) // 300ms debounce delay

        return () => {
            clearTimeout(timerId)
        }
    }, [searchValue])

    const fetchProviders = useCallback(async () => {
        const response = await protectedApi.GET("/v2/claims-explorer/facilities", {
            provider_name: debouncedSearchValue,
            prescriber_level: prescriberLevel,
            facility_type: providerCategory
        })
        return transformProviders(response)
    }, [debouncedSearchValue, providerCategory, prescriberLevel])

    const { data: providers, isLoading: providersLoading, error: providersError } = useQuery({
        queryKey: ["providers", debouncedSearchValue, providerCategory, prescriberLevel],
        queryFn: fetchProviders,
    })

    return {
        providers,
        providersLoading,
        providersError,
        searchValue,
        setSearchValue,
        providerCategory,
        setProviderCategory,
        prescriberLevel,
        setPrescriberLevel
    }
}
export default useExplorer