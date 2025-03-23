'use client'

import { useState } from "react"
import Controls from "./components/controls"
import Table from "./components/table"
import { data } from "./components/data"

const Approved = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")

    return (
        <div className="w-full flex flex-col">
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
            <Table data={data} isLoading={false}/>
        </div>
    )
}
export default Approved