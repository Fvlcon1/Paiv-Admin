'use client'

import Controls from "./components/controls"
import Table from "./components/table"
import Metrics from "./components/metrics/metrics"
import { useUAMContext } from "./context/context"

const UAM = () => {
    const { accountsIsFetching, metricsIsFetching } = useUAMContext()
    
    return (
        <div className={`flex w-full flex-col ${(accountsIsFetching || metricsIsFetching) ? "opacity-50 cursor-wait" : ""}`}>
            <Controls />
            <Metrics />
            <Table />
        </div>
    )
}
export default UAM