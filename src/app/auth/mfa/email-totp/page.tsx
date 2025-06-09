'use client'

import { useState, useRef, useEffect } from "react";
import Input from "@components/input/input";
import Text from "@styles/components/text";
import { TypographyBold, TypographySize } from "@styles/style.types";
import theme from "@styles/theme";
import Button from "@components/button/button";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import Pressable from "@components/button/pressable";
import { useMFAContext } from "../context/mfaContext";
import { MFAViewStates } from "../utils/types";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useAuth } from "@/app/context/authContext";
import useProfile from "@/app/hooks/useProfile";
import useMFA from "../hooks/useMFA";

const cookies = new Cookies()

const MFACode = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(60 * 5);
    const [canResend, setCanResend] = useState(false);
    const {setViewState} = useMFAContext()
    const router = useRouter()
    const {userDetails, setUserDetails} = useAuth()
    const {getProfileMutation} = useProfile()
    const {sendEmailOtpMutation, sendEmailOtpPending, enableEmailOtpMutation, enableEmailOtpPending, submitOTPMutation, submitOTPPending} = useMFA()

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (newOtp.every((digit) => digit !== "")) {
            submitOTPMutation(newOtp.join(""));
        }

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        setTimeout(() => inputRefs.current[index]?.setSelectionRange(1, 1), 0);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }

        // Arrow key navigation
        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Submit on Enter if all fields are filled
        if (e.key === "Enter" && otp.every((digit) => digit !== "")) {
            submitOTPMutation(otp.join(""));
        }

        setTimeout(() => inputRefs.current[index]?.setSelectionRange(1, 1), 0);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            setOtp(pastedData.split(""));
            inputRefs.current[5]?.focus();
            submitOTPMutation(pastedData)
        }
    };

    const handleResendCode = () => {
        setTimeLeft(60 * 5);
        setCanResend(false);
        sendEmailOtpMutation()
    };

    const isButtonEnabled = otp.every((digit) => digit !== "");

    if(enableEmailOtpPending || sendEmailOtpPending)
        return <div className="w-full h-screen flex justify-center items-center"><div className="normal-loader"></div></div>

    return (
        <motion.div
            className="w-full flex justify-center items-center h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form className="flex flex-col gap-4 items-center mt-[-50px]">
                <div className="flex flex-col gap-0 items-center">
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.main.primary}
                        size={TypographySize.HM}
                    >
                        MFA
                    </Text>
                    <Text>A verification code has been sent to</Text>
                    <Text bold={TypographyBold.md2}>{userDetails?.email}</Text>
                </div>
                <div className="flex gap-2 items-center">
                    {otp.map((value, index) => (
                        <Input
                            key={index}
                            value={value}
                            className="!w-[50px] !h-[50px] !rounded-lg flex justify-center items-center text-center !p-0"
                            inputClassName="!text-[20px] text-center"
                            placeholder=""
                            autofocus={index === 0}
                            autoComplete="off"
                            name={`v${index + 1}`}
                            onChange={(e) => handleChange(index, e.target.value)}
                            inputProps={{ 
                                maxLength: 1,
                                onKeyDown: (e) => handleKeyDown(index, e),
                                onPaste: handlePaste,
                            }}
                            ref={setInputRef(index)}
                        />
                    ))}
                </div>
                {
                    submitOTPPending &&
                    <div className="normal-loader !w-[20px]"></div>
                }
                <Button 
                    text="Resend code" 
                    disabled={!canResend} 
                    onClick={handleResendCode}
                />
                <Text textColor={theme.colors.main.primary}>
                    Code will expire in 
                    <Text
                        bold={TypographyBold.md2}
                    >
                        &nbsp;{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </Text>
                </Text>
            </form>
        </motion.div>
    );
};

export default MFACode;
