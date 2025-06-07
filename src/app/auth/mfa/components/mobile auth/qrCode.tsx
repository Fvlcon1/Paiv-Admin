'use client'

import { protectedApi } from "@/app/utils/apis/api"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import MobileAuthCode from "./mobileAuthCode"
import Image from "next/image"
import Copychip from "@components/chip/copyChip"

const QRCode = () => {
    const getQRCode = async () => {
        const response = await protectedApi.POST("/mfa/admin/totp/setup")
        return response
    }

    const {mutate : getQRCodeMutation, isPending, data} = useMutation({
        mutationFn : getQRCode,
        onError : (error) => {
            toast.error("Error getting qr code")
            console.log({error})
        },
        onSuccess : (data) => console.log({data})
    })

    useEffect(()=>{
        getQRCodeMutation()
    },[])

    return (
        <div className="flex flex-col mt-[35px] max-w-[400px]">
            <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-2 items-center">
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.primary}
                        size={TypographySize.body2}
                    >
                        Scan Qr code
                    </Text>
                    <div className="w-[300px] h-[300px] rounded-xl bg-[#ffffff0a] p-6 flex justify-center items-center">
                        {
                            isPending ? 
                            <div className="normal-loader"></div>
                            : data?.qr_code ?
                            <div className="w-[250px] h-[250px] rounded-lg overflow-hidden">
                                <Image 
                                    src={data.qr_code}
                                    alt="logo"
                                    width={250}
                                    height={250}
                                />
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col gap-1 rounded-xl items-center">
                    <Text textAlign="center">
                        <Text bold={TypographyBold.md} textColor={theme.colors.text.primary}>Scan not working?</Text> Copy this code key and enter it manually into your authentication app
                    </Text>
                    <Copychip text={data?.secret} />
                </div>
                <MobileAuthCode />
            </div>
        </div>
    )
}
export default QRCode