'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import useDashboard from '../hooks/useDashboard';

const DashboardContext = createContext<{
    dashboardData : any,
    isDashboardDataPending : boolean,
    startDate? : string,
    endDate? : string,
    selectedHospital? : string,
    selectedRegion? : string,
    selectedDistrict? : string,
    setStartDate : (startDate : string) => void,
    setEndDate : (endDate : string) => void,
    setSelectedHospital : (hospital : string) => void,
    setSelectedRegion : (region : string) => void,
    setSelectedDistrict : (district : string) => void
}>({
    dashboardData : null,
    isDashboardDataPending : false,
    startDate : undefined,
    endDate : undefined,
    selectedHospital : undefined,
    selectedRegion : undefined,
    selectedDistrict : undefined,
    setStartDate : () => {},
    setEndDate : () => {},
    setSelectedHospital : () => {},
    setSelectedRegion : () => {},
    setSelectedDistrict : () => {}
});

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
    const {dashboardData, isDashboardDataPending, startDate, endDate, selectedHospital, selectedRegion, selectedDistrict, setStartDate, setEndDate, setSelectedHospital, setSelectedRegion, setSelectedDistrict} = useDashboard()

    return (
        <DashboardContext.Provider
            value={{ 
                dashboardData,
                isDashboardDataPending,
                startDate,
                endDate,
                selectedHospital,
                selectedRegion,
                selectedDistrict,
                setStartDate,
                setEndDate,
                setSelectedHospital,
                setSelectedRegion,
                setSelectedDistrict
             }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

