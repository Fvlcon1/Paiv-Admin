'use client'

import { createContext, useContext, useState } from "react"
import useExplorer from "../hooks/use-explorer"
import { Provider, ProviderProfile } from "../utils/types"
import { BatchDetails } from "../[hospital]/utils/types"

const ExplorerContext = createContext<{
    isFilterVisible : boolean
    setIsFilterVisible : React.Dispatch<React.SetStateAction<boolean>>
    isFacilityProfileVisible : boolean
    setIsFacilityProfileVisible : React.Dispatch<React.SetStateAction<boolean>>
    isBatchDetailsVisible : boolean
    setIsBatchDetailsVisible : React.Dispatch<React.SetStateAction<boolean>>
    selectedBatch : BatchDetails | null
    setSelectedBatch : React.Dispatch<React.SetStateAction<BatchDetails | null>>
    providers : Provider[] | undefined
    providersLoading : boolean
    providersError : any
    expandedProviderId : string | null
    setExpandedProviderId : React.Dispatch<React.SetStateAction<string | null>>
    searchValue : string
    setSearchValue : React.Dispatch<React.SetStateAction<string>>
    providerCategory : string
    setProviderCategory : React.Dispatch<React.SetStateAction<string>>
    prescriberLevel : string
    setPrescriberLevel : React.Dispatch<React.SetStateAction<string>>
}>({
    isFilterVisible : false,
    setIsFilterVisible : () => {},
    isFacilityProfileVisible : false,
    setIsFacilityProfileVisible : () => {},
    isBatchDetailsVisible : false,
    setIsBatchDetailsVisible : () => {},
    selectedBatch : null,
    setSelectedBatch : () => {},
    providers : undefined,
    providersLoading : false,
    providersError : null,
    expandedProviderId : null,
    setExpandedProviderId : () => {},
    searchValue : "",
    setSearchValue : () => {},
    providerCategory : "",
    setProviderCategory : () => {},
    prescriberLevel : "",
    setPrescriberLevel : () => {}
})

const ExplorerProvider = ({children} : {children : React.ReactNode}) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    const [isFacilityProfileVisible, setIsFacilityProfileVisible] = useState<boolean>(false)
    const [isBatchDetailsVisible, setIsBatchDetailsVisible] = useState<boolean>(false)
    const [selectedBatch, setSelectedBatch] = useState<BatchDetails | null>(null)
    const [expandedProviderId, setExpandedProviderId] = useState<string | null>(null)

    const {
        searchValue,
        setSearchValue,
        providers,
        providersLoading,
        providersError,
        providerCategory,
        setProviderCategory,
        prescriberLevel,
        setPrescriberLevel
    } = useExplorer()
    
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
                setSelectedBatch,
                providers,
                providersLoading,
                providersError,
                expandedProviderId,
                setExpandedProviderId,
                searchValue,
                setSearchValue,
                providerCategory,
                setProviderCategory,
                prescriberLevel,
                setPrescriberLevel
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