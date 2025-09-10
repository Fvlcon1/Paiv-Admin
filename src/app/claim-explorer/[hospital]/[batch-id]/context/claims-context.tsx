'use client'

import { createContext, useContext, useState } from "react"
import useClaims from "../hooks/use-claims"

const ClaimsContext = createContext<{
    claims: any
    claimsLoading: boolean
    claimsError: any
    isFilterVisible: boolean
    setIsFilterVisible: (value: boolean) => void
    searchValue: string
    setSearchValue: (value: string) => void
    dateSubmittedRange: [string, string]
    setDateSubmittedRange: (value: [string, string]) => void
    totalApprovedAmountRange: [number, number]
    setTotalApprovedAmountRange: (value: [number, number]) => void
    lastModifiedRange: [string, string]
    setLastModifiedRange: (value: [string, string]) => void
    debouncedSearchValue: string
    setDebouncedSearchValue: (value: string) => void
}>({
    claims: [],
    claimsLoading: false,
    claimsError: null,
    isFilterVisible: false,
    setIsFilterVisible: () => { },
    searchValue: "",
    setSearchValue: () => { },
    dateSubmittedRange: ["", ""],
    setDateSubmittedRange: () => { },
    totalApprovedAmountRange: [0, 0],
    setTotalApprovedAmountRange: () => { },
    lastModifiedRange: ["", ""],
    setLastModifiedRange: () => { },
    debouncedSearchValue: "",
    setDebouncedSearchValue: () => { }
})

const ClaimsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const {
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
    } = useClaims()
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)

    return (
        <ClaimsContext.Provider
            value={{
                claims,
                claimsLoading,
                claimsError,
                isFilterVisible,
                setIsFilterVisible,
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
            }}
        >
            {children}
        </ClaimsContext.Provider>
    )
}

export const useClaimsContext = () => {
    return useContext(ClaimsContext)
}

export default ClaimsContextProvider