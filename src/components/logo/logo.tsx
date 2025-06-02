import Image from "next/image"

export type ILogoColors = "light" | "dark" | "main"

const Logo = ({
    size = 25,
    color = "main"
} : {
    size? : number,
    color? : ILogoColors
}) => {

    const getLogoFromColor = () : string => {
        return color === "main"
                ? "/assets/prod/logo-main.png"
                : color === "dark"
                ? "/assets/prod/logo-dark.png"
                : "/assets/prod/logo-light.png"
    }

    return (
        <Image
            src={getLogoFromColor()}
            alt="logo"
            width={size}
            height={size}
        />
    )
}
export default Logo