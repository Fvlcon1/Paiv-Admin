import Text from "@styles/components/text"
import theme from "@styles/theme"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFlag } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"

const Menu = () => {
    const pathname = usePathname()

    const claimsMenuItems = [
        {
            title : "Approved",
            icon : FaCircleCheck,
            path : "/dashboard/approved"
        },
        {
            title : "Flagged",
            icon : FaFlag,
            path : '/dashboard/flagged'
        },
        {
            title : "Declined",
            icon : GiCancel,
            path : '/dashboard/declined'
        },
    ]
    return (
        <div className="flex gap-1 flex-col py-3">
            <div className="pl-4">
                <Text textColor={theme.colors.text.tetiary}>
                    Claims
                </Text>
            </div>
            <div className="flex flex-col">
                {
                    claimsMenuItems.map((item, index) => (
                        <Link 
                            className={`flex gap-2 items-center ${pathname === item.path ? "bg-[#6060d011]" : "hover:bg-bg-tetiary"} duration-200 px-4 py-2 cursor-pointer`}
                            href={item.path}
                            key={index}
                        >
                            <item.icon 
                                color={pathname === item.path ? theme.colors.text.primary : theme.colors.text.tetiary}
                                size={"13px"}
                            />
                            <Text
                                textColor={pathname === item.path ? theme.colors.text.primary : theme.colors.text.tetiary}
                            >
                                {item.title}
                            </Text>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Menu