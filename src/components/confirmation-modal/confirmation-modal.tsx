import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TiWarning } from "react-icons/ti"
import { AnimatePresence } from "framer-motion"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { hexOpacity } from "@/utils/hexOpacity"
import { useEffect } from "react"

const ConfirmationModal = ({
    isVisible,
    close,
    description,
    children,
    onConfirm,
    cta,
    loading,
    title,
    icon,
    color,
}: {
    isVisible: boolean;
    close: () => void;
    description?: string,
    children?: React.ReactNode,
    onConfirm: () => Promise<void>,
    cta?: string
    loading?: boolean
    title?: string
    icon?: React.ReactNode
    color?: string,
}) => {
    useEffect(() => {
        console.log(loading)
    }, [loading])

    const handleConfirm = async () => {
        await onConfirm()
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
                                <div 
                                    className="bg-red-50 border-b-[1px] border-border-primary p-2 py-4 flex flex-col gap-1 items-center"
                                    style={{
                                        backgroundColor: color ? color + hexOpacity(10) : theme.colors.main.primary + hexOpacity(10)
                                    }}
                                >
                                    <div 
                                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-red-400"
                                        style={{
                                            backgroundColor: color ?? theme.colors.main.primary
                                        }}
                                    >
                                        {icon ?? <TiWarning color={theme.colors.bg.primary} size={20} />}
                                    </div>
                                    <Text
                                        size={theme.typography.size.HM}
                                        bold={theme.typography.bold.md}
                                    >
                                        {title ?? "Are you Sure?"}
                                    </Text>
                                </div>

                                {/* Body */}
                                <div className="w-full flex flex-col px-4 py-4">
                                    {
                                        description && (
                                            <Text
                                                size={theme.typography.size.body2}
                                            >
                                                {description}
                                            </Text>
                                        )
                                    }
                                    {children}
                                </div>

                                {/* Footer */}
                                <div className="w-full flex justify-center items-center gap-2 pb-4 px-4">
                                    <OutlineButton
                                        onClick={close}
                                        text="Cancel"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleConfirm}
                                        text={cta ?? "Continue"}
                                        loading={loading}
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
export default ConfirmationModal