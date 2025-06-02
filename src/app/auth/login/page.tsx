'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import { theme } from "@styles/theme"
import { useState } from "react"
import Form from "./components/Form"
import Logo from "@components/logo/logo"
import useLogin from "./hooks/useLogin"
import Copyright from "../components/copyright"

const Login = () => {
    const [stayLoggedIn, setStayLoggedIn] = useState(true)
    const {formik, isPendingLogin : isPending, isErrorLogin : isError, errorLogin : error} = useLogin()

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
                            Welcome Back
                        </Text>
                        <Text>Please login to continue</Text>
                    </div>
                </div>

                {/* Form */}
                <Form
                    formik={formik}
                    loading={isPending}
                    stayLoggedIn={stayLoggedIn}
                    setStayLoggedIn={setStayLoggedIn}
                />
            </div>

            <Copyright />
        </div>
    )
}
export default Login