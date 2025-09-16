'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useAdmins, { Admin } from "../hooks/use-admins";
    
const AdminsContext = createContext<{
    admins: Admin[]
    adminsLoading: boolean
    adminsError: any
    searchQuery: string
    setSearchQuery: (value: string) => void
    assignToAdminMutation: any
    assignToAdminLoading: boolean
    assignToAdminError: any
    assignToAdminSuccess: boolean
    assignToMultipleAdminsMutation: any
    assignToMultipleAdminsLoading: boolean
    assignToMultipleAdminsError: any
    assignToMultipleAdminsSuccess: boolean
    unAssignAdminMutation: any
    unAssignAdminLoading: boolean
    unAssignAdminError: any
    unAssignAdminSuccess: boolean
    reAssignAdminMutation: any
    reAssignAdminLoading: boolean
    reAssignAdminError: any
    reAssignAdminSuccess: boolean
    selectedEncounterIds: string[]
    setSelectedEncounterIds: (value: string[]) => void
}>({
    admins: [],
    adminsLoading: false,
    adminsError: null,
    searchQuery: "",
    setSearchQuery: () => {},
    assignToAdminMutation: null,
    assignToAdminLoading: false,
    assignToAdminError: null,
    assignToAdminSuccess: false,
    assignToMultipleAdminsMutation: null,
    assignToMultipleAdminsLoading: false,
    assignToMultipleAdminsError: null,
    assignToMultipleAdminsSuccess: false,
    unAssignAdminMutation: null,
    unAssignAdminLoading: false,
    unAssignAdminError: null,
    unAssignAdminSuccess: false,
    reAssignAdminMutation: null,
    reAssignAdminLoading: false,
    reAssignAdminError: null,
    reAssignAdminSuccess: false,
    selectedEncounterIds: [],
    setSelectedEncounterIds: () => {}
})

export const AdminsContextProvider = ({children}: {children: ReactNode}) => {
    const {
        admins,
        adminsLoading,
        adminsError,
        searchQuery,
        setSearchQuery,
        assignToAdminMutation,
        assignToAdminLoading,
        assignToAdminError,
        assignToAdminSuccess,
        assignToMultipleAdminsMutation,
        assignToMultipleAdminsLoading,
        assignToMultipleAdminsError,
        assignToMultipleAdminsSuccess,
        unAssignAdminMutation,
        unAssignAdminLoading,
        unAssignAdminError,
        unAssignAdminSuccess,
        reAssignAdminMutation,
        reAssignAdminLoading,
        reAssignAdminError,
        reAssignAdminSuccess
    } = useAdmins()

    const [selectedEncounterIds, setSelectedEncounterIds] = useState<string[]>([])

    return (
        <AdminsContext.Provider value={{
            admins,
            adminsLoading,
            adminsError,
            searchQuery,
            setSearchQuery,
            assignToAdminMutation,
            assignToAdminLoading,
            assignToAdminError,
            assignToAdminSuccess,
            assignToMultipleAdminsMutation,
            assignToMultipleAdminsLoading,
            assignToMultipleAdminsError,
            assignToMultipleAdminsSuccess,
            unAssignAdminMutation,
            unAssignAdminLoading,
            unAssignAdminError,
            unAssignAdminSuccess,
            reAssignAdminMutation,
            reAssignAdminLoading,
            reAssignAdminError,
            reAssignAdminSuccess,
            selectedEncounterIds,
            setSelectedEncounterIds
        }}>
            {children}
        </AdminsContext.Provider>
    )
}

export const useAdminsContext = () => useContext(AdminsContext)
