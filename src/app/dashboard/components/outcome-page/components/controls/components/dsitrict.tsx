import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaBuilding, FaChevronDown } from "react-icons/fa"
import { useApprovedContext } from "../../../context/context"
import useRegion from "../hooks/useRegion";

const District = () => {
    const [search, setSearch] = useState<string>("")
    const {setSelectedDistrict, selectedDistrict} = useApprovedContext()
    const {districtDropdown} = useRegion()

    useEffect(() => {
        if(!districtDropdown.find((item) => item.label === search)?.label)
            setSelectedDistrict("")
    }, [search])

    useEffect(() => {
        setSearch(selectedDistrict ?? "")
    }, [selectedDistrict])

    return (
        <Dropdown
            menuItems={districtDropdown}
        >
            <Input
                placeholder="Select District"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!h-[33px]"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                PreIcon={<FaBuilding color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )
}
export default District