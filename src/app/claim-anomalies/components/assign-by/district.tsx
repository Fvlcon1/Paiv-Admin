import { useEffect, useState } from "react"
import { regions as allRegions } from "@/utils/regions"
import Button from "@components/button/button"
import { ViewState } from "./assign-by"
import Selectable from "@/app/components/selectable/selectable"
import { GroupBy } from "../../hooks/use-admins"

const District = ({
    viewState,
    setViewState,
    groupBy,
    setGroupBy,
    selectedDistricts,
    setSelectedDistricts
}: {
    viewState: ViewState,
    setViewState: (viewState: ViewState) => void
    groupBy: GroupBy,
    setGroupBy: (groupBy: GroupBy) => void
    selectedDistricts: string[],
    setSelectedDistricts: (selectedDistricts: string[]) => void
}) => {
    const [searchQuery, setSearchQuery] = useState("")

    // Get all districts from all regions
    const allDistricts = allRegions.flatMap(region =>
        (region.districts || []).map(district => ({
            ...district,
            regionCode: region.code,
            regionName: region.label
        }))
    );

    // Format districts for the selectable component
    const formatDistricts = allDistricts.map(district => ({
        label: district.label,
        value: district.label,
        regionCode: district.regionCode
    }));

    useEffect(()=>{
        setGroupBy("district")
    }, [])

    const handleRegionChange = (selectedDistricts: string[]) => {
        setSelectedDistricts(selectedDistricts);
    };

    return (
        <div className="flex flex-col gap-2 px-2">
            <Selectable
                items={formatDistricts}
                onSelectionChange={handleRegionChange}
                selectedItems={selectedDistricts}
            />
            <Button
                text="Next"
                onClick={() => { setViewState("assigning") }}
                className="!w-full"
            />
        </div>
    )
}
export default District