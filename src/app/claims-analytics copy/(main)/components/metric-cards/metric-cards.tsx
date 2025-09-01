import SlideIn from "@styles/components/slidein"
import MetricCard from "./components/card"
import MetricCardsSkeleton from "./components/metric-cards-skeleton"
import useMetricCards from "../../hooks/useMetricCards"


export interface IMetricCard {
    title : string,
    value : string,
    change : string,
    changeType : "up" | "down",
    color : string
    icon : any
}

const MetricCards = () => {
    const {metrics, isDashboardDataPending} = useMetricCards()

    if(isDashboardDataPending) {
        return (
            <MetricCardsSkeleton />
        )
    }

    return (
        <div className="w-full flex gap-4 px-4 pt-2">
            {
                metrics.map((metric, index) => (
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
export default MetricCards