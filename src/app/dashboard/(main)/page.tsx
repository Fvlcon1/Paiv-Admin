'use client'

import Controls from "./components/controls/controls"
import MetricCards from "./components/metric-cards/metric-cards"
import RightChart from "./components/chart/right-chart"
import RecentClaimsTable from "./components/recent-claims-table/table"
import ChartCarousel from "./components/chart-carousel"

const Dashboard = () => {
    
    return (
        <>
            <div className="flex flex-col gap-4 pb-4">
                <Controls />
                <MetricCards />
                <div className="w-full flex gap-4 px-4">
                    <ChartCarousel />
                    <RightChart />
                </div>
                <RecentClaimsTable />
            </div>
        </>
    )
}
export default Dashboard