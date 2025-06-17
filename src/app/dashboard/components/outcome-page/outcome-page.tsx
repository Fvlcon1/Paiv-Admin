'use client'

import { useEffect, useState } from "react"
import Controls from "./components/controls/controls"
import Table from "./components/table"
import { useApprovedContext } from "./context/context"
import { IActionsType } from "./utils/types"
import Layout from "./layout"
import useApprovedClaims from "./hooks/useClaims"

const OutcomePage = ({
    endpoint,
    actionsTypes
}: {
    endpoint: string,
    actionsTypes?: IActionsType[]
}) => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const { getApprovedClaimsMutation, sorting, selectedSpecialties, selectedHospital, selectedRegion, selectedDistrict } = useApprovedContext()

    useEffect(() => {
        getApprovedClaimsMutation(endpoint)
    }, [sorting, selectedSpecialties, selectedHospital, selectedRegion, selectedDistrict])

    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full flex items-center border-b-[1px] border-solid border-b-border-primary">
                    <Controls
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        view={view}
                        setView={setView}
                        endpoint={endpoint}
                    />
                </div>
                <Table
                    endpoint={endpoint}
                    actionsTypes={actionsTypes}
                />
            </div>
        </>
    )
}
export default OutcomePage