'use client'
import Text from "@styles/components/text"
import { useParams } from "next/navigation"
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import { Fragment } from "react"
import Link from "next/link"
import { RiHome6Fill } from "react-icons/ri"
import { IconType } from "react-icons"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { FaChevronDown, FaFolder } from "react-icons/fa6"
import { IoFilter } from "react-icons/io5"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import theme from "@styles/theme"
import { gradientClass } from "@/utils/constants"
import SlideIn from "@styles/components/slidein"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useRouter } from "next/navigation"
import Table from "./components/table"
import Filter from "./components/filter"
import FilterSlider from "./components/filter-slider"
import TableSkeleton from "@components/loaders/table-skeleton-v2"
import useFlagged from "./hooks/use-flagged"

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Top = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [status, setStatus] = useState<string>("Active")
    const { hospital } = useParams<{ hospital: string }>()
    const formattedHospitalName = hospital ? decodeURIComponent(hospital).replace(/%20/g, ' ') : ''
    const router = useRouter()

    const crumbs: ICrumbs[] = [
        {
            icon: RiHome6Fill,
            path: "/dashboard",
        },
        {
            title: "Claim Explorer",
            path: "/dashboard/claim-explorer",
        },
        {
            title: formattedHospitalName,
            path: `/dashboard/claim-explorer/${hospital}`,
            active: true
        },
    ]

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

    const statusOptions: DropdownItem[] = [
        { key: "Active", label: "Active", value: "Active", isSelected: status === "Active" },
        { key: "Inactive", label: "Inactive", value: "Inactive", isSelected: status === "Inactive" }
    ]

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <FaFolder
                    color={theme.colors.text.tetiary}
                    size={30}
                />
                <Text
                    size={theme.typography.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.typography.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    Flagged Claims
                </Text>
            </div>
        )
    }

    return (
        <>
            <FilterSlider />
            <div className="w-full flex flex-col gap-2 px-4">
                <Header />
                <Filter />
            </div>
        </>
    )
}

const Flagged = () => {
    const { isFlaggedClaimsLoading, isFlaggedClaimsRefetching } = useFlagged()

    if (isFlaggedClaimsLoading || isFlaggedClaimsRefetching) {
        return (
            <TableSkeleton
                columns={7}
                rows={20}
                showHeader
            />
        )
    }

    return (
        <SlideIn
            direction="right"
            className="w-full flex flex-col gap-2 py-4"
        >
            <Top />
            <Table />
        </SlideIn>
    )
}
export default Flagged