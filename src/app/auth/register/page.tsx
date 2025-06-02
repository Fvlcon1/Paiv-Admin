'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useFormik } from "formik"
import Image from "next/image"
import validationSchema from './utils/validationSchema'
import { useEffect, useState } from "react"
import Form from "./components/Form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { message } from "antd"
import toast from "react-hot-toast"
import Link from "next/link"
import Copyright from "../components/copyright"

interface SignupType {
    adminName : string,
    email : string
    password : string
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = async (values : SignupType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            admin_name: values.adminName,
            email: values.email,
            password: values.password
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn : handleSubmit,
        onSuccess : ()=>{
            toast.success("registration successful")
            router.push('/auth/login')
        },
        onError: (error) => {
            toast.error(error.message)
            console.error({error});
        }
    })

    const {isError, isPending, error, mutate} = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            adminName : '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log({values})
            mutate(values)
        }
    })

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
export default Login