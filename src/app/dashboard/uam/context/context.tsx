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
}>({
    accountsData: null,
    accountsLoading: false,
    accountsError: null,
    metricsData: null,
    metricsLoading: false,
    metricsError: null
})

export const UAMContextProvider = ({ children }: { children: ReactNode }) => {
    const {accountsData, accountsLoading, accountsError, metricsData, metricsLoading, metricsError} = useUAM()

    return (
        <UAMContext.Provider
            value={{
                accountsData,
                accountsLoading,
                accountsError,
                metricsData,
                metricsLoading,
                metricsError
            }}
        >
            {children}
        </UAMContext.Provider>
    )
}

export const useUAMContext = () => useContext(UAMContext)

