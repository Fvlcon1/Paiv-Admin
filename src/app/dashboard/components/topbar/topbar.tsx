import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Image from "next/image"
import Link from "next/link"

const Topbar = () => {
    return (
        <div className="fixed top-0 h-[60px] px-4 flex items-center ml-[250px] border-b-[1px] border-solid border-b-border-primary w-full">
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