import SlideIn from "@styles/components/slidein"
import Top from "./components/top"
import SubmittedClaimsLineChart from "./components/submitted-claims-chart/chart"
import DiagnosisBarChart from "./components/top10-diagnosis-bar-chart/diagnosis-bar-chart"
import ApprovedAmountBarChart from "./components/approved-amount-chart/approved-amount-barchart"
import StatusDistributionChart from "./components/status-distribution/status-distribution"
import Top5RejectionReasons from "./components/top5-rejection-reasons/top5-rejection-reasons"

const TopCharts = () => {
    return (
        <div className="w-full flex items-center gap-4">
            <div className="flex flex-1 rounded-2xl bg-bg-primary h-[400px]">
                <SubmittedClaimsLineChart />
            </div>
            <div className="flex flex-1 rounded-2xl bg-bg-primary h-[400px]">
                <DiagnosisBarChart />
            </div>
        </div>
    )
}

const BottomCharts = () => {
    return (
        <div className="w-full flex items-center gap-4">
            <div className="flex flex-1 rounded-2xl bg-bg-primary h-[400px]">
                <ApprovedAmountBarChart />
            </div>
            <div className="flex w-[400px] justify-center items-center rounded-2xl bg-bg-primary h-[400px]">
                <StatusDistributionChart />
            </div>
            <div className="flex w-[400px] justify-center items-center rounded-2xl bg-bg-primary h-[400px]">
                <Top5RejectionReasons />
            </div>
        </div>
    )
}

const ClaimsAnalytics = () => {
    return (
        <SlideIn className="w-full h-full px-4 py-4 gap-4 flex flex-col">
            <Top />
            <div className="w-full flex flex-col gap-4">
                <TopCharts />
                <BottomCharts />
            </div>
        </SlideIn>
    )
}
export default ClaimsAnalytics