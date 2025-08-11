'use client'

import { createContext, useContext, useState } from "react"

const ExplorerContext = createContext<{
    isFilterVisible : boolean
    setIsFilterVisible : React.Dispatch<React.SetStateAction<boolean>>
}>({
    isFilterVisible : false,
    setIsFilterVisible : () => {}
})

const ExplorerProvider = ({children} : {children : React.ReactNode}) => {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
    return (
        <ExplorerContext.Provider 
            value={{
                isFilterVisible,
                setIsFilterVisible
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