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
import Table from "./table"
import Filter from "./components/filter"
import FilterSlider from "./components/filter-slider"

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Top = () => {
    const [prescribingLevel, setPrescribingLevel] = useState<string>("All levels")
    const [status, setStatus] = useState<string>("Active")
    const params = useParams()
    const { hospital } = params
    const batchId = params["batch-id"]
    const formattedHospitalName = hospital ? decodeURIComponent(hospital as string).replace(/%20/g, ' ') : ''
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
        },
        {
            title: batchId as string,
            path: `/dashboard/claim-explorer/${hospital}/${batchId}`,
            active: true
        },
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

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <Text
                    size={theme.typography.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.typography.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    {`#${batchId}`}
                </Text>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 px-4">
            <Crumbs />
            <Header />
            <Filter />
        </div>
    )
}

const Claims = () => {
    return (
        <>
            <FilterSlider />
            <SlideIn
                direction="right"
                className="w-full flex flex-col gap-2 py-4"
            >
                <Top />
                <Table />
            </SlideIn>
        </>
    )
}
export default Claims