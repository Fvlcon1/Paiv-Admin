'use client'

import Input from "@components/input/input"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { IoFilter } from "react-icons/io5"
import { FaChevronDown } from "react-icons/fa"
import Dropdown from "@components/dropdown/dropdown"
import Button from "@components/button/button"
import theme from "@styles/theme"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { useState, useEffect } from "react"
import { useHospitalContext } from "../context/hospital-context"
import { DropdownItem } from "@/utils/@types"
import { providerCategoryDropdown } from "@/utils/constants"
import { DatePicker } from "antd"

const Filter = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [category, setCategory] = useState<string>("All Categories")
    const [status, setStatus] = useState<string>("All processing status")
    const { setSearchValue, searchValue, isFilterVisible, setIsFilterVisible, setProcessingStatus } = useHospitalContext()

    useEffect(() => {
        setProcessingStatus(status === "All processing status" ? "" : status)
    }, [status])

    const processingStatus: DropdownItem[] = [
        { key: "All processing status", label: "All processing status", value: "All processing status", isSelected: status === "All processing status" },
        { key: "Submitted", label: "Submitted", value: "Submitted", isSelected: status === "Submitted" },
        { key: "Under review", label: "Under review", value: "Under review", isSelected: status === "Under review" },
        { key: "Processed", label: "Processed", value: "Processed", isSelected: status === "Processed" },
    ]

    const categoryOptions: DropdownItem[] = providerCategoryDropdown.map((cat) => ({ ...cat, isSelected: cat.value === category }))
    return (
        <div className="flex items-center gap-8 w-full justify-between">
            <Input
                placeholder="Search provider name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                className="!h-[35px] !shadow-xs !w-[400px] !px-3"
            />

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex p-2 rounded-lg bg-bg-secondary items-center">
                        <IoFilter size={17} color={theme.colors.text.secondary} />
                    </div>
                    <Dropdown
                        menuItems={processingStatus}
                        onChange={(value) => setStatus(value)}
                    >
                        <Input
                            placeholder="Search"
                            value={status}
                            onChange={(e) => { }}
                            className="!h-[35px] !shadow-xs !w-[200px]"
                            PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                        />
                    </Dropdown>

                    <DatePicker
                        picker="year"
                        placeholder="Select Claim Year"
                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                        style={{
                            fontFamily: "montserrat",
                            fontSize: "12px",
                            color: theme.colors.text.secondary,
                            fontWeight: theme.typography.bold.sm2,
                            borderColor: theme.colors.border.secondary,
                        }}
                    />

                    <DatePicker
                        picker="month"
                        placeholder="Select Claim Month"
                        className="!h-[35px] !shadow-xs !w-[150px] !px-2 !rounded-lg"
                        style={{
                            fontFamily: "montserrat",
                            fontSize: "12px",
                            color: theme.colors.text.secondary,
                            fontWeight: theme.typography.bold.sm2,
                            borderColor: theme.colors.border.secondary,
                        }}
                    />

                    <Button
                        text="More Filters"
                        icon={<HiAdjustmentsHorizontal size={20} color={theme.colors.text.primary} />}
                        color={theme.colors.text.primary}
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="!bg-bg-tetiary hover:!bg-bg-quantinary"
                    />
                </div>
            </div>
        </div>
    )
}

export default Filter