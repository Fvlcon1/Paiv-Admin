'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import useClaims from '../hooks/useClaims';
import { UseMutateFunction } from '@tanstack/react-query';

const DashboardContext = createContext<{
    getApprovedClaimsMutation: UseMutateFunction<any, Error, void, unknown>
    getFlaggedCLaimsMutation: UseMutateFunction<any, Error, void, unknown>
    getDeclinedClaimsMutation: UseMutateFunction<any, Error, void, unknown>
}>({
    getApprovedClaimsMutation : ()=>{},
    getFlaggedCLaimsMutation : ()=>{},
    getDeclinedClaimsMutation : ()=>{}
});

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
    const {
        getApprovedClaimsMutation, 
        getFlaggedCLaimsMutation, 
        getDeclinedClaimsMutation
    } = useClaims()

    return (
        <DashboardContext.Provider
            value={{ 
                getApprovedClaimsMutation, 
                getFlaggedCLaimsMutation,
                getDeclinedClaimsMutation
             }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

