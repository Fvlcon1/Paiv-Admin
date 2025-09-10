'use client'

import { AnimatePresence } from "framer-motion"
import Overlay from "@components/overlay/overlay"
import SlideIn from "@styles/components/slidein"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import OutlineButton from "@components/button/outlineButton"
import { GiMagicBroom } from "react-icons/gi"
import Button from "@components/button/button"
import { useFlaggedContext } from "../context/flagged-context"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "antd"

const { RangePicker } = DatePicker

const FilterSlider = () => {
    const {
        isFilterVisible,
        setIsFilterVisible,
        dateSubmittedFrom,
        dateSubmittedTo,
        setDateSubmittedFrom,
        setDateSubmittedTo,
        setLastModifiedFrom,
        setLastModifiedTo,
        setProviderName,
        setPatientName,
        setEncounterToken,
        setNhisId,
        setClaimId,
        lastModifiedFrom,
        lastModifiedTo,
        providerName,
        patientName,
        encounterToken,
        nhisId,
        claimId,
        totalApprovedAmount,
        setTotalApprovedAmount,
        refetchFlaggedClaims,
    } = useFlaggedContext()

    

    const handleApply = () => {
        refetchFlaggedClaims()
        setIsFilterVisible(false)
    }

    const handleReset = () => {
        setIsFilterVisible(false)
        setDateSubmittedFrom("")
        setDateSubmittedTo("")
        setLastModifiedFrom("")
        setLastModifiedTo("")
        setProviderName("")
        setPatientName("")
        setEncounterToken("")
        setNhisId("")
        setClaimId("")
        setTotalApprovedAmount(0)

        setTimeout(() => {
            refetchFlaggedClaims()
        }, 100)
    }

    useEffect(() => {
        console.log({isFilterVisible})
    }, [isFilterVisible])

    return (
        <AnimatePresence>
            {
                isFilterVisible && (
                    <Overlay
                        onClick={() => setIsFilterVisible(false)}
                    >
                        <AnimatePresence>
                            <SlideIn
                                direction="right"
                                className="absolute top-0 right-0 w-[300px] bg-bg-primary h-full flex flex-col gap-2 px-4 py-4"
                            >
                                <div className="flex items-center gap-2 border-b border-border-primary py-2 ml-[-1px]">
                                    <HiAdjustmentsHorizontal size={17} color={theme.colors.text.secondary} />
                                    <Text
                                        size={theme.typography.size.HM}
                                        bold={theme.typography.bold.md2}
                                    >
                                        Filter
                                    </Text>
                                </div>

                                <div className="flex flex-col gap-2 h-full relative">
                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Provider Name
                                        </Text>
                                        <Input
                                            placeholder="Eg. Kolebu Teaching Hospital"
                                            value={providerName}
                                            onChange={(e) => setProviderName(e.target.value)}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Patient Name
                                        </Text>
                                        <Input
                                            placeholder="Eg. John Doe"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Encounter Token
                                        </Text>
                                        <Input
                                            placeholder="Eg. 1234567890"
                                            value={encounterToken}
                                            onChange={(e) => setEncounterToken(e.target.value)}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            NHIS ID
                                        </Text>
                                        <Input
                                            placeholder="Eg. 1234567890"
                                            value={nhisId}
                                            onChange={(e) => setNhisId(e.target.value)}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Claim id
                                        </Text>
                                        <Input
                                            placeholder="Eg. 2024"
                                            value={claimId}
                                            onChange={(e) => setClaimId(e.target.value)}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Date Submitted
                                        </Text>
                                        <RangePicker
                                            picker="month"
                                            style={{
                                                height: "35px",
                                                borderRadius: "8px",
                                                fontFamily: "montserrat",
                                                width: "100%",
                                                fontSize: "12px",
                                                color: theme.colors.text.primary,
                                                fontWeight: theme.typography.bold.sm2,
                                                borderColor: theme.colors.border.secondary,
                                            }}
                                            value={dateSubmittedFrom && dateSubmittedTo ? [dayjs(dateSubmittedFrom), dayjs(dateSubmittedTo)] : undefined}
                                            onChange={(dates) => {
                                                if (dates && dates[0] && dates[1]) {
                                                    const startDate = dates[0].startOf('month');
                                                    const endDate = dates[1].endOf('month');
                                                    setDateSubmittedFrom(startDate.format('YYYY-MM-DD'));
                                                    setDateSubmittedTo(endDate.format('YYYY-MM-DD'));
                                                } else {
                                                    setDateSubmittedFrom('');
                                                    setDateSubmittedTo('');
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Last Modified
                                        </Text>
                                        <RangePicker
                                            picker="month"
                                            style={{
                                                height: "35px",
                                                borderRadius: "8px",
                                                fontFamily: "montserrat",
                                                width: "100%",
                                                fontSize: "12px",
                                                color: theme.colors.text.primary,
                                                fontWeight: theme.typography.bold.sm2,
                                                borderColor: theme.colors.border.secondary,
                                            }}
                                            value={lastModifiedFrom && lastModifiedTo ? [dayjs(lastModifiedFrom), dayjs(lastModifiedTo)] : undefined}
                                            onChange={(dates) => {
                                                if (dates && dates[0] && dates[1]) {
                                                    const startDate = dates[0].startOf('month');
                                                    const endDate = dates[1].endOf('month');
                                                    setLastModifiedFrom(startDate.format('YYYY-MM-DD'));
                                                    setLastModifiedTo(endDate.format('YYYY-MM-DD'));
                                                } else {
                                                    setLastModifiedFrom('');
                                                    setLastModifiedTo('');
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Text>
                                            Total Approved Cost
                                        </Text>
                                        <Input
                                            placeholder="Eg. 100000"
                                            value={totalApprovedAmount.toString()}
                                            onChange={(e) => setTotalApprovedAmount(Number(e.target.value))}
                                            className="!h-[35px] !shadow-xs"
                                        />
                                    </div>

                                    <div className="flex gap-2 mt-2 absolute bottom-0 w-full">
                                        <OutlineButton
                                            text="Reset"
                                            icon={<GiMagicBroom size={15} color={theme.colors.text.secondary} />}
                                            onClick={handleReset}
                                            className="!flex-1"
                                        />
                                        <Button
                                            text="Apply"
                                            onClick={handleApply}
                                            className="!flex-1"
                                        />
                                    </div>
                                </div>
                            </SlideIn>
                        </AnimatePresence>
                    </Overlay>
                )
            }
        </AnimatePresence>
    )
}

export default FilterSlider
