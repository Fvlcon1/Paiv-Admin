'use client'

import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFlag } from "react-icons/fa"
import { FaCediSign, FaCircleCheck } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { MdOutlinePendingActions } from "react-icons/md"
import { useAppContext } from "@/app/context/context"
import { useEffect } from "react"

const Menu = () => {
    const pathname = usePathname()
    const { numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined } = useAppContext()

    const claimsMenuItems = [
        {
            title : "Approved",
            icon : FaCircleCheck,
            path : "/dashboard/approved",
            notifications : numberOfApproved,
            badgeColor : "bg-[green]"
        },
        {
            title : "Flagged",
            icon : FaFlag,
            path : '/dashboard/flagged',
            notifications : numberOfFlagged,
            badgeColor : "bg-[#d19017]"
        },
        {
            title : "Declined",
            icon : GiCancel,
            path : '/dashboard/declined',
            notifications : numberOfDeclined,
            badgeColor : "bg-[#c94c30]"
        },
    ]

    const getMenuTextStyle = (path : string) => {
        return {
            textColor : path === pathname ? theme.colors.main.primary : theme.colors.text.secondary,
            bold : path === pathname ? TypographyBold.md : TypographyBold.sm
        }
    }

    const getLinkClassName = (path : string) => {
        return {
            className : `flex gap-2 items-center ${pathname === path ? "bg-[#6969ce23]" : "hover:bg-bg-tetiary"} justify-between duration-200 px-4 py-2 cursor-pointer`
        }
    }

    useEffect(() => {
        console.log({numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined})
    }, [numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined])
    
    return (
        <div className="flex gap-1 flex-col pt-1">
            <Link 
                className={getLinkClassName("/dashboard/pending").className}
                href={"/dashboard/pending"}
            >
                <div className="flex items-center gap-2">
                    <MdOutlinePendingActions
                        color={getMenuTextStyle("/dashboard/pending").textColor}
                        size={"15px"}
                    />
                    <Text
                        textColor={getMenuTextStyle("/dashboard/pending").textColor}
                        bold={getMenuTextStyle("/dashboard/pending").bold}
                    >
                        {"Pending"}
                    </Text>
                </div>
                {
                    numberOfPending > 0 ? (
                        <div className={`px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full bg-cyan-800 flex justify-center items-center`}>
                            <Text
                                size={TypographySize.xs}
                                textColor={theme.colors.bg.primary}
                            >
                                {numberOfPending}
                            </Text>
                        </div>
                    ) : (
                        <></>
                    )
                }
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
                                    size={"13px"}
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

        </div>
    )
}
export default Menu