import { protectedApi } from "@/app/utils/apis/api"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { transformBatches } from "../utils/transform-batches"
import { useState, useEffect } from "react"

const useBatches = () => {
    const { hospital } = useParams<{ hospital: string }>()
    const [searchValue, setSearchValue] = useState<string>("")
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("")
    const [totalClaimsRange, setTotalClaimsRange] = useState<[number, number]>([0, 0])
    const [totalApprovedAmountRange, setTotalApprovedAmountRange] = useState<[number, number]>([0, 0])
    const [lastUpdatedRange, setLastUpdatedRange] = useState<[string, string]>(["", ""])
    const [dateSubmittedRange, setDateSubmittedRange] = useState<[string, string]>(["", ""])
    const [processingStatus, setProcessingStatus] = useState<string>("")
    
    
    const formattedHospitalName = hospital ? decodeURIComponent(hospital).replace(/%20/g, ' ') : ''

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 300) // 300ms debounce delay

        return () => {
            clearTimeout(timerId)
        }
    }, [searchValue])

    const getBatches = async () => {
        const response = await protectedApi.GET(`/v2/claims-explorer/facilities/${formattedHospitalName}/months`, {
            searchValue : debouncedSearchValue,
            processing_status : processingStatus
        })
        return transformBatches(response)
    }

    const {data: batches, isLoading: batchesLoading, error: batchesError} = useQuery({
        queryKey: ["batches", formattedHospitalName, debouncedSearchValue, processingStatus],
        queryFn: getBatches,
    })

    return {
        batches,
        batchesLoading,
        batchesError,
        searchValue,
        setSearchValue,
        totalClaimsRange,
        setTotalClaimsRange,
        totalApprovedAmountRange,
        setTotalApprovedAmountRange,
        lastUpdatedRange,
        setLastUpdatedRange,
        dateSubmittedRange,
        setDateSubmittedRange,
        processingStatus,
        setProcessingStatus
    }
}
export default useBatches