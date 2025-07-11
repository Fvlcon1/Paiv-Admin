import { hexOpacity } from "@/utils/hexOpacity"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6"
import { IMetricCard } from "../metrics"

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
            </div>

            <Text
                size={"40px"}
                bold={theme.typography.bold.md}
                // textColor={"#" + metric.color}
                lineHeight={1}
            >
                {metric.value}
            </Text>

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