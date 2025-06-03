import FormInput from "@/app/auth/form input/formInput"
import Button from "@components/button/button"
import Dropdown from "@components/dropdown/dropdown"
import theme from "@styles/theme"
import { useFormik } from "formik"
import { MdEmail } from "react-icons/md"
import { RiUserAddLine } from "react-icons/ri"
import * as Yup from 'yup'
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import Pressable from "@components/button/pressable"
import { useRef } from "react"
import { BiChevronDown } from "react-icons/bi"

const Form = () => {
    const dropdownItems: DropdownItem[] = [
        { key: "1", label: "Admin", onClick: () => { formik.setFieldValue("role", "admin") } },
        { type: "divider", key: "divider-1" },
        { key: "2", label: "User", onClick: () => { formik.setFieldValue("role", "user") } },
    ]

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email("Invalid email address.")
            .required("Email is required."),
        firstname: Yup
            .string()
            .required("First name is required."),
        lastname: Yup
            .string()
            .required("Last name is required."),
        role: Yup
            .string()
            .required("Role is required."),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            firstname: "",
            lastname: "",
            role: ""
        },
        validationSchema,
        onSubmit: () => { }
    })

    return (
        <form className="flex flex-col gap-2">
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
                autoComplete="username"
            />

            <FormInput
                value={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur as any}
                touched={formik.touched.firstname}
                error={formik.errors.firstname}
                PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                name="firstname"
                type="text"
                placeholder="Eg: John"
                label="First Name"
                autoComplete="firstname"
            />

            <FormInput
                value={formik.values.lastname}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur as any}
                touched={formik.touched.lastname}
                error={formik.errors.lastname}
                PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                name="lastname"
                type="text"
                placeholder="Eg: Doe"
                label="Last Name"
                autoComplete="lastname"
            />

            <Dropdown
                menuItems={dropdownItems}
            >
                <FormInput
                    value={formik.values.role}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.role}
                    error={formik.errors.role}
                    PreIcon={<RiUserAddLine color={theme.colors.text.tetiary} />}
                    PostIcon={<BiChevronDown color={theme.colors.text.tetiary} />}
                    name="role"
                    type="text"
                    placeholder="Enter role"
                    label="Role"
                    autoComplete="off"
                />
            </Dropdown>

            <Button
                text="Invite"
                className="!w-full !h-[45px] mt-4"
                icon={<RiUserAddLine />}
                loading={false}
                loadingColor={theme.colors.bg.primary}
            />
        </form>
    )
}
export default Form