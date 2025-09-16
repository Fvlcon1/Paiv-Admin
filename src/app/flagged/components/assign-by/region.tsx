import { useState } from "react"
import Input from "@components/input/input"
import { IoSearch } from "react-icons/io5"
import theme from "@styles/theme"
import Chip from "./chip"
import Selectable from "../../../components/selectable/selectable"
import { regions as allRegions } from "@/utils/regions"
import Button from "@components/button/button"
import { ViewState } from "./assign-by"

const Region = ({
    viewState,
    setViewState,
    selectedRegions,
    setSelectedRegions
}: {
    viewState: ViewState,
    setViewState: (viewState: ViewState) => void
    selectedRegions: string[]
    setSelectedRegions: (selectedRegions: string[]) => void
}) => {
    const [searchQuery, setSearchQuery] = useState("")
    const formatRegions = allRegions.map(region => ({
        label: region.label,
        value: region.label,
        districts: region.districts || []
    }));

    const handleRegionChange = (selectedRegions: string[]) => {
        setSelectedRegions(selectedRegions);
    };

    return (
        <div className="flex flex-col gap-2 px-2">
            <Selectable
                items={formatRegions}
                onSelectionChange={handleRegionChange}
                selectedItems={selectedRegions}
            />
            <Button 
                text="Next"
                onClick={() => { setViewState("assigning") }}
                className="!w-full"
            />
        </div>
    )
}
export default Region