import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaChevronDown, FaGlobeAfrica } from "react-icons/fa"
import { useApprovedContext } from "../../../context/context"
import useRegion from "../hooks/useRegion";

const Region = () => {
    const [search, setSearch] = useState<string>("")
    const {setSelectedRegion, selectedRegion} = useApprovedContext()
    const {regionDropdown} = useRegion()

    useEffect(() => {
        if(!regionDropdown.find((item) => item.label === search)?.label)
            setSelectedRegion("")
    }, [search])

    useEffect(() => {
        setSearch(selectedRegion ?? "")
    }, [selectedRegion])

    return (
        <Dropdown
            menuItems={regionDropdown}
        >
            <Input
                placeholder="Select Region"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!h-[33px]"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                PreIcon={<FaGlobeAfrica color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )
}
export default Region