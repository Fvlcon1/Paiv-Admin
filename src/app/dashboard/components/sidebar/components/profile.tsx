'use client'

import { useState, useRef } from "react";
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaAngleDown } from "react-icons/fa"
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from "react-use"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useAuth } from "@/app/context/authContext"

const Profile = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const { userDetails } = useAuth()
    const [searchValue, setSearchValue] = useState("")
    const containerRef = useRef<HTMLDivElement>(null);

    useClickAway(containerRef, () => {
        setIsProfileVisible(false);
    });

    return (
        userDetails ? (
            <div className="w-full flex flex-col gap-1 p-3 border-b border-border-primary">
                <div className="relative flex flex-col" ref={containerRef}>
                    {/* Profile Button */}
                    <div
                        className="flex gap-2 px-1 py-1 w-fit items-center rounded-full cursor-pointer hover:bg-[#ffffff0c] transition duration-300"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up
                            setIsProfileVisible(prev => !prev);
                        }}
                    >
                        <div className="w-[25px] h-[25px] rounded-full bg-main-primary flex justify-center items-center">
                            <Text
                                bold={TypographyBold.md}
                                textColor={theme.colors.bg.primary}
                                size={theme.typography.size.xs2}
                            >
                                {`${userDetails?.name?.split(" ")[0].slice(0, 1).toUpperCase()}${userDetails?.name?.split(" ")[1].slice(0, 1).toUpperCase()}`}
                            </Text>
                        </div>
                        <Text textColor={theme.colors.text.primary}>
                            {userDetails?.name}
                        </Text>
                        <FaAngleDown color={theme.colors.text.secondary} size={13} />
                    </div>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                        {isProfileVisible && (
                            <motion.div
                                initial={{ y: -10, opacity: 0, height: 0 }}
                                animate={{ y: 0, opacity: 1, height: 300 }}
                                exit={{ y: -10, opacity: 0, height: 0 }}
                                className="absolute w-[210px] rounded-xl border h-[300px] border-border-secondary py-2 px-4 flex flex-col bg-bg-tetiary top-full ml-1 mt-2 left-0 shadow-lg"
                            >

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/** Search bar */}
                <div className="w-full flex">
                    <Input
                        value={searchValue}
                        setValue={setSearchValue}
                        className="!py-[5px] !bg-[#ffffff0c] pl-[10px] pr-1"
                        placeholder="Search anything..."
                        PreIcon={
                            <FaMagnifyingGlass
                                color={theme.colors.text.tetiary}
                                size={13}
                            />
                        }
                        PostIcon={
                            <div className="h-[25px] px-[6px] flex justify-center items-center border-solid border-[1px] border-border-primary bg-bg-tetiary rounded-lg">
                                <Text
                                    size={TypographySize.xs}
                                >
                                    ⌘K
                                </Text>
                            </div>
                        }
                    />
                </div>
            </div>
        ) : <></>
    )
}
export default Profile