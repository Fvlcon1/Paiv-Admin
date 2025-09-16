'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useAdmins, { Admin } from "../hooks/use-admins";

const AdminsContext = createContext<{
    admins: Admin[]
    refetchAdmins : () => void
    adminsLoading: boolean
    adminsError: any
    searchQuery: string
    setSearchQuery: (value: string) => void
    selectedAnomalyIds: string[]
    setSelectedAnomalyIds: (value: string[]) => void
    selectedAdmins: string[]
    setSelectedAdmins: (value: string[]) => void
    selectedRegions: string[]
    setSelectedRegions: (value: string[]) => void
    selectedDistricts: string[]
    setSelectedDistricts: (value: string[]) => void
    selectedProviders: string[]
    setSelectedProviders: (value: string[]) => void
    assignToAdminMutation: any
    assignToAdminLoading: boolean
    assignToAdminError: any
    assignToAdminSuccess: boolean
    unAssignAdminMutation: any
    unAssignAdminLoading: boolean
    unAssignAdminError: any
    unAssignAdminSuccess: boolean
    selectedYearMonths: string[]
    setSelectedYearMonths: (value: string[]) => void
}>({
    admins: [],
    refetchAdmins : () => { },
    adminsLoading: false,
    adminsError: null,
    searchQuery: "",
    setSearchQuery: () => { },
    selectedAnomalyIds: [],
    setSelectedAnomalyIds: () => { },
    selectedAdmins: [],
    setSelectedAdmins: () => { },
    selectedRegions: [],
    setSelectedRegions: () => { },
    selectedDistricts: [],
    setSelectedDistricts: () => { },
    selectedProviders: [],
    setSelectedProviders: () => { },
    assignToAdminMutation: () => { },
    assignToAdminLoading: false,
    assignToAdminError: null,
    assignToAdminSuccess: false,
    unAssignAdminMutation: () => { },
    unAssignAdminLoading: false,
    unAssignAdminError: null,
    unAssignAdminSuccess: false,
    selectedYearMonths: [],
    setSelectedYearMonths: () => { }
})

export const AdminsContextProvider = ({ children }: { children: ReactNode }) => {
    const {
        admins,
        refetchAdmins,
        adminsLoading,
        adminsError,
        searchQuery,
        setSearchQuery,
        selectedAdmins,
        setSelectedAdmins,
        selectedRegions,
        setSelectedRegions,
        selectedDistricts,
        setSelectedDistricts,
        selectedProviders,
        setSelectedProviders,
        assignToAdminMutation,
        assignToAdminLoading,
        assignToAdminError,
        assignToAdminSuccess,
        unAssignAdminMutation,
        unAssignAdminLoading,
        unAssignAdminError,
        unAssignAdminSuccess,
        selectedYearMonths,
        setSelectedYearMonths
    } = useAdmins()

    const [selectedAnomalyIds, setSelectedAnomalyIds] = useState<string[]>([])

    return (
        <AdminsContext.Provider value={{
            admins,
            refetchAdmins,
            adminsLoading,
            adminsError,
            searchQuery,
            setSearchQuery,
            selectedAnomalyIds,
            setSelectedAnomalyIds,
            selectedAdmins,
            setSelectedAdmins,
            selectedRegions,
            setSelectedRegions,
            selectedDistricts,
            setSelectedDistricts,
            selectedProviders,
            setSelectedProviders,
            assignToAdminMutation,
            assignToAdminLoading,
            assignToAdminError,
            assignToAdminSuccess,
            unAssignAdminMutation,
            unAssignAdminLoading,
            unAssignAdminError,
            unAssignAdminSuccess,
            selectedYearMonths,
            setSelectedYearMonths
        }}>
            {children}
        </AdminsContext.Provider>
    )
}

export const useAdminsContext = () => useContext(AdminsContext)
