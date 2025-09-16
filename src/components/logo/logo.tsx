import Image from "next/image"
import Text from "@styles/components/text"
import theme from "@styles/theme"

export type ILogoColors = "light" | "dark" | "main"

const Logo = ({
    size = 30,
    color = "main"
} : {
    size? : number,
    color? : ILogoColors
}) => {
    const getLogoFromColor = () : string => {
        return color === "main"
                ? "/assets/prod/icon-logo-1.png"
                : color === "dark"
                ? "/assets/prod/icon-logo-1.png"
                : "/assets/prod/icon-logo-1.png"
    }

    return (
        <div className="flex items-center gap-1">
            <Image
                src={getLogoFromColor()}
                alt="logo"
                width={size}
                height={size}
            />
            {/* <Text
                size={theme.typography.size.HM}
                textColor={theme.colors.text.primary}
                bold={theme.typography.bold.md}
            >
                PAIV
            </Text> */}
            <Image
                src={"/assets/prod/logo-v1.png"}
                alt="logo"
                width={size + 10}
                height={size + 10}
            />
        </div>
    )
}
export default Logo