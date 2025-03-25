'use client'

import Text from "@styles/components/text"
import { redirect } from "next/navigation"
import { useDashboardContext } from "./context/context"
import { useEffect } from "react"

const Dashboard = () => {
    redirect("/dashboard/approved")

    return (
        <></>
    )
}
export default Dashboard