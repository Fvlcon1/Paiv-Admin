import Image from "next/image"

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
                ? "/assets/prod/logo-v1.png"
                : color === "dark"
                ? "/assets/prod/logo-v1.png"
                : "/assets/prod/logo-v1.png"
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