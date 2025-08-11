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
import { useExplorerContext } from "../context/explorer-context"

const FilterSlider = () => {
    const {isFilterVisible, setIsFilterVisible} = useExplorerContext()
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
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Patient Name
                                                </Text>
                                                <Input
                                                    placeholder="Eg. John Doe"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Encounter Token
                                                </Text>
                                                <Input
                                                    placeholder="Eg. 1234567890"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    NHIS ID
                                                </Text>
                                                <Input
                                                    placeholder="Eg. 1234567890"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Claim Year
                                                </Text>
                                                <Input
                                                    placeholder="Eg. 2024"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    Claim Month
                                                </Text>
                                                <Input
                                                    placeholder="Eg. January"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Text>
                                                    District
                                                </Text>
                                                <Input
                                                    placeholder="Eg. Abeokuta"
                                                    value={""}
                                                    onChange={(e) => { }}
                                                    className="!h-[35px] !shadow-xs"
                                                />
                                            </div>

                                            <div className="flex gap-2 mt-2 absolute bottom-0 w-full">
                                                <OutlineButton
                                                    text="Reset"
                                                    icon={<GiMagicBroom size={15} color={theme.colors.text.secondary} />}
                                                    className="!flex-1"
                                                />
                                                <Button
                                                    text="Apply"
                                                    className="!flex-1"
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
