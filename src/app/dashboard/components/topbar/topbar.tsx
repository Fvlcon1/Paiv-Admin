'use client'

import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Topbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className={`fixed top-0 z-10 h-[60px] px-4 flex items-center ml-[250px] border-b-[1px] border-solid border-b-border-primary w-full ${isScrolled ? "bg-bg-secondary" : "bg-transparent"}`}>
            <Link className="flex items-center gap-1" href={'/'}>
                <Image
                    src={"/assets/prod/logo.png"}
                    alt="logo"
                    width={25}
                    height={25}
                />
                <Text bold={TypographyBold.md}>
                    PAIV - Claim Review
                </Text>
            </Link>
        </div>
    )
}
export default Topbar