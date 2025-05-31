import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import HeatmapChartComponent from "./heat-map-component"
import { useDashboardContext } from "../../context/context"
import ChartSkeleton from "./heat-map-skeleton"

const HeatMap = () => {
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
                        Claims Heatmap
                    </Text>
                    <Text textColor={theme.colors.text.tetiary}>
                        Claims Heatmap by Type and Month
                    </Text>
                </div>

                {/** Chart */}
                <div className="ml-[-10px] mt-[-10px]">
                    <HeatmapChartComponent />
                </div>
            </div>
        </SlideIn>
    )
}
export default HeatMap