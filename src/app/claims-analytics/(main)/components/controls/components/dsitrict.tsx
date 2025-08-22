import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaBuilding, FaChevronDown, FaGlobeAfrica } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useDashboardContext } from "../../../context/context"

const District = () => {
    const [search, setSearch] = useState<string>("")
    const [menuItems, setMenuItems] = useState<DropdownItem[]>([])
    const {setSelectedDistrict} = useDashboardContext()
    
    const menuItemsList = [
        "Adenta Municipal",
        "Ledzokuku Municipal",
        "Ada East",
        "Shai Osudoku",
        "Ada West",
        "Ningo/Prampram",
        "La Dade-Kotopon",
        "La-Nkwantanang-Madina",
        "Ga East",
        "Ayawaso West",
        "Ga South Municipal",
        "Ga West Municipal",
        "Ga Central Municipal",
        "Tema West Municipal",
        "Ashaiman Municipal",
        "Kpone Municipal"
    ]

    useEffect(() => {
        const items : DropdownItem[] = []
        menuItemsList.map((item, index) => {
            items.push({
                key: index.toString(),
                label: item,
                onClick: () => {
                    setSelectedDistrict(item)
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
            setSelectedDistrict("")
    }, [search])

    return (
        <Dropdown
            menuItems={menuItems}
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