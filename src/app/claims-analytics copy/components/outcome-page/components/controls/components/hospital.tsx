import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useApprovedContext } from "../../../context/context"
import useHospitalNames from '../hooks/useHospitalNames';

const Hospital = () => {
    const {setSelectedHospital, selectedHospital} = useApprovedContext()
    const {hospitalNamesDropdown, searchHospitalName, setSearchHospitalName} = useHospitalNames()

    useEffect(() => {
        setSearchHospitalName(selectedHospital ?? "")
    }, [selectedHospital])

    return (
        <Dropdown
            menuItems={hospitalNamesDropdown}
        >
            <Input
                placeholder="Select Hospital"
                value={searchHospitalName}
                onChange={(e) => setSearchHospitalName(e.target.value)}
                className="!h-[33px]"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )
}
export default Hospital