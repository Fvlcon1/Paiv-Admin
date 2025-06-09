import axios from "axios"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "universal-cookie"
import { useFormik } from "formik"
import validationSchema from "../utils/validationSchema"
import toast from "react-hot-toast"
import { protectedApi } from "@/app/utils/apis/api"

interface LoginType {
    email: string,
    password: string,
}

const useLogin = () => {
    const router = useRouter()
    const cookies = new Cookies()

    const sendEmailOtp = async () => {
        const response = await protectedApi.POST("mfa/admin/send-otp")
        return response
    }

    const { mutateAsync: sendEmailOtpMutation, isPending: sendEmailOtpPending } = useMutation({
        mutationFn: sendEmailOtp,
        onSuccess: () => {
            router.push("/auth/mfa/email-totp")
        }
    })

    const handeleSubmit = async (values: LoginType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
            hospital_id: "4",
            email: values.email,
            password: values.password,
        })
        return response.data
    }

    const { mutate: handleSubmitMutation, isPending: isPendingLogin, isError: isErrorLogin, error: errorLogin } = useMutation({
        mutationFn: handeleSubmit,
        onSuccess: (data) => {
            const token = data.temp_token || data.access_token
            cookies.set("accessToken", token, { path: "/" })
            if (!data.mfa_required)
                router.push("/auth/mfa/select")
            else
                sendEmailOtpMutation()
        },
        onError: (error: any) => {
            toast.error("Error logging in")
            console.log({ error })
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            handleSubmitMutation(values)
        }
    })
    return {
        formik,
        isPendingLogin,
        isErrorLogin,
        errorLogin,
        sendEmailOtpPending
    }
}
export default useLogin