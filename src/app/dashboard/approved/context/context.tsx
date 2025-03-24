'use client';

import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

const approvedContext = createContext<{
    setShowClaimDetail: Dispatch<SetStateAction<boolean>>
    showClaimDetail: boolean
}>({
    setShowClaimDetail : ()=>{},
    showClaimDetail : false
});

export const ApprovedContextProvider = ({ children }: { children: ReactNode }) => {
    const [showClaimDetail, setShowClaimDetail] = useState(false)

    return (
        <approvedContext.Provider
            value={{
                setShowClaimDetail,
                showClaimDetail
            }}
        >
            {children}
        </approvedContext.Provider>
    );
};

// Custom hook to use the context
export const useApprovedContext = () => useContext(approvedContext)
