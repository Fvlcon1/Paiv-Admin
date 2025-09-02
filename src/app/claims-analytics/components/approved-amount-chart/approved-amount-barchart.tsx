'use client'

import SlideIn from "@styles/components/slidein"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import ApprovedAmountBarChartComponent from "./approved-amount-barchart-component"
import { useAnalyticsContext } from "../../context/context"
import { BarChartSkeleton } from "../skeletons/barchart-skeleton"

const ApprovedAmountBarChart = () => {
    const {isTotalApprovedAmountPending} = useAnalyticsContext()
    if(isTotalApprovedAmountPending) {
        return (
            <BarChartSkeleton />
        )
    }

    return (
        <SlideIn delay={0.6} className="flex flex-1">
            <div className="w-full h-full flex flex-col gap-2 p-6">
                <div className="w-full flex justify-center pr-4">
                    <Text
                        textColor={theme.colors.text.primary}
                        bold={theme.typography.bold.md}
                        size={theme.typography.size.HM}
                        lineHeight={1}
                    >
                        Total approved amount
                    </Text>
                </div>

                {/** Chart */}
                <div className="ml-[-10px] mt-[-10px]">
                    <ApprovedAmountBarChartComponent />
                </div>
            </div>
        </SlideIn>
    )
}
export default ApprovedAmountBarChart