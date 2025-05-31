import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import { useEffect, useState } from "react"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import { GiCaduceus } from "react-icons/gi"
import { useDashboardContext } from "../../../context/context"

const Hospital = () => {
    const [search, setSearch] = useState<string>("")
    const [menuItems, setMenuItems] = useState<DropdownItem[]>([])
    const {setSelectedHospital} = useDashboardContext()
    
    const menuItemsList = [
        "Tema General Hospital",
        "Mother of God Hospital",
        "Accra Psychiatric Hospital",
        "Korle-Bu Teaching Hospital",
        "37 Military Hospital",
        "Ridge Hospital",
        "Nyaho Medical Centre",
        "Lighthouse Medical Centre",
        "Komfo Anokye Teaching Hospital"
    ]

    useEffect(() => {
        const items : DropdownItem[] = []
        menuItemsList.map((item, index) => {
            items.push({
                key: index.toString(),
                label: item,
                onClick: () => {
                    setSelectedHospital(item)
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
            setSelectedHospital("")
    }, [search])

    return (
        <Dropdown
            menuItems={menuItems}
        >
            <Input
                placeholder="Select Hospital"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!h-[33px]"
                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
            />
        </Dropdown>
    )
}
export default Hospital