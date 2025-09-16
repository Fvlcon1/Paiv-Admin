import { useEffect, useState } from "react"
import { regions as allRegions } from "@/utils/regions"
import Button from "@components/button/button"
import { ViewState } from "./assign-by"
import Selectable from "@/app/components/selectable/selectable"
import { GroupBy } from "../../hooks/use-admins"

const Region = ({
    viewState,
    setViewState,
    groupBy,
    setGroupBy,
    selectedRegions,
    setSelectedRegions
}: {
    viewState: ViewState,
    setViewState: (viewState: ViewState) => void
    groupBy: GroupBy,
    setGroupBy: (groupBy: GroupBy) => void
    selectedRegions: string[],
    setSelectedRegions: (selectedRegions: string[]) => void
}) => {
    const [searchQuery, setSearchQuery] = useState("")

    // TODO: Remove this
    const testRegions = [{
        label : "Greater Accra",
        value : "Greater Accra",
        districts : []
    }]

    // TODO: Change testRegions to allRegions
    const formatRegions = testRegions.map(region => ({
        label: region.label,
        value: region.label,
        districts: region.districts || []
    }));

    const handleRegionChange = (selectedRegions: string[]) => {
        setSelectedRegions(selectedRegions);
    };

    useEffect(()=>{
        setGroupBy("region")
    }, [])

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