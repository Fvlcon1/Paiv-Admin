import { hexOpacity } from "@/utils/hexOpacity"
import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { FaArrowTurnDown, FaArrowTurnUp, FaCircleCheck, FaFlag } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { PiFilesFill } from "react-icons/pi"
import { TbCancel } from "react-icons/tb"

interface IMetricCard {
    title : string,
    value : string,
    change : string,
    changeType : "up" | "down",
    color : string
    icon : any
}

const MetricCards = () => {
    const metrics : IMetricCard[] = [
        {
            title : "Total Claims",
            value : "1,248",
            change : "12.5%",
            changeType : "down",
            color : "6060D0",
            icon : PiFilesFill
        },
        {
            title : "Approved Claims",
            value : "879",
            change : "4.5%",
            changeType : "up",
            color : "299B46",
            icon : FaCircleCheck
        },
        {
            title : "Flagged Claims",
            value : "351",
            change : "3.0%",
            changeType : "down",
            color : "E48908",
            icon : FaFlag
        },
        {
            title : "Declined Claims",
            value : "256",
            change : "22.3%",
            changeType : "up",
            color : "E6746E",
            icon : TbCancel
        },
    ]

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