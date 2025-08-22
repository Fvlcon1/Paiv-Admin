'use client'

import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import Logo from "@components/logo/logo"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaPowerOff } from "react-icons/fa6"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Topbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        cookies.remove("access_token")
        router.push("/auth/login")
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className={`fixed top-0 z-50 h-[60px] px-4 flex items-center justify-between pl-[266px] border-b-[1px] border-solid border-b-border-primary w-full ${isScrolled ? "bg-bg-secondary" : "bg-transparent"}`}>
            <Link className="flex items-center gap-2" href={'/'}>
                <Logo size={40} color="dark" />
            </Link>
            <Button 
                text="Logout"
                onClick={handleLogout}
                icon={(
                    <FaPowerOff size={13} />
                )}
            />
        </div>
    )
}
export default Topbar