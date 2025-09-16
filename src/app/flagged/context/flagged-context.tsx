'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useFlagged from "../hooks/use-flagged";
import { FlaggedClaim } from "../utils/types";

const FlaggedContext = createContext<{
    flaggedClaims: FlaggedClaim[] | undefined;
    isFlaggedClaimsLoading: boolean;
    flaggedClaimsError: any;
    dateSubmittedFrom: string;
    setDateSubmittedFrom: (value: string) => void;
    dateSubmittedTo: string;
    setDateSubmittedTo: (value: string) => void;
    setLastModifiedFrom: (value: string) => void;
    setLastModifiedTo: (value: string) => void;
    setProviderName: (value: string) => void;
    setPatientName: (value: string) => void;
    setEncounterToken: (value: string) => void;
    setNhisId: (value: string) => void;
    setClaimId: (value: string) => void;
    lastModifiedFrom: string;
    lastModifiedTo: string;
    providerName: string;
    patientName: string;
    encounterToken: string;
    nhisId: string;
    claimId: string;
    totalApprovedAmount: number;
    setTotalApprovedAmount: (value: number) => void;
    isFilterVisible: boolean;
    setIsFilterVisible: (value: boolean) => void;
    refetchFlaggedClaims: () => void;
    isFlaggedClaimsRefetching: boolean;
    setSearchQuery: (value: string) => void;
    searchQuery: string;
    providerCategory: string;
    setProviderCategory: (value: string) => void;
    prescriberLevel: string;
    setPrescriberLevel: (value: string) => void;
    selectedEncounterIds: string[];
    setSelectedEncounterIds: (value: string[]) => void;
}>({
    flaggedClaims: [],
    isFlaggedClaimsLoading: false,
    flaggedClaimsError: null,
    isFilterVisible: false,
    setDateSubmittedFrom: () => {},
    setDateSubmittedTo: () => {},
    setLastModifiedFrom: () => {},
    setLastModifiedTo: () => {},
    setProviderName: () => {},
    setPatientName: () => {},
    setEncounterToken: () => {},
    setNhisId: () => {},
    setClaimId: () => {},
    setIsFilterVisible: () => {},
    dateSubmittedFrom: "",
    dateSubmittedTo: "",
    lastModifiedFrom: "",
    lastModifiedTo: "",
    providerName: "",
    patientName: "",
    encounterToken: "",
    nhisId: "",
    claimId: "",
    totalApprovedAmount: 0,
    setTotalApprovedAmount: () => {},
    refetchFlaggedClaims: () => {},
    isFlaggedClaimsRefetching: false,
    setSearchQuery: () => {},
    searchQuery: "",
    providerCategory: "",
    setProviderCategory: () => {},
    prescriberLevel: "",
    setPrescriberLevel: () => {},
    selectedEncounterIds: [],
    setSelectedEncounterIds: () => {},
})

export const FlaggedContextProvider = ({children}: {children: ReactNode}) => {
    const {
        flaggedClaims, 
        isFlaggedClaimsLoading, 
        flaggedClaimsError, 
        dateSubmittedFrom, 
        setDateSubmittedFrom,
        setDateSubmittedTo,
        setLastModifiedFrom,
        setLastModifiedTo,
        setProviderName,
        setPatientName,
        setEncounterToken,
        setNhisId,
        setClaimId,
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
        providerCategory,
        setProviderCategory,
        prescriberLevel,
        setPrescriberLevel,
    } = useFlagged()

    const [selectedEncounterIds, setSelectedEncounterIds] = useState<string[]>([])

    return (
        <FlaggedContext.Provider value={{
            flaggedClaims,
            isFlaggedClaimsLoading,
            flaggedClaimsError,
            isFilterVisible,
            setIsFilterVisible,
            dateSubmittedFrom,
            dateSubmittedTo, 
            lastModifiedFrom, 
            lastModifiedTo, 
            providerName, 
            patientName, 
            encounterToken, 
            setDateSubmittedFrom,
            setDateSubmittedTo,
            setLastModifiedFrom,
            setLastModifiedTo,
            setProviderName,
            setPatientName,
            setEncounterToken,
            setNhisId,
            setClaimId,
            nhisId,
            claimId,
            totalApprovedAmount,
            setTotalApprovedAmount,
            refetchFlaggedClaims,
            isFlaggedClaimsRefetching,
            setSearchQuery,
            searchQuery,
            providerCategory,
            setProviderCategory,
            prescriberLevel,
            setPrescriberLevel,
            selectedEncounterIds,
            setSelectedEncounterIds
        }}>
            {children}
        </FlaggedContext.Provider>
    )
}

export const useFlaggedContext = () => useContext(FlaggedContext)
