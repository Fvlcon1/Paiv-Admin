import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import PopupAnimation from "@components/popup/popupAnimation"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TiWarning } from "react-icons/ti"
import { AnimatePresence } from "framer-motion"
import { RoleChip } from "../../hooks/useUAM"
import { hexOpacity } from "@/utils/hexOpacity"
import { PiWarningCircleBold } from "react-icons/pi"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { IUserInfo } from "../edit-modal/hooks/useEditUser"
import useDelete from "./useDeactivate"

const effects = [
    "Login access will be suspended until reactivated",
    "All user data and files will remain intact",
    "Account can be easily reactivated at any time"
]

const DeactivateConfirmationModal = ({
    isVisible,
    close,
    user
}: {
    isVisible: boolean;
    close: () => void;
    user: IUserInfo
}) => {
    const { deactivateUserMutation, isDeactivatePending } = useDelete({
        id: user.id,
        close
    })

    const handleDelete = () => {
        deactivateUserMutation()
    }
    return (
        <AnimatePresence>
            {
                isVisible && (
                    <Overlay
                        onClick={close}
                        key={1}
                    >
                        <Container
                            isVisible={isVisible}
                            close={close}
                        >
                            <div className="w-full flex flex-col rounded-xl">

                                {/* Head */}
                                <div className="bg-orange-50 border-b-[1px] border-border-primary p-2 py-4 flex flex-col gap-1 items-center">
                                    <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-orange-400">
                                        <TiWarning color={theme.colors.bg.primary} size={20} />
                                    </div>
                                    <Text
                                        size={theme.typography.size.HM}
                                        bold={theme.typography.bold.md}
                                    >
                                        Deactivate user account
                                    </Text>
                                    <Text className="mt-[-5px]">
                                    Temporarily suspend user access
                                    </Text>
                                </div>

                                {/* Body */}
                                <div className="w-full flex flex-col px-4 py-4">
                                    {/* Profile */}
                                    <div className="w-full rounded-xl bg-bg-primary-light flex flex-col overflow-hidden">
                                        <div className="w-full h-[80px] bg-main-primary ">

                                        </div>
                                        <div className="w-full h-full flex px-4 py-2 flex-col gap-2 border-[1px] border-border-primary rounded-b-xl">
                                            {/* Top Section */}
                                            <div className="w-full flex gap-4 mt-[-65px]">
                                                <div
                                                    className="w-[80px] h-[80px] rounded-full border-[5px] border-bg-primary flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: "#dcdaec"
                                                    }}
                                                >
                                                    <Text
                                                        size={theme.typography.size.HL}
                                                        bold={theme.typography.bold.md2}
                                                        textColor={theme.colors.main.primary}
                                                    >
                                                        {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[1].charAt(0).toUpperCase()}
                                                    </Text>
                                                </div>
                                                <div className="flex flex-col mt-3">
                                                    <Text
                                                        textColor={theme.colors.bg.primary}
                                                        size={theme.typography.size.body2}
                                                        bold={theme.typography.bold.md}
                                                    >
                                                        {user.name}
                                                    </Text>
                                                    <Text
                                                        textColor={theme.colors.bg.quantinary}
                                                    >
                                                        Admin
                                                    </Text>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="flex flex-col">
                                                <Text>
                                                    <Text
                                                        textColor={theme.colors.text.tetiary}
                                                    >
                                                        Email:&nbsp;
                                                    </Text>
                                                    {user.email}
                                                </Text>
                                                <Text>
                                                    <Text
                                                        textColor={theme.colors.text.tetiary}
                                                    >
                                                        Last active:&nbsp;
                                                    </Text>
                                                    {user.last_active}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Effects */}
                                    <div className="w-full flex flex-col gap-2 mt-4 p-4 bg-[#fef7f291] border-[1px] border-[#e3656526] rounded-xl">
                                        {
                                            effects.map((effect, index) => (
                                                <div 
                                                    key={index}
                                                    className="w-full flex items-center gap-2"
                                                >
                                                    <PiWarningCircleBold color={"#e27324"} size={15} />
                                                    <Text>
                                                        {effect}
                                                    </Text>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>

                                {/* Footer */}
                                <div className="w-full flex justify-center items-center gap-2 pb-4 px-4">
                                    <OutlineButton
                                        onClick={close}
                                        text="Cancel"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleDelete}
                                        loading={isDeactivatePending}
                                        text="Deactivate"
                                        background="#e27324"
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </Container>
                    </Overlay>
                )
            }
        </AnimatePresence>
    )
}
export default DeactivateConfirmationModal