'use client'

import { useEffect, useState } from "react"
import { useApprovedContext } from "./context/context"
import OutcomePageLayout from "../dashboard/components/outcome-page/layout"

const Approved = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const {getApprovedClaimsMutation, tableData, sorting} = useApprovedContext()

    useEffect(()=>{
        getApprovedClaimsMutation()
    }, [sorting])

    return (
        <>
            {/* <div className="w-full flex flex-col">
                <div className="w-full px-3 h-[60px] flex items-center border-b-[1px] border-solid border-b-border-primary">
                    <Controls 
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        view={view}
                        setView={setView}
                    />
                </div>
                <Table />
            </div> */}
            <OutcomePageLayout 
                endpoint="/claims/approved"
                actionsTypes={["decline"]}
            />
        </>
    )
}
export default Approved