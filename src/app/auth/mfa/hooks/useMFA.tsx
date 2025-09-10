import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import Cookies from "universal-cookie"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import useProfile from "@/app/hooks/useProfile"
import { useAuth } from "@/app/context/authContext"

const useMFA = () => {
    const cookies = new Cookies()
    const router = useRouter()
    const { getProfileMutation } = useProfile()
    const { userDetails } = useAuth()

    const enableEmailOtp = async () => {
        const response = await protectedApi.POST("mfa/admin/email/enable")
        return response
    }

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

    const { mutate: enableEmailOtpMutation, isPending: enableEmailOtpPending } = useMutation({
        mutationFn: enableEmailOtp,
        onSuccess: () => {
            sendEmailOtpMutation()
        }
    })

    const submitOTP = async (otp: string) => {
        console.log({ otp });
        const response = await protectedApi.POST("mfa/admin/verify-otp", {
            email: userDetails?.email,
            otp: otp
        });
        return response
    };

    const { mutate: submitOTPMutation, isPending: submitOTPPending } = useMutation({
        mutationFn: submitOTP,
        onSuccess: (data) => {
            cookies.set("accessToken", data.access_token, { path: "/" })
            getProfileMutation()
            toast.success("Setup completed successfully")
            router.push("/")
        },
        onError: () => {
            toast.error("Error setting up mobile auth")
        }
    })

    return {
        sendEmailOtpMutation,
        sendEmailOtpPending,
        enableEmailOtpMutation,
        enableEmailOtpPending,
        submitOTPMutation,
        submitOTPPending
    }
}

export default useMFA