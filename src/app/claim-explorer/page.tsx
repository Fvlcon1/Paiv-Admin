'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { RiHome6Fill } from "react-icons/ri"
import { IconType } from "react-icons"
import Link from "next/link"
import { Fragment } from "react"
import { gradientClass } from "@/utils/constants"
import { IoFilter } from "react-icons/io5"
import Input from "@components/input/input"
import { FaChevronDown, FaFolder } from "react-icons/fa6"
import { DropdownItem } from "@/utils/@types"
import { useState } from "react"
import Dropdown from "@components/dropdown/dropdown"
import { FaSearch } from "react-icons/fa"
import { HiAdjustmentsHorizontal, HiMiniMagnifyingGlass } from "react-icons/hi2"
import TableHead from "./components/table-head"
import TableBody from "./components/table-body"
import TableBodySorted from "./components/table-body-sorted"
import SlideIn from "@styles/components/slidein"
import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import { AnimatePresence } from "framer-motion"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { GiMagicBroom } from "react-icons/gi"
import FilterSlider from "./components/filter-slider"
import { useExplorerContext } from "./context/explorer-context"
import FacilityProfileSlider from "./components/facility-profile-slider"
import TableSkeleton from "@components/loaders/table-skeleton-v2"
import Filter from "./components/filter"

interface ICrumbs {
    icon?: IconType
    title?: string
    path: string
    active?: boolean
}

const Top = () => {
    const crumbs: ICrumbs[] = [
        {
            icon: RiHome6Fill,
            path: "/dashboard",
        },
        {
            title: "Claim Explorer",
            path: "/dashboard/claim-explorer",
            active: true
        },
    ]

    const Crumbs = () => {
        return (
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
        )
    }

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
                    Claim Explorer
                </Text>
            </div>
        )
    }

    return (
        <>
            <FilterSlider />
            <FacilityProfileSlider />
            <div className="w-full flex flex-col gap-2 px-4">
                <Crumbs />
                <Header />
                <Filter />
            </div>
        </>
    )
}

const ClaimExplorer = () => {
    const { providersLoading } = useExplorerContext()
    return (
        <SlideIn
            direction="right"
            className="w-full flex flex-col gap-2 py-4"
        >
            <Top />
            {
                providersLoading ? (
                    <TableSkeleton
                        rows={20}
                        showHeader
                    />
                ) : (
                    <>
                        <div className="w-full flex flex-col gap-4">
                            <TableHead />
                            <TableBodySorted />
                        </div>
                    </>
                )
            }
        </SlideIn>
    )
}
export default ClaimExplorer