'use client'

import Pressable from "@components/button/pressable";
import Text from "@styles/components/text"
import theme from "@styles/theme";
import { motion } from 'framer-motion';
import { IoIosArrowBack } from "react-icons/io";
import { MFAViewStates } from "../../utils/types";
import { useMFAContext } from "../../context/mfaContext";
import { TypographyBold, TypographySize } from "@styles/style.types";
import { PiDotDuotone } from "react-icons/pi";
import SetupInstructions from "./setupInstructions";
import QRCode from "./qrCode";

const MobileAuthSetup = () => {
    const {setViewState} = useMFAContext()

    return (
        <motion.div
            className="w-full flex justify-center items-center h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex gap-[70px] justify-center mt-[-50px] items-stretch">
                <SetupInstructions />
                <div className="h-auto flex items-center">
                    <div className="bg-bg-tetiary w-[2px] max-h-[500px] rounded-full h-full"></div>
                </div>
                <QRCode />
            </div>
        </motion.div>
    )
}
export default MobileAuthSetup