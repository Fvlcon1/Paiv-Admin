import { useAnalyticsContext } from "@/app/claims-analytics/context/context"

const useSummary = () => {
    const {kpiSummary, isKpiSummaryPending} = useAnalyticsContext()

    const summaryObject = {
        avgPerMonth: {
            title: "Average per month",
            value: kpiSummary?.avg_per_month,
            change: "↗ +3.2% vs previous month"
        },
        totalClaims: {
            title: "Total claims",
            value: kpiSummary?.total,
            change: "↗ +3.2% vs previous month"
        },
        totalPayout: {
            title: "Total payout",
            value: kpiSummary?.total_payout,
            change: "↗ +3.2% vs previous month"
        }
    }

    const summary = Object.values(summaryObject).map((item: any) => {
        return {
            title: item.title,
            value: item.value,
            change: item.change
        }
    })

    return {
        summary,
        isKpiSummaryPending
    }
}
export default useSummary