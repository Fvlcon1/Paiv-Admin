import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import BarChartComponent from "./radar-chart-component"
import { useDashboardContext } from "../../context/context"
import ChartSkeleton from "./chart-skeleton"

const RadarChart = () => {
    const {isDashboardDataPending} = useDashboardContext()
    
    if(isDashboardDataPending) {
        return (
            <ChartSkeleton />
        )
    }
    
    return (
        <SlideIn direction="bottom" className="flex flex-1">
            <div className="w-full h-full flex flex-col gap-2 px-4 pr-0">
                <div className="flex flex-col gap-[2px]">
                    <Text
                        textColor={theme.colors.main.primary}
                        bold={theme.typography.bold.md}
                        size={theme.typography.size.HM}
                        lineHeight={1}
                    >
                        Claims Activity
                    </Text>
                    <Text textColor={theme.colors.text.tetiary}>
                        Claims activity in the past year
                    </Text>
                </div>

                {/** Chart */}
                <div className="ml-[-10px] mt-[-10px]">
                    <BarChartComponent />
                </div>
            </div>
        </SlideIn>
    )
}
export default RadarChart