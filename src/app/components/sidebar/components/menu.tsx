'use client'

import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaThList, FaUserLock, FaCogs, FaExclamationTriangle } from "react-icons/fa"
import { FaCediSign, FaCircleCheck, FaFileLines, FaFlag } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { MdOutlinePendingActions, MdSpaceDashboard } from "react-icons/md"
import { useAppContext } from "@/app/context/context"
import { useEffect } from "react"
import { Tooltip } from "antd"
import { useAuth } from "@/app/context/authContext"
import { IconType } from "react-icons"
import { BsFillMegaphoneFill } from "react-icons/bs"
import { hexOpacity } from "@/utils/hexOpacity"
import { TiWarning } from "react-icons/ti"

interface IMenuItem {
    title: string
    icon: IconType
    path: string
    notifications?: number
    badgeColor?: string
}

const Menu = () => {
    const pathname = usePathname()
    const { numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined } = useAppContext()
    const { userDetails } = useAuth()

    const claimsMenuItems: IMenuItem[] = [
        {
            title: "Claims Analytics",
            icon: FaThList,
            path: "/claims-analytics",
        },
        {
            title: "Claim Explorer",
            icon: FaFileLines,
            path: "/claim-explorer",
        },
        {
            title: "Batch Processing Monitor",
            icon: FaCogs,
            path: "/batch-processing",
        },
        {
            title: "Flagged Claims",
            icon: FaFlag,
            path: '/flagged',
            notifications: numberOfFlagged,
            badgeColor: "bg-[#d19017]"
        },
        {
            title: "Claim Anomalies",
            icon: FaExclamationTriangle,
            path: '/claim-anomalies',
            notifications: 5,
            badgeColor: "bg-text-danger"
        },
        {
            title: "Annoucement",
            icon: BsFillMegaphoneFill,
            path: "/annoucement",
        },
        {
            title: "UAM",
            icon: FaUserLock,
            path: "/uam",
        },
    ]

    const getMenuTextStyle = (path: string) => {
        const isActive = pathname === path || (pathname.startsWith(path));
        return {
            textColor: isActive ? theme.colors.bg.primary : theme.colors.bg.primary + hexOpacity(80),
            bold: isActive ? TypographyBold.md : TypographyBold.sm2
        }
    }

    const getLinkClassName = (path: string) => {
        const isActive = pathname === path || (pathname.startsWith(path));
        return {
            className: `flex gap-2 items-center ${isActive ? "bg-bg-primary/10" : "hover:bg-bg-primary/10"} justify-between duration-200 px-4 py-2 cursor-pointer`
        }
    }

    return (
        <div className="flex gap-1 flex-col pt-1">
            <div className="flex flex-col gap-0.5">
                {
                    claimsMenuItems.map((item, index) => (
                        item.path === "/dashboard/uam" && userDetails?.role != "superadmin" ? null :
                            <Link
                                className={getLinkClassName(item.path).className}
                                href={item.path}
                                key={index}
                            >
                                <div className="flex items-center gap-2">
                                    <item.icon
                                        color={getMenuTextStyle(item.path).textColor}
                                        size={12}
                                    />
                                    <Text
                                        textColor={getMenuTextStyle(item.path).textColor}
                                        bold={getMenuTextStyle(item.path).bold}
                                    >
                                        {item.title}
                                    </Text>
                                </div>
                                {
                                    item.notifications && item.notifications > 0 ?
                                        <div className={`px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full ${item.badgeColor} flex justify-center items-center`}>
                                            <Text
                                                size={TypographySize.xs}
                                                textColor={theme.colors.bg.primary}
                                            >
                                                {item.notifications}
                                            </Text>
                                        </div>
                                        :
                                        <></>
                                }
                            </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Menu