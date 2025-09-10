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
import { useClaimsContext } from "../context/claims-context"
import { DatePicker, Slider } from "antd"

const FilterSlider = () => {
    const { isFilterVisible, setIsFilterVisible, dateSubmittedRange, setDateSubmittedRange, totalApprovedAmountRange, setTotalApprovedAmountRange, lastModifiedRange, setLastModifiedRange, debouncedSearchValue, setDebouncedSearchValue } = useClaimsContext()
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
                                                        value={dateSubmittedRange[0]}
                                                        onChange={(value) => setDateSubmittedRange([value, dateSubmittedRange[1]])}
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
                                                        value={dateSubmittedRange[1]}
                                                        onChange={(value) => setDateSubmittedRange([dateSubmittedRange[0], value])}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Last Modified
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
                                                        value={lastModifiedRange[0]}
                                                        onChange={(value) => setLastModifiedRange([value, lastModifiedRange[1]])}
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
                                                        value={lastModifiedRange[1]}
                                                        onChange={(value) => setLastModifiedRange([lastModifiedRange[0], value])}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Total Approved Amount
                                                </Text>
                                                <Slider range defaultValue={[totalApprovedAmountRange[0], totalApprovedAmountRange[1]]} onChange={(value) => setTotalApprovedAmountRange(value as [number, number])} />
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Min"
                                                        value={totalApprovedAmountRange[0].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                    <Input
                                                        placeholder="Max"
                                                        value={totalApprovedAmountRange[1].toString()}
                                                        onChange={(e) => { }}
                                                        className="!h-[35px] !shadow-xs"
                                                        type="number"
                                                    />
                                                </div>
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
