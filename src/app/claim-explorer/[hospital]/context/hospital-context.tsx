'use client'

import { createContext, useContext, useState } from "react"
import useBatches from "../hooks/use-batches"

const HospitalContext = createContext<{
    batches : any
    batchesLoading : boolean
    batchesError : any
    searchValue : string
    setSearchValue : (value : string) => void
    totalClaimsRange : [number, number]
    setTotalClaimsRange : (value : [number, number]) => void
    totalApprovedAmountRange : [number, number]
    setTotalApprovedAmountRange : (value : [number, number]) => void
    isFilterVisible : boolean
    setIsFilterVisible : (value : boolean) => void
    lastUpdatedRange : [string, string]
    setLastUpdatedRange : (value : [string, string]) => void
    dateSubmittedRange : [string, string]
    setDateSubmittedRange : (value : [string, string]) => void
    processingStatus : string
    setProcessingStatus : (value : string) => void
}>({
    batches : [],
    batchesLoading : false,
    batchesError : null,
    searchValue : "",
    setSearchValue : () => {},
    totalClaimsRange : [0, 0],
    setTotalClaimsRange : () => {},
    totalApprovedAmountRange : [0, 0],
    setTotalApprovedAmountRange : () => {},
    isFilterVisible : false,
    lastUpdatedRange : ["", ""],
    setLastUpdatedRange : () => {},
    dateSubmittedRange : ["", ""],
    setDateSubmittedRange : () => {},
    setIsFilterVisible : () => {},
    processingStatus : "",
    setProcessingStatus : () => {}
})

const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    const { 
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
     } = useBatches()

    return (
        <HospitalContext.Provider
            value={{
                batches,
                batchesLoading,
                batchesError,
                searchValue,
                setSearchValue,
                totalClaimsRange,
                setTotalClaimsRange,
                totalApprovedAmountRange,
                setTotalApprovedAmountRange,
                isFilterVisible,
                setIsFilterVisible,
                lastUpdatedRange,
                setLastUpdatedRange,
                dateSubmittedRange,
                setDateSubmittedRange,
                processingStatus,
                setProcessingStatus
            }}
        >
            {children}
        </HospitalContext.Provider>
    )
}

export const useHospitalContext = () => {
    return useContext(HospitalContext)
}

export default HospitalProvider