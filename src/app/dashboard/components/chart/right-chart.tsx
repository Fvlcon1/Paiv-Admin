import RightMetrics from "../right-metrics/right-metrics"
import StatusDistributionChart from "../status-distribution/status-distribution"

const RightChart = () => {
    return (
        <div className="w-[300px] flex flex-col h-[400px] rounded-x gap-3">
            <RightMetrics />
            <StatusDistributionChart />
        </div>
    )
}
export default RightChart