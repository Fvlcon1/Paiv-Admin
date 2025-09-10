'use client'

import { createContext, useContext } from "react"
import { BatchProcessingData } from "../utils/types"
import useBatchProcessing from "../hooks/use-batch-processing"

const BatchProcessingContext = createContext<{
    tableData : BatchProcessingData[]
}>({
    tableData : []
})

const BatchProcessingContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { tableData } = useBatchProcessing()

    return (
        <BatchProcessingContext.Provider
            value={{
                tableData,
            }}
        >
            {children}
        </BatchProcessingContext.Provider>
    )
}

export const useBatchProcessingContext = () => {
    return useContext(BatchProcessingContext)
}

export default BatchProcessingContextProvider