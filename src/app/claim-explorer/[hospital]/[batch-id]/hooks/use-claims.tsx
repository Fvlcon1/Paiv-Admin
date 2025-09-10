import { protectedApi } from "@/app/utils/apis/api"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { transformClaims } from "../utils/transform-claims"
import { useState, useEffect } from "react"

const useClaims = () => {
    const { hospital } = useParams<{ hospital: string }>()
    const formattedHospitalName = hospital ? decodeURIComponent(hospital).replace(/%20/g, ' ') : ''
    const [searchValue, setSearchValue] = useState<string>("")
    const [dateSubmittedRange, setDateSubmittedRange] = useState<[string, string]>(["", ""])
    const [totalApprovedAmountRange, setTotalApprovedAmountRange] = useState<[number, number]>([0, 0])
    const [lastModifiedRange, setLastModifiedRange] = useState<[string, string]>(["", ""])
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("")
    const { "batch-id" : batchId } = useParams<{ "batch-id": string }>()

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 300) // 300ms debounce delay

        return () => {
            clearTimeout(timerId)
        }
    }, [searchValue])

    const getClaims = async () => {
        const response = await protectedApi.GET(`/v2/claims-explorer/facilities/${formattedHospitalName}/claims`, {
            batch_id : batchId
        })
        return transformClaims(response)
    }
    
    const {data: claims, isLoading: claimsLoading, error: claimsError} = useQuery({
        queryKey: ["claims", formattedHospitalName, batchId, debouncedSearchValue],
        queryFn: getClaims,
    })
    return {
        claims,
        claimsLoading,
        claimsError,
        searchValue,
        setSearchValue,
        dateSubmittedRange,
        setDateSubmittedRange,
        totalApprovedAmountRange,
        setTotalApprovedAmountRange,
        lastModifiedRange,
        setLastModifiedRange,
        debouncedSearchValue,
        setDebouncedSearchValue
    }
}
export default useClaims