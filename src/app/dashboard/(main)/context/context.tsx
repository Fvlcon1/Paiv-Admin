'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import useDashboard from '../hooks/useDashboard';

const DashboardContext = createContext<{
    dashboardData : any,
    isDashboardDataPending : boolean,
    
}>({
    dashboardData : null,
    isDashboardDataPending : false,
});

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
    const {dashboardData, isDashboardDataPending} = useDashboard()

    return (
        <DashboardContext.Provider
            value={{ 
                dashboardData,
                isDashboardDataPending
             }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

