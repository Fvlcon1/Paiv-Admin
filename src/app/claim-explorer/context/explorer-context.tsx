'use client'

import { createContext, useContext, useState } from "react"

const ExplorerContext = createContext<{
    isFilterVisible : boolean
    setIsFilterVisible : React.Dispatch<React.SetStateAction<boolean>>
    isFacilityProfileVisible : boolean
    setIsFacilityProfileVisible : React.Dispatch<React.SetStateAction<boolean>>
    isBatchDetailsVisible : boolean
    setIsBatchDetailsVisible : React.Dispatch<React.SetStateAction<boolean>>
    selectedBatch : any
    setSelectedBatch : React.Dispatch<React.SetStateAction<any>>
}>({
    isFilterVisible : false,
    setIsFilterVisible : () => {},
    isFacilityProfileVisible : false,
    setIsFacilityProfileVisible : () => {},
    isBatchDetailsVisible : false,
    setIsBatchDetailsVisible : () => {},
    selectedBatch : null,
    setSelectedBatch : () => {}
})

const ExplorerProvider = ({children} : {children : React.ReactNode}) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    const [isFacilityProfileVisible, setIsFacilityProfileVisible] = useState<boolean>(false)
    const [isBatchDetailsVisible, setIsBatchDetailsVisible] = useState<boolean>(false)
    const [selectedBatch, setSelectedBatch] = useState<any>(null)
    return (
        <ExplorerContext.Provider 
            value={{
                isFilterVisible,
                setIsFilterVisible,
                isFacilityProfileVisible,
                setIsFacilityProfileVisible,
                isBatchDetailsVisible,
                setIsBatchDetailsVisible,
                selectedBatch,
                setSelectedBatch
            }}
        >
            {children}
        </ExplorerContext.Provider>
    )
}

export const useExplorerContext = () => {
    return useContext(ExplorerContext)
}

export default ExplorerProvider