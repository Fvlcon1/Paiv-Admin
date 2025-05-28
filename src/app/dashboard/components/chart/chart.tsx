import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import ChartComponent from "./chart-component"

const Chart = () => {
    return (
        <SlideIn direction="bottom" className="flex flex-1 rounded-xl border-[1px] border-border-secondary">
            <div className="w-full h-full flex flex-col gap-2 p-4 pr-0">
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
                    <ChartComponent />
                </div>
            </div>
        </SlideIn>
    )
}
export default Chart