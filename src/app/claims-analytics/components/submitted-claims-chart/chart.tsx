'use client'

import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import ChartComponent from "./chart-component"
import useLineChart from "./hooks/useLineChart"

const SubmittedClaimsLineChart = () => {
    const { lineChartSeries } = useLineChart()

    return (
        <SlideIn delay={0.3} className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-col gap-2 p-6">
                <div className="w-full flex justify-center pr-4">
                    <Text
                        textColor={theme.colors.text.primary}
                        bold={theme.typography.bold.md}
                        size={theme.typography.size.HM}
                        lineHeight={1}
                    >
                        Claims submitted over time
                    </Text>
                </div>

                {/** Chart */}
                <div className="ml-[-10px] mt-[-10px]">
                    <ChartComponent
                        isLineChartDataPending={false}
                        lineChartSeries={lineChartSeries}
                    />
                </div>
            </div>
        </SlideIn>
    )
}
export default SubmittedClaimsLineChart