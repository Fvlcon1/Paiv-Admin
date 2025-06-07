'use client'

import { AnimatePresence } from "framer-motion"
import MFACode from "./components/MFACode"
import MFASelection from "./components/MFASelection"
import { useMFAContext } from "./context/mfaContext"
import { MFAViewStates } from "./utils/types"
import MobileAuthenticator from "./components/mobile auth/MobileAuthenticator"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Copyright from "../components/copyright"

const MFA = () => {
    const {viewState, setViewState} = useMFAContext()
    const [isEmail2faEnabled, setIsEmail2faEnabled] = useState(false)

    const checkMfaStatus = async () => {
        const response = await protectedApi.GET("mfa/admin/check-status")
        return response
    }

    const {mutate : checkMfaStatusMutation, isPending} = useMutation({
        mutationFn : checkMfaStatus,
        onSuccess : ({email_2fa_enabled, totp_2fa_enabled})=>{
            if(email_2fa_enabled){
                setIsEmail2faEnabled(email_2fa_enabled)
                setViewState(MFAViewStates.EMAIL)
            } else if(totp_2fa_enabled) {
                setViewState(MFAViewStates.MOBILE_APP)
            } else {
                setViewState(MFAViewStates.MFA_SELECTION)
            }
        }
    })

    useEffect(()=>{
        checkMfaStatusMutation()
    },[])

    return (
        <>
            <AnimatePresence>
                {
                    isPending ?
                    <div key={1} className="w-full h-screen flex justify-center items-center"><div className="normal-loader"></div></div>
                    :
                    viewState === MFAViewStates.MFA_SELECTION ?
                    <MFASelection key={2}/>
                    : viewState === MFAViewStates.EMAIL ?
                    <MFACode key={3} email_2fa_enabled={isEmail2faEnabled} />
                    : viewState === MFAViewStates.MOBILE_APP &&
                    <MobileAuthenticator key={4}/>
                }
                <div key={5} className="w-full relative flex justify-center items-center">
                    <Copyright />
                </div>
            </AnimatePresence>
        </>
    )
}
export default MFA