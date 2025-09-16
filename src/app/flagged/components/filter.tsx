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
import { providerCategoryDropdown } from "@/utils/constants"
import { useFlaggedContext } from "../context/flagged-context"
import AssignTo from "./assign-to/assign-to"
import { TiUserAdd } from "react-icons/ti"
import AssignBy from "./assign-by/assign-by"
import { AssignByGrouping } from "./assign-by/assign-by"

const Filter = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [category, setCategory] = useState<string>("All Categories")
    const [status, setStatus] = useState<string>("Active")
    const { isFilterVisible, setIsFilterVisible, setSearchQuery, searchQuery, setProviderCategory, setPrescriberLevel, selectedEncounterIds } = useFlaggedContext()
    const [isAssignToVisible, setIsAssignToVisible] = useState<boolean>(false)
    const [isAssignByVisible, setIsAssignByVisible] = useState<boolean>(false)
    const [assignByGrouping, setAssignByGrouping] = useState<AssignByGrouping>("Region")

    const handleCategoryChange = (value: string) => {
        setProviderCategory(value === "All Categories" ? "" : value)
        setCategory(value)
    }

    const handlePrescribingLevelChange = (value: string) => {
        setPrescriberLevel(value === "All levels" ? "" : value)
        setPrescribingLevel(value)
    }

    const prescribingLevels: DropdownItem[] = [
        { key: "All levels", label: "All levels", value: "All levels", isSelected: prescribingLevel === "All levels" },
        { key: "A", label: "Level A (CHIPS Compounds)", value: "A", isSelected: prescribingLevel === "A" },
        { key: "B1", label: "Level B1 (Healthe centers without a doctor)", value: "B1", isSelected: prescribingLevel === "B1" },
        { key: "B2", label: "Level B2 (Healthe centers with a doctor)", value: "B2", isSelected: prescribingLevel === "B2" },
        { key: "C", label: "Level C (District Hospitals - Primary Hospitals)", value: "C", isSelected: prescribingLevel === "C" },
        { key: "D", label: "Level D (Regional and tertiary hospitals)", value: "D", isSelected: prescribingLevel === "D" },
        { key: "M", label: "Level M (Midwifery Practice)", value: "M", isSelected: prescribingLevel === "M" },
        { key: "V", label: "Level V (Diagnostic/Dispensing-only Facilities)", value: "V", isSelected: prescribingLevel === "V" },
    ]

    const categoryOptions: DropdownItem[] = providerCategoryDropdown.map((cat) => ({ ...cat, isSelected: cat.value === category }))


    const assignByOptions: DropdownItem[] = [
        { key: "Region", label: "Region", value: "Region" },
        { key: "District", label: "District", value: "District" },
        { key: "Provider", label: "Provider", value: "Provider" },
        { key: "Claim Period", label: "Claim Period", value: "Claim Period" },
    ]

    const handleAssignByChange = (value: string) => {
        setAssignByGrouping(value as AssignByGrouping)
        setIsAssignByVisible(true)
    }
    
    return (
        <div className="flex items-center gap-8 w-full justify-between">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search provider name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                    className="!h-[35px] !shadow-xs !w-[400px] !px-3"
                />

                {
                    selectedEncounterIds.length > 0 ? (
                        <div className="relative">
                            <Button
                                text="Assign To"
                                onClick={() => setIsAssignToVisible(true)}
                                icon={<TiUserAdd size={17} color={theme.colors.bg.primary} />}
                            />
                            <AssignTo
                                isVisible={isAssignToVisible}
                                setIsVisible={setIsAssignToVisible}
                                selectedEncounterToken={selectedEncounterIds}
                                className="mt-2"
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <Dropdown
                                menuItems={assignByOptions}
                                onChange={(value) => handleAssignByChange(value)}
                            >
                                <Button
                                    text="Assign By"
                                    onClick={() => setIsAssignToVisible(true)}
                                    PreIcon={<TiUserAdd size={17} color={theme.colors.bg.primary} />}
                                    PostIcon={<FaChevronDown size={11} color={theme.colors.bg.primary} />}
                                />
                            </Dropdown>
                            <AssignBy
                                isVisible={isAssignByVisible}
                                setIsVisible={setIsAssignByVisible}
                                grouping="Region"
                            />
                        </div>
                    )
                }
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex p-2 rounded-lg bg-bg-secondary items-center">
                        <IoFilter size={17} color={theme.colors.text.secondary} />
                    </div>
                    <Dropdown
                        menuItems={prescribingLevels}
                        onChange={(value) => handlePrescribingLevelChange(value)}
                    >
                        <Input
                            placeholder="Search"
                            value={prescribingLevel}
                            onChange={(e) => { }}
                            className="!h-[35px] !shadow-xs !w-[150px]"
                            PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                        />
                    </Dropdown>
                    <Dropdown
                        menuItems={categoryOptions}
                        onChange={(value) => handleCategoryChange(value)}
                    >
                        <Input
                            placeholder="Search"
                            value={category}
                            onChange={(e) => { }}
                            className="!h-[35px] !shadow-xs !w-[200px]"
                            PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                        />
                    </Dropdown>
                </div>

                <Button
                    text="More Filters"
                    icon={<HiAdjustmentsHorizontal size={20} color={theme.colors.text.primary} />}
                    color={theme.colors.text.primary}
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="!bg-bg-tetiary hover:!bg-bg-quantinary"
                />
            </div>
        </div>
    )
}

export default Filter