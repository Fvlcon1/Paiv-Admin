'use client'

import SlideIn from "@styles/components/slidein"
import MetricCard from "./components/card"
import { useUAMContext } from "../../context/context"
import MetricCardSkeleton from "./components/metrics-skeleton"

export interface IMetricCard {
    title : string,
    value : string,
    color : string
    icon : any
}

const Metrics = () => {
    const {metricsData, metricsLoading} = useUAMContext()

    if(metricsLoading) {
        return <MetricCardSkeleton />
    }
    
    return (
        <div className="w-full px-3 py-3 flex items-center border-b-[1px] border-solid border-b-border-primary gap-4">
            {
                metricsData?.map((metric : IMetricCard, index : number) => (
                    <SlideIn
                        direction="left"
                        duration={0.5}
                        delay={index * 0.1}
                        key={index}
                    >
                        <MetricCard
                            metric={metric}
                        />
                    </SlideIn>
                ))
            }
        </div>
    )
}
export default Metrics