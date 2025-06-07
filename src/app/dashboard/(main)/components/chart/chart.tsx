import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import ChartComponent from "./chart-component"
import ChartSkeleton from "./chart-skeleton"
import { DatePicker } from "antd"
import { useState } from "react"
import dayjs from "dayjs"
import useLineChart from "./hooks/useLineChart"
import { useDashboardContext } from "../../context/context"

const Chart = () => {
    const [quickMonths, setQuickMonths] = useState<string[]>(["This Month", "April", "March"])
    const [selectedMonth, setSelectedMonth] = useState<string | undefined>(quickMonths[0])
    const [selectedDate, setSelectedDate] = useState<string>("")
    const { lineChartSeries, isLineChartDataPending } = useLineChart()
    const {setClaimsActivityStartDate, setClaimsActivityEndDate, claimsActivityStartDate, claimsActivityEndDate} = useDashboardContext()

    const handleMonthChange = (value: string) => {
        setSelectedMonth(undefined)
        setSelectedDate(value)
        setClaimsActivityStartDate(dayjs(value).startOf("month").format("YYYY-MM-DD"))
        setClaimsActivityEndDate(dayjs(value).endOf("month").format("YYYY-MM-DD"))
    }

    return (
        <SlideIn direction="bottom" className="flex flex-1">
            <div className="w-full h-full flex flex-col gap-2 pl-4">
                <div className="w-full flex justify-between pr-4">
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

                    <DatePicker
                        placeholder="Select Month"
                        format="YYYY-MM-DD"
                        style={{
                            outline: "none",
                            backgroundColor: "transparent",
                            color: theme.colors.text.secondary,
                            fontSize: "14px",
                            height: "30px"
                        }}
                        picker="month"
                        value={selectedDate ? dayjs(selectedDate) : claimsActivityStartDate ? dayjs(claimsActivityStartDate) : undefined}
                        onChange={(value) => handleMonthChange(value?.format("YYYY-MM-DD") || "")}
                    />
                </div>

                {/** Chart */}
                <div className="ml-[-10px] mt-[-10px]">
                    <ChartComponent
                        isLineChartDataPending={isLineChartDataPending}
                        lineChartSeries={lineChartSeries}
                    />
                </div>
            </div>
        </SlideIn>
    )
}
export default Chart