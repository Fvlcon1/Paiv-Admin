import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaChevronDown, FaGlobeAfrica } from "react-icons/fa"
import { useDashboardContext } from "../../../context/context"

const Region = () => {
    const [search, setSearch] = useState<string>("")
    const [menuItems, setMenuItems] = useState<DropdownItem[]>([])
    const {setSelectedRegion} = useDashboardContext()
    
    const menuItemsList = [
        "Greater Accra",
        "Ashanti",
        "Brong Ahafo",
        "Western",
        "Eastern",
        "Central",
        "Volta",
        "Northern",
    ]

    useEffect(() => {
        const items : DropdownItem[] = []
        menuItemsList.map((item, index) => {
            items.push({
                key: index.toString(),
                label: item,
                onClick: () => {
                    setSelectedRegion(item)
                    setSearch(item)
                }
            })
            if(menuItemsList.length - 1 !== index)
                items.push({ type: "divider", key: `divider-${item}` })
        })
        setMenuItems(items)
    }, [])

    useEffect(() => {
        if(!menuItemsList.includes(search))
            setSelectedRegion("")
    }, [search])

    return (
        <Dropdown
            menuItems={menuItems}
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