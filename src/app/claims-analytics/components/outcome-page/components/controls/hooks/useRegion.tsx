import { useState, useEffect } from "react"
import { DropdownItem } from "@/utils/@types"
import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { useApprovedContext } from "../../../context/context"

const useRegion = () => {
    const [searchRegion, setSearchRegion] = useState("")
    const [regionDropdown, setRegionDropdown] = useState<DropdownItem[]>([])
    const [searchDistrict, setSearchDistrict] = useState("")
    const [districtDropdown, setDistrictDropdown] = useState<DropdownItem[]>([])
    const {setSelectedRegion, selectedRegion, setSelectedDistrict, selectedDistrict} = useApprovedContext()

    const getRegions = async () => {
        const response = await protectedApi.GET("https://regions-and-districts-in-ghana.onrender.com/regions")
        return response
    }

    const { data: regionsData, isLoading: regionsLoading, isRefetching : regionsRefetching } = useQuery({
        queryKey: ["regions"],
        queryFn: getRegions,
        refetchOnWindowFocus: false
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
                    setSelectedRegion(region.label)
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


        console.log({filteredRegions, dropdown})

        setRegionDropdown(dropdown)
    }

    const getDistrictsDropdown = () => {
        if(!selectedRegion)
            return setDistrictDropdown([{key : "1", label : "Select region first", disabled : true}])

        const regex = new RegExp(searchDistrict, 'i');
        const region = regionsData?.regions?.find((region: any) => region.label === selectedRegion)
        const filteredDistricts = region?.districts?.filter((district: any) => regex.test(district.label));

        const dropdown : DropdownItem[] = []
        filteredDistricts?.map((district: any, index : number) => {
            dropdown.push({
                key: index.toString(),
                label: district.label,
                onClick: () => {
                    setSelectedDistrict(district.label)
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
        if(regionsLoading){
            console.log("loading")
            setRegionDropdown([{key : "1", label : "Loading...", disabled : true}])
        }
    },[regionsLoading, regionsRefetching])

    useEffect(() => {
        getRegionsDropdown()
    }, [regionsData, searchRegion])

    useEffect(() => {
        getDistrictsDropdown()
    }, [regionsData, searchDistrict, selectedRegion])
    
    return {
        regionDropdown,
        districtDropdown,
        getRegionsDropdown,
        searchRegion,
        searchDistrict,
        getDistrictsDropdown,
        setSearchRegion,
        setSearchDistrict,
    }
}
export default useRegion