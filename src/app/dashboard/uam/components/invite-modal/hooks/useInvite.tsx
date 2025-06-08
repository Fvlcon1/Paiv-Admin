import { protectedApi } from "@/app/utils/apis/api"
import { DropdownItem } from "@/utils/@types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import * as Yup from "yup"
import { useUAMContext } from "../../../context/context"

const useInvite = ({
    close
}: {
    close: () => void
}) => {
    const [searchRegion, setSearchRegion] = useState("")
    const [regionDropdown, setRegionDropdown] = useState<DropdownItem[]>([])
    const [searchDistrict, setSearchDistrict] = useState("")
    const [districtDropdown, setDistrictDropdown] = useState<DropdownItem[]>([])
    const { refetchAccounts, refetchMetrics } = useUAMContext()

    const sendInvite = async () => {
        const response = await protectedApi.POST("superadmin/invite-admin", {
            email: formik.values.email,
            role: formik.values.role,
            region: formik.values.region,
            district: formik.values.district
        })
        return response
    }

    const { mutateAsync: sendInviteMutation, isPending: isInvitePending } = useMutation({
        mutationFn: sendInvite,
        onSuccess: () => {
            toast.success("Invite sent successfully")
            refetchAccounts()
            refetchMetrics()
            close()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to send invite")
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
            email: "",
            role: "",
            region: "",
            district: ""
        },
        validationSchema,
        onSubmit: () => {
            sendInviteMutation()
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

    useEffect(() => {
        getRegionsDropdown()
    }, [regionsData, searchRegion])

    useEffect(() => {
        getDistrictsDropdown()
    }, [regionsData, searchDistrict, formik.values.region])

    return {
        formik,
        isInvitePending,
        regionDropdown,
        searchRegion,
        setSearchRegion,
        districtDropdown,
        searchDistrict,
        setSearchDistrict
    }
}
export default useInvite