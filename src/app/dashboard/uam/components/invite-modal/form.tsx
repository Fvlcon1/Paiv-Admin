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
import useInvite from "./hooks/useInvite"

const Form = ({
    close
}: {
    close: () => void
}) => {
    const { formik, isInvitePending, regionDropdown, searchRegion, setSearchRegion, districtDropdown, searchDistrict, setSearchDistrict } = useInvite({ close })
    const dropdownItems: DropdownItem[] = [
        { key: "1", label: "Superadmin", onClick: () => { formik.setFieldValue("role", "superadmin") } },
        { type: "divider", key: "divider-1" },
        { key: "2", label: "Admin", onClick: () => { formik.setFieldValue("role", "admin") } },
        // { type: "divider", key: "divider-2" },
        // { key: "3", label: "Reviewer", onClick: () => { formik.setFieldValue("role", "reviewer") } },
    ]

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
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

            <Dropdown
                menuItems={regionDropdown}
            >
                <FormInput
                    value={searchRegion}
                    handleChange={(e) => setSearchRegion(e?.target.value ?? "")}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.region}
                    error={formik.errors.region}
                    PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                    PostIcon={<BiChevronDown color={theme.colors.text.tetiary} />}
                    name="region"
                    type="text"
                    placeholder="Enter region"
                    label="Region"
                    autoComplete="off"
                />
            </Dropdown>

            <Dropdown
                menuItems={districtDropdown}
            >
                <FormInput
                    value={searchDistrict}
                    handleChange={(e) => setSearchDistrict(e?.target.value ?? "")}
                    handleBlur={formik.handleBlur as any}
                    touched={formik.touched.district}
                    error={formik.errors.district}
                    PreIcon={<MdEmail color={theme.colors.text.tetiary} />}
                    PostIcon={<BiChevronDown color={theme.colors.text.tetiary} />}
                    name="district"
                    type="text"
                    placeholder="Enter district"
                    label="District"
                    autoComplete="off"
                />
            </Dropdown>

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
                loading={isInvitePending}
                loadingColor={theme.colors.bg.primary}
            />
        </form>
    )
}
export default Form