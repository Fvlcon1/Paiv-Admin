'use client'

import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFlag, FaUserLock } from "react-icons/fa"
import { FaCediSign, FaCircleCheck } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { MdOutlinePendingActions, MdSpaceDashboard } from "react-icons/md"
import { useAppContext } from "@/app/context/context"
import { useEffect } from "react"
import { Tooltip } from "antd"
import { useAuth } from "@/app/context/authContext"

const Menu = () => {
    const pathname = usePathname()
    const { numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined } = useAppContext()
    const {userDetails} = useAuth()

    const claimsMenuItems = [
        {
            title: "Pending",
            icon: MdOutlinePendingActions,
            path: "/dashboard/pending",
            notifications: numberOfPending,
            badgeColor: "bg-[green]"
        },
        {
            title: "Approved",
            icon: FaCircleCheck,
            path: "/dashboard/approved",
            notifications: numberOfApproved,
            badgeColor: "bg-[green]"
        },
        {
            title: "Flagged",
            icon: FaFlag,
            path: '/dashboard/flagged',
            notifications: numberOfFlagged,
            badgeColor: "bg-[#d19017]"
        },
        {
            title: "Declined",
            icon: GiCancel,
            path: '/dashboard/declined',
            notifications: numberOfDeclined,
            badgeColor: "bg-[#c94c30]"
        },
    ]

    const getMenuTextStyle = (path: string) => {
        return {
            textColor: path === pathname ? theme.colors.main.primary : theme.colors.text.secondary,
            bold: path === pathname ? TypographyBold.md : TypographyBold.sm2
        }
    }

    const getLinkClassName = (path: string) => {
        return {
            className: `flex gap-2 items-center ${pathname === path ? "bg-[#6969ce23]" : "hover:bg-bg-tetiary"} justify-between duration-200 px-4 py-2 cursor-pointer`
        }
    }

    return (
        <div className="flex gap-1 flex-col pt-1">
            <Link
                className={getLinkClassName("/dashboard").className}
                href={"/dashboard"}
            >
                <div className="flex items-center gap-2">
                    <MdSpaceDashboard
                        color={getMenuTextStyle("/dashboard").textColor}
                        size={"15px"}
                    />
                    <Text
                        textColor={getMenuTextStyle("/dashboard").textColor}
                        bold={getMenuTextStyle("/dashboard").bold}
                    >
                        {"Dashboard"}
                    </Text>
                </div>
            </Link>

            <Divider />

            <div className="flex flex-col">
                {
                    claimsMenuItems.map((item, index) => (
                        <Link
                            className={getLinkClassName(item.path).className}
                            href={item.path}
                            key={index}
                        >
                            <div className="flex items-center gap-2">
                                <item.icon
                                    color={getMenuTextStyle(item.path).textColor}
                                    size={"14px"}
                                />
                                <Text
                                    textColor={getMenuTextStyle(item.path).textColor}
                                    bold={getMenuTextStyle(item.path).bold}
                                >
                                    {item.title}
                                </Text>
                            </div>
                            {
                                item.notifications > 0 ?
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

            <Divider />

            <Link
                className={getLinkClassName("/dashboard/paid").className}
                href={"/dashboard/paid"}
            >
                <div className="flex items-center gap-2">
                    <FaCediSign
                        color={getMenuTextStyle("/dashboard/paid").textColor}
                        size={"15px"}
                    />
                    <Text
                        textColor={getMenuTextStyle("/dashboard/paid").textColor}
                        bold={getMenuTextStyle("/dashboard/paid").bold}
                    >
                        {"Paid"}
                    </Text>
                </div>
                <div className="px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full bg-main-primary flex justify-center items-center">
                    <Text
                        size={TypographySize.xs}
                        textColor={theme.colors.bg.primary}
                    >
                        33
                    </Text>
                </div>
            </Link>

            <Divider />

            {
                userDetails?.role === "superadmin" ? (
                    <>
                        <Tooltip
                            title="Users and Access Management"
                            placement="right"
                        >
                            <Link
                                className={getLinkClassName("/dashboard/uam").className}
                                href={"/dashboard/uam"}
                            >
                                <div className="flex items-center gap-2">
                                    <FaUserLock
                                        color={getMenuTextStyle("/dashboard/uam").textColor}
                                        size={"15px"}
                                    />
                                    <Text
                                        textColor={getMenuTextStyle("/dashboard/uam").textColor}
                                        bold={getMenuTextStyle("/dashboard/uam").bold}
                                    >
                                        {"UAM"}
                                    </Text>
                                </div>
                            </Link>
                        </Tooltip>
                        <Divider />
                    </>
                ) : (
                    <></>
                )
            }

        </div>
    )
}
export default Menu