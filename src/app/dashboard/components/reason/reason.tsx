import Button from "@components/button/button"
import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import PopupAnimation from "@components/popup/popupAnimation"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

const Reason = ({
    isVisible = true,
    close,
    handleSubmit,
    isLoading,
    error,
    success
} : {
    isVisible? : boolean
    close? : ()=>void
    handleSubmit? : (value:string)=>void
    isLoading? : boolean
    error? : any
    success? : boolean
}) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [value, setValue] = useState("")
    return (
        <AnimatePresence>
            {
                !success && isVisible ?
                <Overlay onClick={close} key={0}>
                    <PopupAnimation>
                        <Container
                            isVisible={isVisible}
                            close={close}
                        >
                            <div className="w-[450px] flex flex-col gap-2">
                                {/* Title */}
                                <div className="bg-bg-secondary border-solid border-b-[1px] border-bg-tetiary rounded-t-[20px] h-[55px] flex items-center pl-6">
                                    <Text bold={TypographyBold.md}>
                                        Confirmation
                                    </Text>
                                </div>

                                {/* Reason */}
                                <div className="w-full flex flex-col gap-1 px-5 py-2">
                                    <Text className="pl-1">
                                        Reason
                                    </Text>
                                    <div
                                        className={`flex w-full h-fit min-h-[100px] flex-1 gap-2 px-3 py-[10px] rounded-xl bg-bg-secondary border-bg-tetiary border-[1px] border-solid duration-200`}
                                        style={{
                                            borderColor: (inputFocus || hover) ? theme.colors.main.primary : theme.colors.border.secondary
                                        }}
                                    >
                                        <textarea
                                            className="flex w-full flex-1 bg-transparent outline-none placeholder:text-[12px] placeholder:text-text-tetiary text-text-primary md:text-[12px] text-[16px]"
                                            placeholder="Please provide a reason for declining the claim"
                                            onFocus={(e) => {
                                                setInputFocus(true);
                                            }}
                                            onBlur={(e) => {
                                                setInputFocus(false);
                                            }}
                                            onMouseOver={(e) => {
                                                setHover(true);
                                            }}
                                            onMouseLeave={(e) => {
                                                setHover(false);
                                            }}
                                            value={value}
                                            onChange={e => setValue(e.target.value)}
                                        >

                                        </textarea>
                                    </div>
                                </div>

                                {
                                    error && (
                                        <div className="w-full flex justify-center items-center h-full">
                                            <Text
                                                textColor={"orange"}
                                                bold={TypographyBold.md}
                                            >
                                                {error}
                                            </Text>
                                        </div>
                                    )
                                }

                                {/* Actions */}
                                <div className="bg-bg-secondary border-solid border-t-[1px] border-bg-tetiary rounded-b-[20px] h-[55px] flex items-center pl-6">
                                    <div className="w-full flex justify-end gap-2 items-center h-full px-6">
                                        <Button
                                            text="Cancel"
                                            className="!border-none"
                                            onClick={close}
                                        />
                                        <Button 
                                            text="Decline"
                                            className="!bg-[#BA3D36] !border-none"
                                            color={theme.colors.bg.primary}
                                            onClick={handleSubmit ? ()=>handleSubmit(value) : ()=>{}}
                                            loading={isLoading}
                                            loadingColor={theme.colors.bg.primary}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </PopupAnimation>
                </Overlay>
                :
                <></>
            }
        </AnimatePresence>
    )
}
export default Reason