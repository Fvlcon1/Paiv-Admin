import { useDashboardContext } from "../../../context/context"
import { FaFlag, FaMoneyBills } from "react-icons/fa6"
import { RiBankFill } from "react-icons/ri"
import { TbCancel } from "react-icons/tb"
import { IMetrics } from "../right-metrics"
import { useEffect, useState } from "react"
import formatAmount from "@/app/dashboard/utils/format-amount"

const useRightMetrics = () => {
    const [metrics, setMetrics] = useState<IMetrics[]>([])
    const {dashboardData, isDashboardDataPending} = useDashboardContext()
    const summary = dashboardData?.summary

    const transformMetrics = () => {
        const {total_payout, amount_saved, flagged, declined} = summary
        const metrics: IMetrics[] = [
            {
                title: "Total Payout",
                value: formatAmount(total_payout?.value || "0"),
                icon: FaMoneyBills,
                color: "6060D0"
            },
            {
                title: "Total Amount Saved",
                value: formatAmount(amount_saved?.value || "0"),
                icon: RiBankFill,
                color: "299B46"
            },
            {
                title: "% of flagged claims",
                value: flagged?.percentage || "0%",
                icon: FaFlag,
                color: "E48908"
            },
            {
                title: "% of declined claims",
                value: declined?.percentage || "0%",
                icon: TbCancel,
                color: "eb4034"
            },
        ]
        setMetrics(metrics)
    }

    useEffect(() => {
        if(summary)
            transformMetrics()
    }, [summary])

    return {
        metrics,
        isDashboardDataPending
    }
}

export default useRightMetrics