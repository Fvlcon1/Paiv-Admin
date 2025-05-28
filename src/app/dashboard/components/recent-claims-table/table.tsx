'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import SlideIn from "@styles/components/slidein"
import ClickableTab from "@components/clickable/clickabletab"
import { tableData } from "./data"
import { useState } from "react"
import { hexOpacity } from "@/utils/hexOpacity"

const getStatusClass = (status : string) => {
    switch(status) {
        case "Pending":
            return `bg-[#FF950033]`
        case "Approved":
            return `bg-[#00C85133]`
        case "Declined":
            return `bg-[#FF000033]`
        case "Flagged":
            return `bg-[#FF950033]`
    }
}

const getStatusTextColor = (status : string) => {
    switch(status) {
        case "Pending":
            return "#FF9500"
        case "Approved":
            return "#058e3c"
        case "Declined":
            return "#FF0000"
        case "Flagged":
            return "#FF9500"
    }
}

const RecentClaimsTable = () => {
    const [isScrolling, setIsScrolling] = useState(false)
    const tableHeads = ["Hospital Name", "Date", "Patient Name", "Diagnosis", "Drugs", "Status", "Expected Payout", "Actual Payout"]
    
    return (
        <SlideIn
            direction="bottom"
            delay={0.3}
            className="w-full px-4"
        >
            <div className="flex flex-col w-full rounded-xl border-[1px] border-border-secondary">
                <div className="flex w-full justify-between border-b-[1px] border-bg-tetiary h-[45px] items-center px-4 rounded-t-xl">
                    <Text
                        bold={theme.typography.bold.md}
                        textColor={theme.colors.main.primary}
                    >
                        Recent Claims
                    </Text>
                    <ClickableTab>
                        <Text
                            bold={theme.typography.bold.md}
                            textColor={theme.colors.main.primary}
                        >
                            See more...
                        </Text>
                    </ClickableTab>
                </div>

                <div 
                    className="w-full overflow-x-auto"
                    onScroll={(e) => {
                        if(isScrolling) return;
                        setIsScrolling(true);
                        setTimeout(() => {
                            setIsScrolling(false);
                        }, 2000);
                    }}
                >
                    <table>
                        <thead>
                            <tr>
                                {
                                    tableHeads.map((head, index) => (
                                        <th
                                            key={index}
                                            className={`text-left px-4 py-4 border-b-[1px] bg-bg-primary-light border-border-secondary min-w-[200px] 
                                                ${index === 0 ? 'sticky left-0' : ''}
                                                ${index === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                            `}
                                        >
                                            <Text
                                                textColor={theme.colors.text.tetiary}
                                                bold={theme.typography.bold.md}
                                            >
                                                {head}
                                            </Text>
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="text-left border-b-[1px] border-border-secondary"
                                    >
                                        <td 
                                            className={`px-4 py-4 border-b-[1px] border-border-secondary min-w-[200px] sticky left-0 bg-bg-primary
                                                    ${isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                `}
                                        >
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.hospitalName}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.date}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.patientName}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.diagnosis}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.drugs}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className={`flex px-4 py-1 rounded-full w-fit ${getStatusClass(item.status)}`}>
                                                <Text
                                                    whiteSpace="nowrap"
                                                    textColor={getStatusTextColor(item.status)}
                                                >
                                                    {item.status}
                                                </Text>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.expectedPayout}
                                            </Text>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Text
                                                whiteSpace="nowrap"
                                            >
                                                {item.actualPayout}
                                            </Text>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </SlideIn>
    )
}
export default RecentClaimsTable