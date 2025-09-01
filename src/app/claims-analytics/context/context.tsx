'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import useAnalytics from '../hooks/use-analystics';

const AnalyticsContext = createContext<{
    claimsSubmittedOvertime: any
    isClaimsSubmittedOvertimePending: boolean,
    totalApprovedAmount: any,
    isTotalApprovedAmountPending: boolean,
    topDiagnosis: any,
    isTopDiagnosisPending: boolean,
    kpiSummary: any,
    isKpiSummaryPending: boolean,
    selectedRegions: string[],
    selectedDistricts: string[],
    selectedFacilities: string[],
    setSelectedRegions: (regions: string[]) => void,
    setSelectedDistricts: (districts: string[]) => void,
    setSelectedFacilities: (facilities: string[]) => void,
}>({
    claimsSubmittedOvertime: null,
    isClaimsSubmittedOvertimePending: false,
    totalApprovedAmount: null,
    isTotalApprovedAmountPending: false,
    topDiagnosis: null,
    isTopDiagnosisPending: false,
    kpiSummary: null,
    isKpiSummaryPending: false,
    selectedRegions: [],
    selectedDistricts: [],
    selectedFacilities: [],
    setSelectedRegions: () => {},
    setSelectedDistricts: () => {},
    setSelectedFacilities: () => {},
});

export const AnalyticsContextProvider = ({ children }: { children: ReactNode }) => {
    const {
        claimsSubmittedOvertime, isClaimsSubmittedOvertimePending, totalApprovedAmount, isTotalApprovedAmountPending, topDiagnosis, isTopDiagnosisPending, kpiSummary, isKpiSummaryPending,
        selectedRegions, selectedDistricts, selectedFacilities,
        setSelectedRegions, setSelectedDistricts, setSelectedFacilities
    } = useAnalytics()
    
    return (
        <AnalyticsContext.Provider
            value={{ 
                claimsSubmittedOvertime,
                isClaimsSubmittedOvertimePending,
                totalApprovedAmount,
                isTotalApprovedAmountPending,
                topDiagnosis,
                isTopDiagnosisPending,
                kpiSummary,
                isKpiSummaryPending,
                selectedRegions,
                selectedDistricts,
                selectedFacilities,
                setSelectedRegions,
                setSelectedDistricts,
                setSelectedFacilities
             }}
        >
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalyticsContext = () => useContext(AnalyticsContext);

