import Pressable from "@components/button/pressable"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { IoIosArrowBack } from "react-icons/io"
import { PiDotDuotone } from "react-icons/pi"
import { useMFAContext } from "../../context/mfaContext"
import { MFAViewStates } from "../../utils/types"

const SetupInstructions = () => {
    const {setViewState} = useMFAContext()

    return (
        <div className="flex flex-col gap-4 max-w-[400px]">
            <div className="w-full">
                <Pressable
                    className="w-fit ml-[-5px] flex items-center gap-1 hover:opacity-70 cursor-pointer duration-200"
                    scaleFactor={0.99}
                    onClick={()=>setViewState(MFAViewStates.MFA_SELECTION)}
                >
                    <IoIosArrowBack
                        color={theme.colors.text.primary}
                    />
                    <Text textColor={theme.colors.text.primary}>
                        Back
                    </Text>
                </Pressable>
            </div>
            <div className="flex flex-col gap-0">
                <Text
                    fontfamily="greater-theory"
                    textColor={theme.colors.text.primary}
                    size={TypographySize.HM}
                >
                    Set Up Your Authentication App
                </Text>
                <Text className="max-w-[300px]">
                    Enhance your account security by enabling two-factor authentication (2FA)
                </Text>
            </div>
            <div className="flex flex-col gap-2 bg-[#ffffff0a] p-4 px-6 rounded-xl">
                <Text
                    textColor={theme.colors.text.primary}
                    bold={TypographyBold.md}
                    size={TypographySize.body2}
                >
                    Step-by-Step Instructions:
                </Text>
                <div className="flex flex-col gap-1">
                    <Text 
                        textColor={theme.colors.text.primary}
                        bold={TypographyBold.sm2}
                    >
                        1. Download an authentication app
                    </Text>
                    <div className="flex flex-col gap-1 pl-2">
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>If you don’t already have one, install an authentication app such as: Google Authenticator (Android & iOS), Authy (Android, iOS, Desktop), Microsoft Authenticator, Duo Mobile, etc.</Text>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Text 
                        textColor={theme.colors.text.primary}
                        bold={TypographyBold.sm2}
                    >
                        2. Scan the QR Code
                    </Text>
                    <div className="flex flex-col pl-2">
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>Open the authentication app</Text>
                        </div>
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>Tap "Add Account" or "Scan QR Code".</Text>
                        </div>
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>Point your camera at the QR code on the right.</Text>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Text 
                        textColor={theme.colors.text.primary}
                        bold={TypographyBold.sm2}
                    >
                        3. Enter the Verification Code
                    </Text>
                    <div className="flex flex-col pl-2">
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>After scanning, your app will generate a 6-digit code.</Text>
                        </div>
                        <div className="flex items-center">
                            <PiDotDuotone size={30} color={theme.colors.text.primary}/>
                            <Text>Enter the code in the space provided on your right</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <Text
                    fontfamily="greater-theory"
                    textColor={theme.colors.text.primary}
                    size={TypographySize.HM}
                >
                    Video Tutorial 
                </Text>
                <Text className="max-w-[300px]">
                    Need more help? Watch this video guide on setting up an authentication app
                </Text>
                <div className="max-w-[300px] overflow-hidden rounded-xl mt-2">
                    <iframe 
                        width="100%"
                        src="https://www.youtube.com/embed/-jtb7g0mztE" 
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
export default SetupInstructions