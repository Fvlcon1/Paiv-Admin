'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

const DashboardContext = createContext<{
    
}>({
    
});

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {

    return (
        <DashboardContext.Provider
            value={{ 
                
             }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

