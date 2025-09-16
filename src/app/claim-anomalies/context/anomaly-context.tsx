'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import useAnomalousBatches from '../hooks/use-anomalous-batches';

interface AnomalyContextType {
    selectedAnomalyIds: string[];
    setSelectedAnomalyIds: (ids: string[]) => void;
    anomalousBatches: any;
    anomalousBatchesLoading: boolean;
    anomalousBatchesError: any;
    refetchAnomalousBatches : () => void
    providers : any
}

const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

export const AnomalyProvider = ({ children }: { children: ReactNode }) => {
    const [selectedAnomalyIds, setSelectedAnomalyIds] = useState<string[]>([]);
    const {anomalousBatches, anomalousBatchesLoading, anomalousBatchesError, refetchAnomalousBatches, providers} = useAnomalousBatches()

    return (
        <AnomalyContext.Provider 
            value={{
                selectedAnomalyIds, 
                setSelectedAnomalyIds, 
                anomalousBatches, 
                anomalousBatchesLoading, 
                anomalousBatchesError,
                refetchAnomalousBatches,
                providers
            }}
        >
            {children}
        </AnomalyContext.Provider>
    );
};

export const useAnomalyContext = (): AnomalyContextType => {
    const context = useContext(AnomalyContext);
    if (!context) {
        throw new Error('useAnomalyContext must be used within an AnomalyProvider');
    }
    return context;
};
