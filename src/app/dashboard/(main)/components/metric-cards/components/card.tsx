import { hexOpacity } from "@/utils/hexOpacity"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6"
import { IMetricCard } from "../metric-cards"

const MetricCard = ({
    metric
} : {
    metric : IMetricCard
}) => {
    return (
        <div className="w-[300px] rounded-xl flex flex-col gap-0 p-2 px-4 relative overflow-hidden border-[1px] border-border-secondary bg-bg-primary-light">
            <div className="flex items-center gap-2">
                <Text>
                    {metric.title}
                </Text>
                <div className="flex items-center py-[2px] px-2 border-[1px] border-border-secondary bg-bg-primary rounded-lg">
                    <Text
                        textColor={theme.colors.text.tetiary}
                    >
                        This Month
                    </Text>
                </div>
            </div>

            <Text
                size={"40px"}
                bold={theme.typography.bold.md}
                // textColor={"#" + metric.color}
                lineHeight={1}
            >
                {metric.value}
            </Text>

            <div className="flex gap-2 items-center mt-2">
                <div 
                    className="flex items-center px-2 py-[2px] rounded-full gap-1"
                    style={{
                        backgroundColor : metric.changeType === "up" ? "#299B46" + hexOpacity(20) : "#E6746E" + hexOpacity(20)
                    }}
                >
                    {
                        metric.changeType === "up" ? (
                            <FaArrowTurnUp
                                color={"#299B46"}
                                size={"12px"}
                            />
                        ) : (
                            <FaArrowTurnDown
                                color={"#E6746E"}
                                size={"12px"}
                            />
                        )
                    }
                    <Text
                        textColor={metric.changeType === "up" ? "#299B46" : "#E6746E"}
                        bold={theme.typography.bold.md}
                    >
                        {metric.change}
                    </Text>
                </div>
                <Text
                    textColor={theme.colors.text.tetiary}
                >
                    Compared to last month
                </Text>
            </div>

            <div 
                className="absolute w-[100px] h-[100px] rounded-full top-[-40px] right-[-30px] flex items-center justify-center"
                style={{
                    backgroundColor : "#" + metric.color + hexOpacity(10)
                }}
            >
                <metric.icon
                    color={"#" + metric.color}
                    size={25}
                    className="absolute top-[50px] left-[25px]"
                />
            </div>
        </div>
    )
}

export default MetricCard