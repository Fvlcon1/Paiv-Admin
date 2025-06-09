'use client'

import Button from '@components/button/button';
import Text from '@styles/components/text';
import { TypographySize } from '@styles/style.types';
import theme from '@styles/theme';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { TbShieldLockFilled } from 'react-icons/tb';
import { MFAViewStates } from '../utils/types';
import toast from 'react-hot-toast';
import { useMFAContext } from '../context/mfaContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useMFA from '../hooks/useMFA';

const MFASelection = () => {
    const [selectedMfa, setSelectedMfa] = useState<MFAViewStates>(MFAViewStates.EMAIL)
    const router = useRouter()
    const {enableEmailOtpMutation, enableEmailOtpPending, sendEmailOtpPending} = useMFA()

    const handleMFASelection = (mfaType : MFAViewStates) => {
        setSelectedMfa(mfaType)
    }

    const handleContinue = () => {
        if(!selectedMfa)
            return toast.error("Please select an authentication method")
        if(selectedMfa === MFAViewStates.EMAIL)
            enableEmailOtpMutation()
        else if(selectedMfa === MFAViewStates.MOBILE_APP)
            router.push("/auth/mfa/mobile-auth")
    }

    return (
        <motion.div
            className="w-full flex justify-center items-center h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col gap-4 items-center mt-[-50px] w-[500px]">
                <TbShieldLockFilled 
                    size={40}
                    color={theme.colors.text.secondary}
                />
                <div className="flex flex-col gap-0 items-center">
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.secondary}
                        size={TypographySize.HM}
                    >
                        Two-Factor authentication
                    </Text>
                    <Text
                        textAlign='center'
                    >
                        For added security, please select how you'd like to verify your identity. Choose your preferred authentication method to continue logging in.
                    </Text>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div 
                        className={`w-full p-4  gap-4 flex items-center cursor-pointer hover:bg-bg-tetiary duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${selectedMfa === MFAViewStates.EMAIL ? 'border-main-primary bg-[#6060d01e]' : 'border-border-tetiary'} rounded-xl`}
                        onClick={()=>handleMFASelection(MFAViewStates.EMAIL)}    
                    >
                        {
                            selectedMfa === MFAViewStates.EMAIL ?
                            <FaCheckCircle
                                size={20}
                                color={theme.colors.main.primary}
                            />
                            :
                            <div className='rounded-full w-[20px] h-[20px] bg-bg-quantinary'>

                            </div>
                        }
                        <div className='flex flex-col gap-[2px]'>
                            <Text
                                fontfamily='greater-theory'
                            >
                                Email Verification
                            </Text>
                            <Text>
                                Receive verification codes via email
                            </Text>
                        </div>
                    </div>
                    <div 
                        className={`w-full p-4  gap-4 flex items-center cursor-pointer hover:bg-bg-tetiary duration-200 h-[100px] bg-bg-secondary border-[1px] border-solid ${selectedMfa === MFAViewStates.MOBILE_APP ? 'border-main-primary bg-[#6060d01e]' : 'border-border-tetiary'} rounded-xl`}
                        onClick={()=>handleMFASelection(MFAViewStates.MOBILE_APP)}    
                    >
                        {
                            selectedMfa === MFAViewStates.MOBILE_APP ?
                            <FaCheckCircle
                                size={20}
                                color={theme.colors.main.primary}
                            />
                            :
                            <div className='rounded-full w-[20px] h-[20px] bg-bg-quantinary'>

                            </div>
                        }
                        <div className='flex flex-col gap-[2px]'>
                            <Text
                                fontfamily='greater-theory'
                            >
                                Mobile app authenticator
                            </Text>
                            <Text>
                                Use a mobile app like google authenticator to generate verification codes
                            </Text>
                        </div>
                    </div>
                </div>
                <Button 
                    text='Continue'
                    className='!w-full !bg-main-primary !h-[45px]'
                    onClick={handleContinue}
                    loading={enableEmailOtpPending || sendEmailOtpPending}
                />
                <Link href="/">
                    <Text
                        textColor={theme.colors.main.primary}
                        className='hover:opacity-70 duration-200'
                    >
                        Continue without MFA ››
                    </Text>
                </Link>
            </div>
        </motion.div>
    )
}
export default MFASelection