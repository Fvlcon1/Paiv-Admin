'use client';

import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import useApprovedClaims from '../hooks/useClaims';
import { UseMutateFunction } from '@tanstack/react-query';
import { ITableData } from '@/app/claims-analytics/utils/types';
import { SortingState } from '@tanstack/react-table';

const approvedContext = createContext<{
    setShowClaimDetail: Dispatch<SetStateAction<boolean>>
    showClaimDetail: boolean
    getApprovedClaimsMutation: UseMutateFunction<any, Error, void, unknown>
    isApprovedClaimsPending: boolean
    tableData: ITableData[]
    selectedClaims: string[]
    sorting: SortingState
    setSorting: Dispatch<SetStateAction<SortingState>>
    isAllClaimsSelected: boolean
    handleSelectAllClaims: () => void
    handleUnselectAllClaims: () => void
}>({
    setShowClaimDetail : ()=>{},
    showClaimDetail : false,
    getApprovedClaimsMutation : ()=>{},
    isApprovedClaimsPending : false,
    tableData : [],
    selectedClaims : [],
    sorting : [],
    setSorting : ()=>{},
    isAllClaimsSelected: false,
    handleSelectAllClaims : ()=>{},
    handleUnselectAllClaims : ()=>{}
});

export const ApprovedContextProvider = ({ children }: { children: ReactNode }) => {
    const [showClaimDetail, setShowClaimDetail] = useState(false)
    const {getApprovedClaimsMutation, isApprovedClaimsPending, tableData, selectedClaims, sorting, setSorting, isAllClaimsSelected, handleSelectAllClaims, handleUnselectAllClaims} = useApprovedClaims()

    return (
        <approvedContext.Provider
            value={{
                setShowClaimDetail,
                showClaimDetail,
                getApprovedClaimsMutation, 
                isApprovedClaimsPending, 
                tableData,
                selectedClaims,
                sorting,
                setSorting,
                isAllClaimsSelected,
                handleSelectAllClaims,
                handleUnselectAllClaims
            }}
        >
            {children}
        </approvedContext.Provider>
    );
};

// Custom hook to use the context
export const useApprovedContext = () => useContext(approvedContext)
