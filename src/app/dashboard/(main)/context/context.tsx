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
    claimsActivityStartDate? : string,
    claimsActivityEndDate? : string,
    setClaimsActivityStartDate : (startDate : string) => void,
    setClaimsActivityEndDate : (endDate : string) => void,
    setStartDate : (startDate : string) => void,
    setEndDate : (endDate : string) => void,
    setSelectedHospital : (hospital : string) => void,
    setSelectedRegion : (region : string) => void,
    setSelectedDistrict : (district : string) => void,
    setDashboardData : (dashboardData : any) => void
}>({
    dashboardData : null,
    isDashboardDataPending : false,
    claimsActivityStartDate : undefined,
    claimsActivityEndDate : undefined,
    startDate : undefined,
    endDate : undefined,
    selectedHospital : undefined,
    selectedRegion : undefined,
    selectedDistrict : undefined,
    setClaimsActivityStartDate : () => {},
    setClaimsActivityEndDate : () => {},
    setStartDate : () => {},
    setEndDate : () => {},
    setSelectedHospital : () => {},
    setSelectedRegion : () => {},
    setSelectedDistrict : () => {},
    setDashboardData : () => {}
});

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
    const [claimsActivityStartDate, setClaimsActivityStartDate] = useState<string>()
    const [claimsActivityEndDate, setClaimsActivityEndDate] = useState<string>()
    const {dashboardData, isDashboardDataPending, startDate, endDate, selectedHospital, selectedRegion, selectedDistrict, setStartDate, setEndDate, setSelectedHospital, setSelectedRegion, setSelectedDistrict, setDashboardData} = useDashboard()

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
                setSelectedDistrict,
                setDashboardData,
                claimsActivityStartDate,
                claimsActivityEndDate,
                setClaimsActivityStartDate,
                setClaimsActivityEndDate
             }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

