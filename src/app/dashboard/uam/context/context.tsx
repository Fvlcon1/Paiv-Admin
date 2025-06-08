'use client'

import { createContext, Dispatch, SetStateAction, ReactNode, useState, useContext } from "react"
import useUAM from "../hooks/useUAM"


const UAMContext = createContext<{
    accountsData: any
    accountsLoading: boolean
    accountsError: any
    metricsData: any
    metricsLoading: boolean
    metricsError: any
    refetchMetrics: () => void
    refetchAccounts: () => void
    metricsIsFetching: boolean
    accountsIsFetching: boolean
}>({
    accountsData: null,
    accountsLoading: false,
    accountsError: null,
    metricsData: null,
    metricsLoading: false,
    metricsError: null,
    refetchMetrics: () => {},
    refetchAccounts: () => {},
    metricsIsFetching: false,
    accountsIsFetching: false
})

export const UAMContextProvider = ({ children }: { children: ReactNode }) => {
    const {accountsData, accountsLoading, accountsError, metricsData, metricsLoading, metricsError, refetchMetrics, refetchAccounts, metricsIsFetching, accountsIsFetching} = useUAM()

    return (
        <UAMContext.Provider
            value={{
                accountsData,
                accountsLoading,
                accountsError,
                metricsData,
                metricsLoading,
                metricsError,
                refetchMetrics,
                refetchAccounts,
                metricsIsFetching,
                accountsIsFetching
            }}
        >
            {children}
        </UAMContext.Provider>
    )
}

export const useUAMContext = () => useContext(UAMContext)

