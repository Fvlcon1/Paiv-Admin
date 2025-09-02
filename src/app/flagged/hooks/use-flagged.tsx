import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { transformFlaggedClaims } from "../utils/transform-flagged"
import { useCallback, useState } from "react"
import dayjs from "dayjs"

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

    const getFlaggedClaims = useCallback(async () => {
        const response = await protectedApi.GET("v2/flagged-claims", {
            date_submitted_from: dateSubmittedFrom?.length > 0 ? dayjs(dateSubmittedFrom).format("YYYY-MM-DD") : undefined,
            date_submitted_to: dateSubmittedTo?.length > 0 ? dayjs(dateSubmittedTo).format("YYYY-MM-DD") : undefined,
            last_modified_from: lastModifiedFrom?.length > 0 ? dayjs(lastModifiedFrom).format("YYYY-MM-DD") : undefined,
            last_modified_to: lastModifiedTo?.length > 0 ? dayjs(lastModifiedTo).format("YYYY-MM-DD") : undefined,
            provider_name: providerName?.length > 0 ? providerName : undefined,
            patient_name: patientName?.length > 0 ? patientName : undefined,
            encounter_token: encounterToken?.length > 0 ? encounterToken : undefined,
            nhis_id: nhisId?.length > 0 ? nhisId : undefined,
            claim_id: claimId?.length > 0 ? claimId : undefined,
            total_approved_amount: totalApprovedAmount > 0 ? totalApprovedAmount : undefined,
        });
        return transformFlaggedClaims(response);
    }, [
        dateSubmittedFrom,
        dateSubmittedTo,
        lastModifiedFrom,
        lastModifiedTo,
        providerName,
        patientName,
        encounterToken,
        nhisId,
        claimId,
        totalApprovedAmount
    ]);

    const { data: flaggedClaims, isLoading: isFlaggedClaimsLoading, error: flaggedClaimsError, refetch : refetchFlaggedClaims, isRefetching : isFlaggedClaimsRefetching } = useQuery({
        queryKey: [
            "flagged-claims",
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
    }
}
export default useFlagged