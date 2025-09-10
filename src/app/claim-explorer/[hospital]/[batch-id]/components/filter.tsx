'use client'

import Input from "@components/input/input"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { IoFilter } from "react-icons/io5"
import { FaChevronDown } from "react-icons/fa"
import Dropdown from "@components/dropdown/dropdown"
import Button from "@components/button/button"
import theme from "@styles/theme"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import { useClaimsContext } from "../context/claims-context"

const Filter = () => {
    const [status, setStatus] = useState<string>("All status")
    const [review, setReview] = useState<string>("Reviewed by any")
    const { setSearchValue, searchValue, isFilterVisible, setIsFilterVisible } = useClaimsContext()

    const statusOptions: DropdownItem[] = [
        { key: "All status", label: "All status", value: "All status", isSelected: status === "All status" },
        { key: "Approved", label: "Approved", value: "Approved", isSelected: status === "Approved" },
        { key: "Pending", label: "Pending", value: "Pending", isSelected: status === "Pending" },
        { key: "Rejected", label: "Rejected", value: "Rejected", isSelected: status === "Rejected" },
    ]

    const reviewOptions: DropdownItem[] = [
        { key: "Reviewed by any", label: "Reviewed by any", value: "Reviewed by any", isSelected: review === "Reviewed by any" },
        { key: "AI Review", label: "AI Review", value: "AI Review", isSelected: review === "AI Review" },
        { key: "Manual Review", label: "Manual Review", value: "Manual Review", isSelected: review === "Manual Review" },
    ]

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
                        menuItems={statusOptions}
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

                    <Dropdown
                        menuItems={reviewOptions}
                        onChange={(value) => setReview(value)}
                    >
                        <Input
                            placeholder="Search"
                            value={review}
                            onChange={(e) => { }}
                            className="!h-[35px] !shadow-xs !w-[200px]"
                            PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                        />
                    </Dropdown>

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