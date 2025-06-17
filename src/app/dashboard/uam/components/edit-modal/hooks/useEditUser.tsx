import { protectedApi } from "@/app/utils/apis/api"
import { DropdownItem } from "@/utils/@types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { useUAMContext } from "../../../context/context"

export interface IUserInfo {
    id: string,
    name: string,
    email: string,
    role: string,
    region: string,
    district: string,
    last_active: string
    status: string,
    invite_id: number
}

const useEditUser = ({
    close,
    user
}: {
    close: () => void,
    user: IUserInfo
}) => {
    const [searchRegion, setSearchRegion] = useState(user.region)
    const [regionDropdown, setRegionDropdown] = useState<DropdownItem[]>([])
    const [searchDistrict, setSearchDistrict] = useState(user.district)
    const [districtDropdown, setDistrictDropdown] = useState<DropdownItem[]>([])
    const { refetchAccounts, refetchMetrics } = useUAMContext()

    const editUser = async () => {
        const response = await protectedApi.PUT(`superadmin/admins/${user.id}`, {
            role: user.role,
            region: user.region,
            district: user.district
        })
        return response
    }

    const { mutateAsync: editUserMutation, isPending: isEditPending } = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            toast.success("User edited successfully")
            refetchAccounts()
            refetchMetrics()
            close()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || "Failed to edit user")
        }
    })

    const getRegions = async () => {
        const response = await protectedApi.GET("https://regions-and-districts-in-ghana.onrender.com/regions")
        return response
    }

    const { data: regionsData, isLoading: regionsLoading } = useQuery({
        queryKey: ["regions"],
        queryFn: getRegions,
        refetchOnWindowFocus: false
    })

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email("Invalid email address.")
            .required("Email is required."),
        role: Yup
            .string()
            .required("Role is required."),
        region: Yup
            .string()
            .required("Region is required."),
        district: Yup
            .string()
            .required("District is required."),
    })

    const formik = useFormik({
        initialValues: {
            email: user.email,
            role: user.role,
            region: user.region,
            district: user.district
        },
        validationSchema,
        onSubmit: () => {
            editUserMutation()
        }
    })

    const getRegionsDropdown = () => {
        const regex = new RegExp(searchRegion, 'i');
        const filteredRegions = regionsData?.regions?.filter((region: any) => regex.test(region.label));

        const dropdown : DropdownItem[] = []
        filteredRegions?.map((region: any, index : number) => {
            dropdown.push({
                key: index.toString(),
                label: region.label,
                onClick: () => {
                    formik.setFieldValue("region", region.label)
                    setSearchRegion(region.label)
                }
            })
            if(index !== filteredRegions.length - 1) {
                dropdown.push({
                    type: "divider",
                    key: `divider-${index}`
                })
            }
        })

        setRegionDropdown(dropdown)
    }

    const getDistrictsDropdown = () => {
        if(!formik.values.region)
            return setDistrictDropdown([{key : "1", label : "Select region first", disabled : true}])

        const regex = new RegExp(searchDistrict, 'i');
        const region = regionsData?.regions?.find((region: any) => region.label === formik.values.region)
        const filteredDistricts = region?.districts?.filter((district: any) => regex.test(district.label));

        const dropdown : DropdownItem[] = []
        filteredDistricts?.map((district: any, index : number) => {
            dropdown.push({
                key: index.toString(),
                label: district.label,
                onClick: () => {
                    formik.setFieldValue("district", district.label)
                    setSearchDistrict(district.label)
                }
            })
            if(index !== filteredDistricts.length - 1) {
                dropdown.push({
                    type: "divider",
                    key: `divider-${index}`
                })
            }
        })

        setDistrictDropdown(dropdown)
    }

    useEffect(()=>{
        if(regionsLoading)
            setRegionDropdown([{key : "1", label : <div className="normal-loader" />, disabled : true}])
    },[regionsLoading])

    useEffect(() => {
        getRegionsDropdown()
    }, [regionsData, searchRegion])

    useEffect(() => {
        getDistrictsDropdown()
    }, [regionsData, searchDistrict, formik.values.region])

    return {
        formik,
        isEditPending,
        regionDropdown,
        searchRegion,
        setSearchRegion,
        districtDropdown,
        searchDistrict,
        setSearchDistrict
    }
}
export default useEditUser