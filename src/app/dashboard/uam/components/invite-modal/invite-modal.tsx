import Container from "@components/container/container"
import { AnimatePresence } from "framer-motion"
import Overlay from "@components/overlay/overlay"
import theme from "@styles/theme"
import Text from "@styles/components/text"
import { RiUserAddLine } from "react-icons/ri"
import Form from "./form"

const InviteModal = ({
    isVisible,
    close
}: {
    isVisible: boolean
    close: () => void
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <Overlay
                    onClick={() => close()}
                    className="!px-6"
                >
                    <Container
                        isVisible={isVisible}
                        close={close}
                        className=""
                        title="Invite User"
                    >
                        <div
                            className="w-[400px] flex flex-col"
                        >
                            <div className="bg-bg-secondary border-solid border-b-[1px] border-bg-tetiary rounded-t-[20px] h-[55px] flex items-center pl-4">
                                <div className="flex items-center gap-2">
                                    <RiUserAddLine color={theme.colors.main.primary} />
                                    <Text 
                                        textColor={theme.colors.main.primary}
                                        bold={theme.typography.bold.md}
                                    >
                                        Invite User
                                    </Text>
                                </div>
                            </div>

                            <div className="px-4 py-4">
                                <Form />
                            </div>                            
                        </div>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>

    )
}
export default InviteModal