'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import Copyright from "../components/copyright"
import useRegister from "./hooks/useRegister"
import Form from "./components/Form"

const Register = () => {
    const {formik, isPending} = useRegister()

    return (
        <div className="w-full h-screen flex justify-center items-center mt-[-50px]">
            <div className="w-[350px] flex flex-col gap-3">
                <div className="w-full flex flex-col items-center gap-1 justify-center">
                    <Image 
                        src={"/assets/prod/logo.png"}
                        alt="logo"
                        width={25}
                        height={25}
                    />
                    <Text
                        size={TypographySize.HM}
                        textColor={theme.colors.text.primary}
                        bold={TypographyBold.md}
                    >
                        Register
                    </Text>
                </div>
                <Form
                    formik={formik}
                    loading={isPending}
                />
            </div>
            <Copyright />
        </div>
    )
}
export default Register