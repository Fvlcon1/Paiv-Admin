'use client'

import Input from "@components/input/input"
import { useState } from "react"
import theme from "@styles/theme"
import { IoGrid, IoReload, IoSearch } from "react-icons/io5"
import Button from "@components/button/button"
import Pressable from "@components/button/pressable"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Pagination from "./pagination"
import { Tooltip } from "antd"
import { FaListUl } from "react-icons/fa"
import { TiUserAdd } from "react-icons/ti"
import { RiUserAddLine } from "react-icons/ri"
import InviteModal from "./invite-modal/invite-modal"
import { useUAMContext } from "../context/context"

const Controls = () => {
    const [searchValue, setSearchValue] = useState("")
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false)
    const { refetchAccounts, refetchMetrics } = useUAMContext()

    const handleRefresh = () => {
        refetchAccounts()
        refetchMetrics()
    }

    return (
        <>
            <InviteModal 
                isVisible={isInviteModalVisible} 
                close={() => setIsInviteModalVisible(false)} 
            />

            <div className="w-full flex flex-col">
                <div className="w-full px-3 h-[60px] flex items-center border-b-[1px] border-solid border-b-border-primary gap-4 justify-between">
                    <div className="flex items-center gap-2 flex-1">
                        <Pressable
                            scaleFactor={0.95}
                            onClick={() => handleRefresh()}
                        >
                            <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
                                <IoReload
                                    color={theme.colors.text.primary}
                                />
                            </div>
                        </Pressable>
                        <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
                            <HiAdjustmentsHorizontal
                                color={theme.colors.text.primary}
                            />
                        </div>
                        <Pagination
                            pageNumber={pageNumber}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            setPageNumber={setPageNumber}
                        />

                        <Input
                            placeholder="Search user, eg; Dennis Boakye"
                            value={searchValue}
                            setValue={setSearchValue}
                            PreIcon={<IoSearch color={theme.colors.text.tetiary} />}
                            className="!h-[35px] !max-w-[500px]"
                        />
                    </div>

                    <Button
                        text="Invite User"
                        className="mr-2"
                        icon={<RiUserAddLine />}
                        onClick={() => setIsInviteModalVisible(true)}
                    />
                </div>
            </div>
        </>
    )
}
export default Controls