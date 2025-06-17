import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Pagination from "../pagination"
import { Tooltip } from "antd"
import { FaListUl } from "react-icons/fa"
import theme from "@styles/theme"
import { IoGrid, IoReload } from "react-icons/io5"
import { Dispatch, SetStateAction, useState } from "react"
import useApprovedClaims from "../../hooks/useClaims"
import Pressable from "@components/button/pressable"
import { useApprovedContext } from "../../context/context"
import Button from "@components/button/button"
import Specialties from "../specialties"
import Hospital from "./components/hospital"
import Region from "./components/region"
import District from "./components/dsitrict"
import OutlineButton from "@components/button/outlineButton"
import { LiaBroomSolid } from "react-icons/lia"
import dayjs from "dayjs"
import { hexOpacity } from "@/utils/hexOpacity"
import { AnimatePresence, motion } from "framer-motion"

const Controls = ({
    setPageSize,
    setPageNumber,
    pageSize,
    pageNumber,
    setView,
    view,
    endpoint
}: {
    setPageSize: Dispatch<SetStateAction<number>>
    setPageNumber: Dispatch<SetStateAction<number>>
    pageSize: number
    pageNumber: number
    setView: Dispatch<SetStateAction<"list" | "grid">>
    view: "list" | "grid"
    endpoint: string
}) => {
    const { getApprovedClaimsMutation, selectedClaims, setSelectedHospital, setSelectedRegion, setSelectedDistrict } = useApprovedContext()
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <div className="w-full flex flex-col">
            <div className="flex px-3 items-center gap-2 h-[60px]">
                <Pressable
                    scaleFactor={0.95}
                    onClick={() => getApprovedClaimsMutation(endpoint)}
                >
                    <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
                        <IoReload
                            color={theme.colors.text.primary}
                        />
                    </div>
                </Pressable>
                <div
                    className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary"
                    style={{
                        backgroundColor: isFilterOpen ? theme.colors.main.primary + hexOpacity(20) : ""
                    }}
                    onClick={() => setIsFilterOpen(prev => !prev)}
                >
                    <HiAdjustmentsHorizontal
                        color={theme.colors.text.primary}
                    />
                </div>
                <Pagination
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    setPageNumber={setPageNumber}
                />
                <div className="flex h-[33px] p-1 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px]">
                    <Tooltip title='List'>
                        <div
                            className={`${view === 'list' ? 'bg-bg-tetiary' : ''} p-1 px-2 rounded-md hover:bg-bg-tetiary cursor-pointer duration-150`}
                            onClick={() => setView("list")}
                        >
                            <FaListUl
                                size={13}
                                color={view === "list" ? theme.colors.text.primary : theme.colors.text.tetiary}
                                className="mt-[1px]"
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title="Grid">
                        <div
                            className={`${view === 'grid' ? 'bg-bg-tetiary' : ''} p-1 px-2 rounded-md hover:bg-bg-tetiary cursor-pointer duration-150`}
                            onClick={() => setView("grid")}
                        >
                            <IoGrid
                                size={13}
                                color={view === "grid" ? theme.colors.text.primary : theme.colors.text.tetiary}
                                className="mt-[1px]"
                            />
                        </div>
                    </Tooltip>

                </div>

                <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
                <Specialties />

                {
                    selectedClaims.length ?
                        <Button
                            text="Approve"
                            className="!bg-[#2D7F41] !border-none !h-[32px]"
                        />
                        :
                        <></>
                }
            </div>

            {/* 2nd row */}
            <AnimatePresence>
                {
                    isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 h-[60px] px-3 border-t-[1px] border-t-border-primary"
                        >
                            <Hospital />
                            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
                            <Region />
                            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
                            <District />
                            <div className="h-[30px] w-[1px] bg-border-primary mx-2" />
                            <OutlineButton
                                text="Clear"
                                icon={<LiaBroomSolid />}
                                className="!h-[32px]"
                                onClick={() => {
                                    // setSelectedMonth("This Month")
                                    // setSelectedDate("")
                                    // setStartDate(dayjs().startOf("month").format("YYYY-MM-DD"))
                                    // setEndDate(dayjs().endOf("month").format("YYYY-MM-DD"))
                                    setSelectedHospital(undefined)
                                    setSelectedRegion(undefined)
                                    setSelectedDistrict(undefined)
                                }}
                            />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}
export default Controls