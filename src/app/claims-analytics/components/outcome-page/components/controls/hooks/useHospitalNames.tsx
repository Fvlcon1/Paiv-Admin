'use client'

import { DropdownItem } from "@/utils/@types"
import { hospitalsInGhana } from "../utils/hospital-names"
import { useEffect, useState } from "react"
import { useApprovedContext } from "../../../context/context"

const useHospitalNames = () => {
    const [searchHospitalName, setSearchHospitalName] = useState("")
    const {setSelectedHospital, selectedHospital} = useApprovedContext()
    const [hospitalNamesDropdown, setHospitalNamesDropdown] = useState<DropdownItem[]>([])

    const getHospitalNamesDropdown = () => {
        const dropdown : DropdownItem[] = []
        const regex = new RegExp(searchHospitalName, 'i');
        const filteredNames = hospitalsInGhana?.filter((name) => regex.test(name.name));
    
        filteredNames.map((name, index) => {
            dropdown.push({
                key: index.toString(),
                label: name.name,
                onClick: () => {
                    setSelectedHospital(name.name)
                    setSearchHospitalName(name.name)
                }
            })
            if(index !== hospitalsInGhana.length - 1) {
                dropdown.push({
                    type: "divider",
                    key: `divider-${index}`
                })
            }
        })

        setHospitalNamesDropdown(dropdown)
    }

    useEffect(()=>{
        getHospitalNamesDropdown()
    },[searchHospitalName])

    return {
        searchHospitalName,
        setSearchHospitalName,
        hospitalNamesDropdown
    }
}
export default useHospitalNames