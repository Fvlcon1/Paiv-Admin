import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaInfoCircle } from "react-icons/fa"
import { FaChartSimple } from "react-icons/fa6"
import useSummary from "./hooks/use-summary"
import { SummaryCardsSkeleton } from "../skeletons/summary-card-skeleton"
import SlideIn from "@styles/components/slidein"

const Card = ({title, value, change}: any) => {
    return (
        <div className="w-[250px] relative rounded-xl p-4 bg-[#F4F5F5] flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <Text>
                        {title}
                    </Text>
                    <Text
                        size={theme.typography.size.HL}
                        bold={theme.typography.bold.md2}
                        textColor={theme.colors.text.secondary}
                        lineHeight={1}
                        className="!pl-0.5"
                    >
                        {value}
                    </Text>
                </div>
                <div className="flex items-center justify-center h-[30px] w-[30px] rounded-md bg-bg-tetiary">
                    <FaChartSimple color={theme.colors.text.secondary} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <FaInfoCircle size={15} color={theme.colors.text.success} />
                <Text
                    textColor={theme.colors.text.success}
                >
                    {change}
                </Text>
            </div>

            <div className="absolute h-full flex items-center top-0 left-[-2px]">
                <div className="w-[5px] h-[50%] bg-bg-sidebar rounded-full shadow-[3px_0px_5px_0px_rgba(34,97,97,0.4)]">

                </div>
            </div>
        </div>
    )
}

const SummaryCards = () => {
    const {summary, isKpiSummaryPending} = useSummary()

    if(isKpiSummaryPending) return <SummaryCardsSkeleton />

    return (
        <div className="flex items-center gap-4">
            {
                summary.map((item: any, index: number) => (
                    <SlideIn key={index} delay={index * 0.1}>
                        <Card title={item.title} value={item.value} change={item.change} />
                    </SlideIn>
                ))
            }
        </div>
    )
}

export default SummaryCards