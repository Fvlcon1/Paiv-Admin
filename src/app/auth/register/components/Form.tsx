'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { MdEmail, MdMyLocation } from "react-icons/md"
import FormInput from "../../form input/formInput"
import PrivacyText from "./privacyText"
import { RiLockPasswordFill } from "react-icons/ri"
import { GiHospitalCross } from "react-icons/gi"
import { IoLocation, IoMap } from "react-icons/io5"
import Pressable from "@components/button/pressable"
import { DropdownItem } from "@/utils/@types"
import { FaEye, FaEyeSlash, FaPowerOff, FaUser } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import Dropdown from "@components/dropdown/dropdown"
import Coordinates from "./coordinates"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const Form = ({
    loading,
    formik,
}: {
    formik: any,
    loading: boolean
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 px-6 py-6 bg-white rounded-[12px] border-[1px] border-border-primary">
                <FormInput
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
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
                    handleBlur={formik.handleBlur}
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
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.lastname}
                    error={formik.errors.lastname}
                    PreIcon={<FaUser color={theme.colors.text.tetiary} />}
                    name="lastname"
                    type="text"
                    placeholder="Enter lastname"
                    label="Last Name"
                />

                <FormInput
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    touched={formik.touched.password}
                    error={formik.errors.password}
                    PreIcon={<RiLockPasswordFill color={theme.colors.text.tetiary} />}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    label="Password"
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
                <Button
                    text="Register"
                    className="!w-full !h-[45px] !rounded-xl !bg-main-primary"
                    loading={loading}
                />
                <PrivacyText />
            </div>
        </form>
    )
}
export default Form