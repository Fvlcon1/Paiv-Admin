'use client'

import Controls from "./components/controls"
import Table from "./components/table"
import Metrics from "./components/metrics/metrics"

const UAM = () => {
    return (
        <div className={`flex w-full flex-col`}>
            <Controls />
            <Metrics />
            <Table />
        </div>
    )
}
export default UAM