'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Copyright from "../components/copyright"
import Form from "./components/Form"
import { Suspense } from "react"
import Logo from "@components/logo/logo"

const Register = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center mt-[-50px]">
            <div className="w-[380px] flex flex-col gap-3">
                {/* Title */}
                <div className="w-full flex flex-col items-center gap-1 justify-center">
                    <Logo />
                    <div className="flex flex-col items-center gap-0">
                        <Text
                            size={TypographySize.HM}
                            textColor={theme.colors.text.primary}
                            bold={TypographyBold.md}
                        >
                            Register
                        </Text>
                        <Text>Please register to continue</Text>
                    </div>
                </div>

                <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><div className="normal-loader" /></div>}>
                    <Form />
                </Suspense>
            </div>
            <Copyright />
        </div>
    )
}
export default Register