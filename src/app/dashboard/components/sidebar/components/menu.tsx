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

    useEffect(() => {
        console.log({numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined})
    }, [numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined])
    
    return (
        <div className="flex gap-1 flex-col pt-1">
            <Link 
                className={`flex gap-2 items-center ${pathname === "/dashboard/pending" ? "bg-[#6969ce23]" : "hover:bg-bg-tetiary"} justify-between duration-200 px-4 py-2 cursor-pointer`}
                href={"pending"}
            >
                <div className="flex items-center gap-2">
                    <MdOutlinePendingActions
                        color={pathname === "/dashboard/pending" ? theme.colors.text.primary : theme.colors.text.tetiary}
                        size={"15px"}
                    />
                    <Text
                        textColor={pathname === "/dashboard/pending" ? theme.colors.text.primary : theme.colors.text.tetiary}
                        bold={pathname === "/dashboard/pending" ? TypographyBold.md : TypographyBold.sm}
                    >
                        {"Pending"}
                    </Text>
                </div>
                {
                    numberOfPending > 0 ? (
                        <div className={`px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full bg-cyan-800 flex justify-center items-center`}>
                            <Text
                                size={TypographySize.xs}
                                textColor={theme.colors.text.primary}
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
                            className={`flex gap-2 items-center justify-between ${pathname === item.path ? "bg-[#6969ce23]" : "hover:bg-bg-tetiary"} duration-200 px-4 py-2 cursor-pointer`}
                            href={item.path}
                            key={index}
                        >
                            <div className="flex items-center gap-2">
                                <item.icon 
                                    color={pathname === item.path ? theme.colors.text.primary : theme.colors.text.tetiary}
                                    size={"13px"}
                                />
                                <Text
                                    textColor={pathname === item.path ? theme.colors.text.primary : theme.colors.text.tetiary}
                                >
                                    {item.title}
                                </Text>
                            </div>
                            {
                                item.notifications > 0 ?
                                <div className={`px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full ${item.badgeColor} flex justify-center items-center`}>
                                    <Text
                                        size={TypographySize.xs}
                                        textColor={theme.colors.text.primary}
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
                className={`flex gap-2 items-center ${pathname === "/dashboard/paid" ? "bg-[#6969ce23]" : "hover:bg-bg-tetiary"} justify-between duration-200 px-4 py-2 cursor-pointer`}
                href={"paid"}
            >
                <div className="flex items-center gap-2">
                    <FaCediSign
                        color={pathname === "/dashboard/paid" ? theme.colors.text.primary : theme.colors.text.tetiary}
                        size={"15px"}
                    />
                    <Text
                        textColor={pathname === "/dashboard/paid" ? theme.colors.text.primary : theme.colors.text.tetiary}
                        bold={pathname === "/dashboard/paid" ? TypographyBold.md : TypographyBold.sm}
                    >
                        {"Paid"}
                    </Text>
                </div>
                <div className="px-[6px] py-[2px] min-w-[20px] h-[20px] rounded-full bg-main-primary flex justify-center items-center">
                    <Text
                        size={TypographySize.xs}
                        textColor={theme.colors.text.primary}
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