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
import { useHospitalContext } from "../context/hospital-context"
import { DatePicker, Slider } from "antd"
import { useState } from "react"

const FilterSlider = () => {
    const {
        isFilterVisible,
        setIsFilterVisible,
        totalClaimsRange,
        setTotalClaimsRange,
        totalApprovedAmountRange,
        setTotalApprovedAmountRange,
        lastUpdatedRange,
        setLastUpdatedRange,
        dateSubmittedRange,
        setDateSubmittedRange,
    } = useHospitalContext()

    const [totalClaimsRangeLocal, setTotalClaimsRangeLocal] = useState(totalClaimsRange)
    const [totalApprovedAmountRangeLocal, setTotalApprovedAmountRangeLocal] = useState(totalApprovedAmountRange)
    const [lastUpdatedRangeLocal, setLastUpdatedRangeLocal] = useState(lastUpdatedRange)
    const [dateSubmittedRangeLocal, setDateSubmittedRangeLocal] = useState(dateSubmittedRange)
    
    const handleReset = () => {
        setTotalClaimsRangeLocal([0, 0])
        setTotalApprovedAmountRangeLocal([0, 0])
        setLastUpdatedRangeLocal(["", ""])
        setDateSubmittedRangeLocal(["", ""])
        setIsFilterVisible(false)
    }
    
    const handleApply = () => {
        setTotalClaimsRange(totalClaimsRangeLocal)
        setTotalApprovedAmountRange(totalApprovedAmountRangeLocal)
        setLastUpdatedRange(lastUpdatedRangeLocal)
        setDateSubmittedRange(dateSubmittedRangeLocal)
        setIsFilterVisible(false)
    }
    
    return (
        <AnimatePresence>
            {
                isFilterVisible && (
                    <Overlay
                        onClick={() => setIsFilterVisible(false)}
                    >
                        <AnimatePresence>
                            {
                                isFilterVisible && (
                                    <SlideIn
                                        direction="right"
                                        className="absolute top-0 right-0 w-[350px] bg-bg-primary h-full flex flex-col gap-4 px-4 py-4 pt-1"
                                    >
                                        <div className="flex items-center gap-2 border-b border-border-primary py-2 ml-[-1px]">
                                            <HiAdjustmentsHorizontal size={17} color={theme.colors.text.secondary} />
                                            <Text
                                                size={theme.typography.size.HM}
                                                bold={theme.typography.bold.md2}
                                            >
                                                More Filters
                                            </Text>
                                        </div>

                                        <div className="flex flex-col gap-4 h-full relative">
                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Date Submitted
                                                </Text>
                                                <div className="flex items-center gap-2">
                                                    <DatePicker
                                                        picker="year"
                                                        placeholder="Start Date"
                                                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                                                        style={{
                                                            fontFamily: "montserrat",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.typography.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                        value={dateSubmittedRangeLocal[0]}
                                                        onChange={(value) => setDateSubmittedRangeLocal([value, dateSubmittedRangeLocal[1]])}
                                                    />
                                                    <Text>...</Text>
                                                    <DatePicker
                                                        picker="year"
                                                        placeholder="End Date"
                                                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                                                        style={{
                                                            fontFamily: "montserrat",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.typography.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                        value={dateSubmittedRangeLocal[1]}
                                                        onChange={(value) => setDateSubmittedRangeLocal([dateSubmittedRangeLocal[0], value])}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Total Claims
                                                </Text>
                                                <Slider range defaultValue={[totalClaimsRangeLocal[0], totalClaimsRangeLocal[1]]} onChange={(value) => setTotalClaimsRangeLocal(value as [number, number])} />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Min"
                                                        value={totalClaimsRangeLocal[0].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                    <Input
                                                        placeholder="Max"
                                                        value={totalClaimsRangeLocal[1].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Last Updated
                                                </Text>
                                                <div className="flex items-center gap-2">
                                                    <DatePicker
                                                        picker="year"
                                                        placeholder="Start Date"
                                                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                                                        style={{
                                                            fontFamily: "montserrat",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.typography.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                        value={lastUpdatedRangeLocal[0]}
                                                        onChange={(value) => setLastUpdatedRangeLocal([value, lastUpdatedRangeLocal[1]])}
                                                    />
                                                    <Text>...</Text>
                                                    <DatePicker
                                                        picker="year"
                                                        placeholder="End Date"
                                                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                                                        style={{
                                                            fontFamily: "montserrat",
                                                            fontSize: "12px",
                                                            color: theme.colors.text.secondary,
                                                            fontWeight: theme.typography.bold.sm2,
                                                            borderColor: theme.colors.border.secondary,
                                                        }}
                                                        value={lastUpdatedRangeLocal[1]}
                                                        onChange={(value) => setLastUpdatedRangeLocal([lastUpdatedRangeLocal[0], value])}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Total Approved Amount
                                                </Text>
                                                <Slider range defaultValue={[totalApprovedAmountRangeLocal[0], totalApprovedAmountRangeLocal[1]]} onChange={(value) => setTotalApprovedAmountRangeLocal(value as [number, number])} />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Min"
                                                        value={totalApprovedAmountRangeLocal[0].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                    <Input
                                                        placeholder="Max"
                                                        value={totalApprovedAmountRangeLocal[1].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-2 absolute bottom-0 w-full">
                                                <OutlineButton
                                                    text="Reset"
                                                    icon={<GiMagicBroom size={15} color={theme.colors.text.secondary} />}
                                                    className="!flex-1"
                                                    onClick={handleReset}
                                                />
                                                <Button
                                                    text="Apply"
                                                    className="!flex-1"
                                                    onClick={handleApply}
                                                />
                                            </div>
                                        </div>
                                    </SlideIn>
                                )
                            }
                        </AnimatePresence>
                    </Overlay>
                )
            }
        </AnimatePresence>
    )
}

export default FilterSlider
