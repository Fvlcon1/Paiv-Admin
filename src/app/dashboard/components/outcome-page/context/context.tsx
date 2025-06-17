'use client';

import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import useApprovedClaims, { ISpecialties } from '../hooks/useClaims';
import { UseMutateFunction } from '@tanstack/react-query';
import { ITableData } from '@/app/dashboard/utils/types';
import { SortingState } from '@tanstack/react-table';

const approvedContext = createContext<{
    setShowClaimDetail: Dispatch<SetStateAction<boolean>>
    showClaimDetail: boolean
    getApprovedClaimsMutation: UseMutateFunction<any, Error, string, unknown>
    isApprovedClaimsPending: boolean
    tableData: ITableData[]
    selectedClaims: string[]
    selectedSpecialties: ISpecialties[]
    setSelectedSpecialties: Dispatch<SetStateAction<ISpecialties[]>>
    isAllClaimsSelected: boolean
    sorting: SortingState
    setSorting: Dispatch<SetStateAction<SortingState>>
    handleSelectAllClaims: () => void
    handleUnselectAllClaims: () => void
    selectedHospital?: string
    setSelectedHospital: Dispatch<SetStateAction<string | undefined>>
    selectedRegion?: string
    setSelectedRegion: Dispatch<SetStateAction<string | undefined>>
    selectedDistrict?: string
    setSelectedDistrict: Dispatch<SetStateAction<string | undefined>>
}>({
    setShowClaimDetail : ()=>{},
    showClaimDetail : false,
    getApprovedClaimsMutation : ()=>{},
    isApprovedClaimsPending : false,
    tableData : [],
    selectedClaims : [],
    selectedSpecialties : [],
    setSelectedSpecialties : ()=>{},
    isAllClaimsSelected: false,
    sorting : [],
    setSorting : ()=>{},
    handleSelectAllClaims : ()=>{},
    handleUnselectAllClaims : ()=>{},
    selectedHospital: "",
    setSelectedHospital: ()=>{},
    selectedRegion: "",
    setSelectedRegion: ()=>{},
    selectedDistrict: "",
    setSelectedDistrict: ()=>{}
});

export const ApprovedContextProvider = ({ children }: { children: ReactNode }) => {
    const [showClaimDetail, setShowClaimDetail] = useState(false)
    const {
        getApprovedClaimsMutation, 
        isApprovedClaimsPending, 
        tableData, 
        selectedClaims, 
        selectedSpecialties, 
        setSelectedSpecialties, 
        isAllClaimsSelected, 
        sorting, 
        setSorting, 
        handleSelectAllClaims, 
        handleUnselectAllClaims,
        selectedHospital,
        setSelectedHospital,
        selectedRegion,
        setSelectedRegion,
        selectedDistrict,
        setSelectedDistrict
    } = useApprovedClaims()

    return (
        <approvedContext.Provider
            value={{
                setShowClaimDetail,
                showClaimDetail,
                getApprovedClaimsMutation, 
                isApprovedClaimsPending, 
                tableData,
                selectedClaims,
                selectedSpecialties,
                setSelectedSpecialties,
                isAllClaimsSelected,
                sorting,
                setSorting,
                handleSelectAllClaims,
                handleUnselectAllClaims,
                selectedHospital,
                setSelectedHospital,
                selectedRegion,
                setSelectedRegion,
                selectedDistrict,
                setSelectedDistrict
            }}
        >
            {children}
        </approvedContext.Provider>
    );
};

// Custom hook to use the context
export const useApprovedContext = () => useContext(approvedContext)
