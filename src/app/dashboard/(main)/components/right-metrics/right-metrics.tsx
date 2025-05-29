import { FaFlag, FaMoneyBills } from "react-icons/fa6"
import { RiBankFill, RiDiscountPercentFill } from "react-icons/ri"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { hexOpacity } from "@/utils/hexOpacity"
import SlideIn from "@styles/components/slidein"
import RightMetricSkeleton from "./components/right-metric-skeleton"
import useRightMetrics from "./hooks/useRightMetrics"

export interface IMetrics {
    title: string
    value: string
    icon: any,
    color: string
}

const RightMetrics = () => {
    const {metrics, isDashboardDataPending} = useRightMetrics()

    if(isDashboardDataPending) {
        return (
            <RightMetricSkeleton />
        )
    }
    
    return (
        <div className="flex flex-col gap-3">
            {
                metrics.map((metric, index) => (
                    <SlideIn
                        key={index}
                        delay={index * 0.1}
                        direction="bottom"
                    >
                        <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-xl border-[1px]"
                            style={{
                                borderColor: "#" + metric.color + hexOpacity(20),
                                backgroundColor: "#" + metric.color + hexOpacity(10)
                            }}
                        >
                            <div
                                className="rounded-lg w-[50px] h-[50px] flex items-center justify-center shadow-lg"
                                style={{
                                    backgroundColor: "#" + metric.color + hexOpacity(70)
                                }}
                            >
                                <metric.icon
                                    size={25}
                                    color={theme.colors.bg.primary}
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <div className="flex items-center gap-2">
                                    <Text
                                        textColor={"#" + metric.color}
                                    >
                                        {metric.title}
                                    </Text>
                                    <div 
                                        className="rounded-md px-2 flex py-1"
                                        style={{
                                            backgroundColor: "#" + metric.color + hexOpacity(20)
                                        }}
                                    >
                                        <Text
                                            textColor={"#" + metric.color}
                                            lineHeight={1}
                                        >
                                            This Month
                                        </Text>
                                    </div>
                                </div>

                                <Text
                                    size={theme.typography.size.HL}
                                    lineHeight={1}
                                    bold={theme.typography.bold.md}
                                    textColor={"#" + metric.color}
                                >
                                    {metric.value}
                                </Text>
                            </div>
                        </div>
                    </SlideIn>
                ))
            }
        </div>
    )
}
export default RightMetrics