'use client'

import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { BiSolidLandmark } from "react-icons/bi"
import { FaInfoCircle } from "react-icons/fa"
import { FaChartSimple, FaChevronDown, FaGlobe } from "react-icons/fa6"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { PiHospitalFill } from "react-icons/pi"
import SummaryCards from "./summary-cards/cards"
import Filters from "./filters/filters"

const Greeting = () => (
    <div className="flex flex-col gap-0">
        <Text>
            Welcome back,
        </Text>
        <Text
            size={theme.typography.size.HL}
            bold={theme.typography.bold.lg}
            lineHeight={1}
        >
            Mawuli Pomary
        </Text>
    </div>
)

const Top = () => {
    const shadowClass = "shadow-[3px_0px_5px_0px_rgba(34,97,97,0.4)]"
    return (
        <div className="w-full rounded-2xl bg-bg-primary flex justify-between gap-6 items-center p-6">
            <div className="flex flex-col gap-4">
                {/* <Greeting /> */}
                <Filters />
            </div>
            <SummaryCards />
        </div>
    )
}

export default Top