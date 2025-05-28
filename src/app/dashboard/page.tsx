'use client'

import Controls from "./components/controls"
import MetricCards from "./components/metric-cards/metric-cards"
import Chart from "./components/chart/chart"
import RightChart from "./components/chart/right-chart"
import RecentClaimsTable from "./components/recent-claims-table/table"

const Dashboard = () => {
    
    return (
        <>
            <div className="flex flex-col gap-4 pb-4">
                <Controls />
                <MetricCards />
                <div className="w-full flex gap-4 px-4">
                    <Chart />
                    <RightChart />
                </div>
                <RecentClaimsTable />
            </div>
        </>
    )
}
export default Dashboard