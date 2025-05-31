import Button from "@components/button/button"
import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import PopupAnimation from "@components/popup/popupAnimation"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Input from "@components/input/input"

const Reason = ({
    isVisible = true,
    close,
    handleSubmit,
    isLoading,
    error,
    success
}: {
    isVisible?: boolean
    close?: () => void
    handleSubmit?: (value: string) => void
    isLoading?: boolean
    error?: any
    success?: boolean
}) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [value, setValue] = useState("")

    const formik = useFormik({
        initialValues: {
            reason: "",
            id: ""
        },
        validationSchema: Yup.object().shape({
            reason: Yup.string().required("Reason is required"),
            id: Yup.string().required("Id is required")
        }),
        onSubmit: (values) => {
            if (handleSubmit) {
                handleSubmit(values.reason)
            }
        }
    })

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

                                    {/* Form */}
                                    <form onSubmit={formik.handleSubmit}>
                                        {/* Id */}
                                        <div className="w-full flex flex-col gap-1 px-5 py-2">
                                            <Text className="pl-1">
                                                Id
                                            </Text>
                                            <Input 
                                                name="id"
                                                placeholder="Enter Id"
                                                value={formik.values.id}
                                                onChange={formik.handleChange}
                                                borderColor={formik.touched.id && formik.errors.id ? "#be3b39" : undefined}
                                            />
                                            {
                                                formik.touched.id && formik.errors.id && (
                                                    <Text
                                                        textColor={"#be3b39"}
                                                    >
                                                        {formik.errors.id}
                                                    </Text>
                                                )
                                            }
                                        </div>

                                        {/* Reason */}
                                        <div className="w-full flex flex-col gap-1 px-5 py-2">
                                            <Text className="pl-1">
                                                Reason
                                            </Text>
                                            <div
                                                className={`flex w-full h-fit min-h-[100px] flex-1 gap-2 px-3 py-[10px] rounded-xl bg-bg-secondary border-bg-tetiary border-[1px] border-solid duration-200`}
                                                style={{
                                                    borderColor: (inputFocus || hover) ? theme.colors.main.primary : formik.touched.reason && formik.errors.reason ? "#be3b39" : theme.colors.border.secondary
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
                                                    name="reason"
                                                    value={formik.values.reason}
                                                    onChange={formik.handleChange}
                                                >

                                                </textarea>
                                            </div>
                                            {
                                                formik.touched.reason && formik.errors.reason && (
                                                    <Text
                                                        textColor={"#be3b39"}
                                                    >
                                                        {formik.errors.reason}
                                                    </Text>
                                                )
                                            }
                                        </div>
                                    </form>


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
                                                onClick={formik.handleSubmit as any}
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