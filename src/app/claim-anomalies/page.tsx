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
import { FaExclamationTriangle } from "react-icons/fa"

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

    const Header = () => {
        return (
            <div className="flex items-center gap-2">
                <FaExclamationTriangle size={20} color={theme.colors.text.primary} />
                <Text
                    size={theme.typography.size.HM2}
                    textColor={theme.colors.text.secondary}
                    bold={theme.typography.bold.md2}
                    className={`!pl-[2px] ${gradientClass}`}
                >
                    Claim Anomalies
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

const ClaimAnomalies = () => {
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
export default ClaimAnomalies