'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

const AppContext = createContext<{
    numberOfPending : number
    setNumberOfPending : React.Dispatch<React.SetStateAction<number>>
    numberOfApproved : number
    setNumberOfApproved : React.Dispatch<React.SetStateAction<number>>
    numberOfFlagged : number
    setNumberOfFlagged : React.Dispatch<React.SetStateAction<number>>
    numberOfDeclined : number
    setNumberOfDeclined : React.Dispatch<React.SetStateAction<number>>
}>({
    numberOfPending : 0,
    setNumberOfPending : ()=>{},
    numberOfApproved : 0,
    setNumberOfApproved : ()=>{},
    numberOfFlagged : 0,
    setNumberOfFlagged : ()=>{},
    numberOfDeclined : 0,
    setNumberOfDeclined : ()=>{}
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [numberOfPending, setNumberOfPending] = useState(0)
    const [numberOfApproved, setNumberOfApproved] = useState(0)
    const [numberOfFlagged, setNumberOfFlagged] = useState(0)
    const [numberOfDeclined, setNumberOfDeclined] = useState(0)

    return (
        <AppContext.Provider
            value={{ 
                numberOfPending,
                setNumberOfPending,
                numberOfApproved,
                setNumberOfApproved,
                numberOfFlagged,
                setNumberOfFlagged,
                numberOfDeclined,
                setNumberOfDeclined
             }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

