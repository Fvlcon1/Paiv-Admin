
import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { FaChevronDown } from "react-icons/fa6"
import { IoFilter } from "react-icons/io5"
import theme from "@styles/theme"
import { useState } from "react"
import { HiMiniAdjustmentsHorizontal, HiMiniMagnifyingGlass } from "react-icons/hi2"
import { prescribingLevelsDropdown } from "@/utils/constants"
import { DatePicker } from "antd"
import { useFlaggedContext } from "@/app/flagged/context/flagged-context"

const Filter = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [status, setStatus] = useState<string>("Active")
    const { setIsFilterVisible, setSearchQuery, searchQuery } = useFlaggedContext()

    const prescribingLevels: DropdownItem[] = prescribingLevelsDropdown.map((item) => ({
        key: item.key,
        label: item.label,
        value: item.value,
        isSelected: item.value === prescribingLevel
    }))

    const statusOptions: DropdownItem[] = [
        { key: "Active", label: "Active", value: "Active", isSelected: status === "Active" },
        { key: "Inactive", label: "Inactive", value: "Inactive", isSelected: status === "Inactive" }
    ]

    return (
        <div className="flex items-center gap-2 w-full justify-between">
            <Input
                placeholder="Search provider name, patient name, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                className="!h-[35px] !shadow-xs !w-[400px] !px-2"
            />

            <div className="flex items-center gap-2">
                {/* <DatePicker
                    picker="month"
                    className="!h-[35px] !shadow-xs !w-[120px] !px-2 !rounded-lg"
                    style={{
                        fontFamily: "montserrat",
                        fontSize: "12px",
                        color: theme.colors.text.secondary,
                        fontWeight: theme.typography.bold.sm2,
                        borderColor: theme.colors.border.secondary,
                    }}
                // value={fromDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                // onChange={(dates) => {
                //     if (dates) {
                //         setFromDate(dates[0].toISOString().split('T')[0]);
                //         setToDate(dates[1].toISOString().split('T')[0]);
                //     } else {
                //         resetDate();
                //     }
                // }}
                />
                <Dropdown
                    menuItems={prescribingLevels}
                    onChange={(value) => setPrescribingLevel(value)}
                >
                    <Input
                        placeholder="Search"
                        value={prescribingLevel}
                        onChange={(e) => { }}
                        className="!h-[35px] !shadow-xs !w-[120px] !px-2"
                        PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                    />
                </Dropdown>
                <Dropdown
                    menuItems={statusOptions}
                    onChange={(value) => setStatus(value)}
                >
                    <Input
                        placeholder="Search"
                        value={status}
                        onChange={(e) => { }}
                        className="!h-[35px] !shadow-xs !w-[120px] !px-2"
                        PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                    />
                </Dropdown> */}
                <div
                    onClick={() => setIsFilterVisible(true)}
                    className="flex p-2 rounded-lg bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 items-center"
                >
                    <HiMiniAdjustmentsHorizontal size={17} color={theme.colors.text.secondary} />
                </div>
            </div>
        </div>
    )
}

export default Filter