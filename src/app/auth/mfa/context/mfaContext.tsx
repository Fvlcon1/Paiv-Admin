'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { MFAViewStates } from "../utils/types";

export const MFAContext = createContext<{
    setViewState: Dispatch<SetStateAction<MFAViewStates>>
    viewState: MFAViewStates
}>({
    setViewState : ()=>{},
    viewState : MFAViewStates.MFA_SELECTION
});

export const MFAContextProvider = ({ children }: { children: ReactNode }) => {
    const [viewState, setViewState] = useState<MFAViewStates>(MFAViewStates.MFA_SELECTION); // Replace with actual state when needed

    return (
        <MFAContext.Provider 
            value={{ 
                viewState, 
                setViewState
             }}
        >
            {children}
        </MFAContext.Provider>
    );
};

export const useMFAContext = () => useContext(MFAContext)