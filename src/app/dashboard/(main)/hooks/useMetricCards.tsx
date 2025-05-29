import { useEffect, useState } from "react"
import { useDashboardContext } from "@/app/dashboard/(main)/context/context"
import formatAmount from "@/app/dashboard/utils/format-amount"
import { FaFlag, FaMoneyBills } from "react-icons/fa6"
import { RiBankFill } from "react-icons/ri"
import { TbCancel } from "react-icons/tb"
import { IMetricCard } from "../components/metric-cards/metric-cards"


const useMetricCards = () => {
    const [metrics, setMetrics] = useState<IMetricCard[]>([])
    const { dashboardData, isDashboardDataPending } = useDashboardContext()
    const summary = dashboardData?.summary

    const transformMetrics = () => {
        const { total, approved, flagged, declined } = summary
        const metrics: IMetricCard[] = [
            {
                title: "Total Claims",
                value: formatAmount(total?.count || "0"),
                icon: FaMoneyBills,
                color: "6060D0",
                change: "",
                changeType: "up"
            },
            {
                title: "Total Approved",
                value: formatAmount(approved?.count || "0"),
                icon: RiBankFill,
                color: "299B46",
                change: "",
                changeType: "up"
            },
            {
                title: "Flagged Claims",
                value: formatAmount(flagged?.count || "0"),
                icon: FaFlag,
                color: "E48908",
                change: "",
                changeType: "up"
            },
            {
                title: "Declined Claims",
                value: formatAmount(declined?.count || "0"),
                icon: TbCancel,
                color: "eb4034",
                change: "",
                changeType: "up"
            },
        ]
        setMetrics(metrics)
    }

    useEffect(() => {
        if(summary)
            console.log({summary})
        if(summary)
            transformMetrics()
    }, [summary])

    return {
        metrics,
        isDashboardDataPending
    }
}
export default useMetricCards