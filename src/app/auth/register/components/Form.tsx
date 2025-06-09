'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState } from "react"
import { MdEmail } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa"
import useRegister from "../hooks/useRegister"
import { motion } from "framer-motion"
import { MdCheckCircle, MdErrorOutline } from "react-icons/md"

// Password requirement type
type PasswordRequirement = {
    text: string
    validator: (value: string) => boolean
}

const Form = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { formik, isPending } = useRegister()
    const [showRequirements, setShowRequirements] = useState(false)

    // Password requirements configuration
    const passwordRequirements: PasswordRequirement[] = [
        {
            text: "At least 8 characters",
            validator: (value) => value.length >= 8
        },
        {
            text: "Contains at least one number",
            validator: (value) => /\d/.test(value)
        },
        {
            text: "Contains at least one special character",
            validator: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
        },
        {
            text: "Contains at least one uppercase letter",
            validator: (value) => /[A-Z]/.test(value)
        },
        {
            text: "Contains at least one lowercase letter",
            validator: (value) => /[a-z]/.test(value)
        }
    ]

    // Check which requirements are met
    const checkRequirements = (password: string) => {
        return passwordRequirements.map(req => ({
            ...req,
            isValid: req.validator(password)
        }))
    }

    const currentRequirements = checkRequirements(formik.values.password)

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 px-6 py-6 bg-white rounded-[12px] border-[1px] border-border-primary">
                <FormInput
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                    name="email"
                    type="text"
                    placeholder="Eg: johndoe@paiv.com"
                    label="Email"
                />

                <FormInput
                    value={formik.values.firstname}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.firstname}
                    error={formik.errors.firstname}
                    autofocus
                    PreIcon={<FaUser color={theme.colors.text.tetiary} />}
                    name="firstname"
                    type="text"
                    placeholder="Enter firstname"
                    label="First Name"
                />

                <FormInput
                    value={formik.values.lastname}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.lastname}
                    error={formik.errors.lastname}
                    PreIcon={<FaUser color={theme.colors.text.tetiary} />}
                    name="lastname"
                    type="text"
                    placeholder="Enter lastname"
                    label="Last Name"
                />

                <div className="relative">
                    <FormInput
                        value={formik.values.password}
                        handleChange={(e) => {
                            formik.handleChange(e)
                            if (!showRequirements && (e?.target.value?.length ?? 0) > 0) {
                                setShowRequirements(true)
                            }
                        }}
                        handleBlur={(e: any) => {
                            formik.handleBlur(e)
                            console.log("blurrr")
                            setShowRequirements(false)
                        }}
                        inputProps={{
                            onFocus: () => {
                                if (formik.values.password.length > 0) {
                                    setShowRequirements(true)
                                }
                            }
                        }}
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        PreIcon={<RiLockPasswordFill color={theme.colors.text.tetiary} />}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        label="Password"
                        autoComplete="new-password"
                        PostIcon={
                            showPassword ?
                                <FaEyeSlash
                                    color={theme.colors.text.secondary}
                                    onClick={() => setShowPassword(false)}
                                    className='cursor-pointer'
                                />
                                :
                                <FaEye
                                    color={theme.colors.text.secondary}
                                    onClick={() => setShowPassword(true)}
                                    className='cursor-pointer'
                                />
                        }
                    />

                    {
                        showRequirements && (
                            <motion.div
                                className="absolute z-10 bg-bg-primary shadow-xl border-[1px] border-border-secondary px-4 py-3 mt-2 rounded-xl w-full"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="space-y-2">
                                    <Text
                                        textColor={theme.colors.text.secondary}
                                        bold={theme.typography.bold.md}
                                    >
                                        Password requirements:
                                    </Text>
                                    <div className="flex flex-col gap-2">
                                        {
                                            currentRequirements.map((req, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1"
                                                >
                                                    {req.isValid ? (
                                                        <MdCheckCircle color={theme.colors.main.primary} />
                                                    ) : (
                                                        <MdErrorOutline color={theme.colors.main.primary} />
                                                    )}
                                                    <Text
                                                        textColor={req.isValid ? theme.colors.main.primary : theme.colors.text.tetiary}
                                                    >
                                                        {req.text}
                                                    </Text>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </div>

                <Button
                    text="Register"
                    className="!w-full !h-[45px] !rounded-xl"
                    loading={isPending}
                />
                <PrivacyText />
            </div>
        </form>
    )
}
export default Form