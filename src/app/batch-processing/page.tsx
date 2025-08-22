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

    const Crumbs = () => {
        return (
            <div className="flex items-center gap-2">
                <div
                    className="flex gap-1 px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit cursor-pointer hover:bg-bg-tetiary duration-200"
                    onClick={() => router.back()}
                >
                    <IoMdArrowRoundBack size={15} color={theme.colors.text.tetiary} />
                    <Text
                        bold={theme.typography.bold.sm2}
                    >
                        Back
                    </Text>
                </div>
                <div className="flex px-3 py-1 rounded-lg bg-bg-secondary items-center w-fit">
                    <div className="flex items-center gap-1">
                        {
                            crumbs.map((crumb, index) => (
                                <Fragment key={index}>
                                    <Link
                                        href={crumb.path}
                                    >
                                        <div className="flex items-center">
                                            {
                                                crumb.icon &&
                                                <crumb.icon size={15} color={theme.colors.text.tetiary} />
                                            }
                                            <Text
                                                textColor={crumb.active ? theme.colors.text.secondary : theme.colors.text.tetiary}
                                                bold={crumb.active ? theme.typography.bold.md : theme.typography.bold.sm2}
                                            >
                                                &nbsp;{crumb.title}
                                            </Text>
                                        </div>
                                    </Link>
                                    {index < crumbs.length - 1 && <Text textColor={theme.colors.text.tetiary}>/</Text>}
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    const Filter = () => {
        return (
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="flex p-2 rounded-lg bg-bg-secondary items-center">
                        <IoFilter size={17} color={theme.colors.text.secondary} />
                    </div>
                    <Dropdown
                        menuItems={prescribingLevels}
                        onChange={(value) => setPrescribingLevel(value)}
                    >
                        <Input
                            placeholder="Search"
                            value={prescribingLevel}
                            onChange={(e) => { }}
                            className="!h-[35px] !shadow-xs !w-[120px]"
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
                            className="!h-[35px] !shadow-xs !w-[120px]"
                            PostIcon={<FaChevronDown size={11} color={theme.colors.text.tetiary} />}
                        />
                    </Dropdown>
                </div>

                <Input
                    placeholder="Search facility name"
                    value={""}
                    onChange={(e) => { }}
                    PreIcon={<HiMiniMagnifyingGlass size={15} color={theme.colors.text.tetiary} />}
                    className="!h-[35px] !shadow-xs !w-[400px] !px-3"
                />
            </div>
        )
    }

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <Text
                    size={theme.typography.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.typography.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    Batch Processing
                </Text>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 px-4">
            <Header />
            <Filter />
        </div>
    )
}

const BatchProcessing = () => {
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
export default BatchProcessing