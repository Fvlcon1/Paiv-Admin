'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import SlideIn from "@styles/components/slidein"
import ClickableTab from "@components/clickable/clickabletab"
import { useState } from "react"
import RecentClaimsTableSkeleton from "./table-skeleton"
import useRecentClaims from "./hooks/useClaims"
import getDate, { getRelativeTime } from "@/utils/getDate"
import ReasonForDeclining from '@/app/dashboard/components/reason/reason';
import useReasonForDeclining from "@/app/dashboard/approved/hooks/useReason"
import { IClaimsDetailType } from "@/app/dashboard/utils/types"
import ClaimDetails from "@/app/dashboard/components/claimDetails/claimDetails"
import Button from "@components/button/button"

const getStatusClass = (status: string) => {
    switch (status) {
        case "pending":
            return `bg-[#FF950033]`
        case "approved":
            return `bg-[#00C85133]`
        case "declined":
            return `bg-[#FF000033]`
        case "flagged":
            return `bg-[#FF950033]`
    }
}

const getStatusTextColor = (status: string) => {
    switch (status) {
        case "pending":
            return "#FF9500"
        case "approved":
            return "#058e3c"
        case "declined":
            return "#FF0000"
        case "flagged":
            return "#FF9500"
    }
}

const RecentClaimsTable = () => {
    const { claims, isClaimsPending, tableData } = useRecentClaims()
    const [isScrolling, setIsScrolling] = useState(false)
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType | null>(null);
    const [showClaimDetail, setShowClaimDetail] = useState(false)
    const tableHeads = ["Hospital Name", "Date", "Patient Name", "Diagnosis", "Drugs", "Status", "Expected Payout", "Actual Payout"]
    const { handleReasonForDecliningMutation, isReasonForDecliningPending, reasonForDecliningError, reasonForDecliningSuccess } = useReasonForDeclining()
    const [isReasonVisible, setIsReasonVisible] = useState(false)

    if (isClaimsPending) {
        return (
            <RecentClaimsTableSkeleton />
        )
    }

    const handleRowClick = (index: number) => {
        setClaimDetails(tableData[index].details);
        setShowClaimDetail(true);
    };

    return (
        <>
            {
                claimDetails && (
                    <>
                        <ClaimDetails
                            claimDetails={claimDetails}
                            isVisible={showClaimDetail}
                            close={() => setShowClaimDetail(false)}
                        />

                        <ReasonForDeclining
                            isVisible={isReasonVisible}
                            close={() => setIsReasonVisible(false)}
                            handleSubmit={(value) => handleReasonForDecliningMutation({
                                encounterToken: claimDetails?.encounterToken,
                                reason: value,
                            })}
                            isLoading={isReasonForDecliningPending}
                            error={reasonForDecliningError}
                            success={reasonForDecliningSuccess}
                        />
                    </>
                )
            }
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
                            if (isScrolling) return;
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
                                            className="text-left border-b-[1px] border-border-secondary hover:bg-bg-secondary bg-bg-primary cursor-pointer duration-200"
                                            onClick={() => handleRowClick(index)}
                                        >
                                            <td
                                                className={`px-4 py-4 border-b-[1px] border-border-secondary min-w-[200px] sticky left-0
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
                                                    {getDate(new Date(item.createdAt))}
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
                                                <div className={`flex px-4 py-1 rounded-full w-fit ${getStatusClass(item.details.status)}`}>
                                                    <Text
                                                        whiteSpace="nowrap"
                                                        textColor={getStatusTextColor(item.details.status)}
                                                    >
                                                        {item.details.status}
                                                    </Text>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Text
                                                    whiteSpace="nowrap"
                                                >
                                                    {`GHS ${item.details.expectedPayout}`}
                                                </Text>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Text
                                                    whiteSpace="nowrap"
                                                >
                                                    {`GHS ${item.details.totalPayout}`}
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
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </SlideIn>
        </>
    )
}
export default RecentClaimsTable