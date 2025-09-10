import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { transformFlaggedClaims } from "../utils/transform-flagged"
import { useCallback, useEffect, useState } from "react"
import dayjs from "dayjs"
import { transformClaims } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/transform-claims"

const useFlagged = () => {
    const [dateSubmittedFrom, setDateSubmittedFrom] = useState<string>("");
    const [dateSubmittedTo, setDateSubmittedTo] = useState<string>("");
    const [lastModifiedFrom, setLastModifiedFrom] = useState<string>("");
    const [lastModifiedTo, setLastModifiedTo] = useState<string>("");
    const [providerName, setProviderName] = useState<string>("");
    const [patientName, setPatientName] = useState<string>("");
    const [encounterToken, setEncounterToken] = useState<string>("");
    const [nhisId, setNhisId] = useState<string>("");
    const [claimId, setClaimId] = useState<string>("");
    const [totalApprovedAmount, setTotalApprovedAmount] = useState<number>(0);
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const getFlaggedClaims = useCallback(async () => {
        const response = await protectedApi.GET("v2/flagged-claims", {
            date_submitted_from: dateSubmittedFrom?.length > 0 ? dayjs(dateSubmittedFrom).format("YYYY-MM-DD") : undefined,
            date_submitted_to: dateSubmittedTo?.length > 0 ? dayjs(dateSubmittedTo).format("YYYY-MM-DD") : undefined,
            last_modified_from: lastModifiedFrom?.length > 0 ? dayjs(lastModifiedFrom).format("YYYY-MM-DD") : undefined,
            last_modified_to: lastModifiedTo?.length > 0 ? dayjs(lastModifiedTo).format("YYYY-MM-DD") : undefined,
            provider_name: debouncedSearchQuery.length > 0 ? debouncedSearchQuery : providerName?.length > 0 ? providerName : undefined,
            patient_name: patientName?.length > 0 ? patientName : undefined,
            encounter_token: encounterToken?.length > 0 ? encounterToken : undefined,
            nhis_id: nhisId?.length > 0 ? nhisId : undefined,
            claim_id: claimId?.length > 0 ? claimId : undefined,
            total_approved_amount: totalApprovedAmount > 0 ? totalApprovedAmount : undefined,
        });
        const transformedFlaggedClaims = transformFlaggedClaims(response);
        return transformedFlaggedClaims
    }, [
        dateSubmittedFrom,
        dateSubmittedTo,
        lastModifiedFrom,
        lastModifiedTo,
        providerName,
        patientName,
        debouncedSearchQuery,
        encounterToken,
        nhisId,
        claimId,
        totalApprovedAmount
    ]);

    const { data: flaggedClaims, isLoading: isFlaggedClaimsLoading, error: flaggedClaimsError, refetch : refetchFlaggedClaims, isRefetching : isFlaggedClaimsRefetching } = useQuery({
        queryKey: [
            "flagged-claims",
            dateSubmittedFrom,
            dateSubmittedTo,
            lastModifiedFrom,
            lastModifiedTo,
            providerName,
            debouncedSearchQuery,
            encounterToken,
            nhisId,
            claimId,
            totalApprovedAmount
        ],
        queryFn: getFlaggedClaims,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    return {
        flaggedClaims,
        isFlaggedClaimsLoading,
        setDateSubmittedFrom,
        setDateSubmittedTo,
        setLastModifiedFrom,
        setLastModifiedTo,
        setProviderName,
        setPatientName,
        setEncounterToken,
        setNhisId,
        setClaimId,
        flaggedClaimsError,
        dateSubmittedFrom,
        dateSubmittedTo,
        lastModifiedFrom,
        lastModifiedTo,
        providerName,
        patientName,
        encounterToken,
        nhisId,
        claimId,
        totalApprovedAmount,
        setTotalApprovedAmount,
        isFilterVisible,
        setIsFilterVisible,
        refetchFlaggedClaims,
        isFlaggedClaimsRefetching,
        setSearchQuery,
        searchQuery,
    }
}
export default useFlagged