import Input from "@components/input/input"
import theme from "@styles/theme"
import { FaChevronDown, FaGlobe, FaMagnifyingGlass } from "react-icons/fa6"
import { BiSolidLandmark } from "react-icons/bi"
import { PiHospitalFill } from "react-icons/pi"
import Dropdown from "@components/dropdown/dropdown"
import Button from "@components/button/button"
import Text from "@styles/components/text"
import { Radio, CheckboxOptionType, Checkbox, DatePicker } from "antd"
import { useState, useMemo } from "react";
import { regions as allRegions } from "@/utils/regions";
import Selectable from "../selectable/selectable"
import { useAnalyticsContext } from "../../context/context"
import OutlineButton from "@components/button/outlineButton"

const { RangePicker } = DatePicker

const options = [
    { label: "All", value: "All" },
    { label: "Selected", value: "Selected" },
    { label: "Unselected", value: "Unselected" },
];

// Format regions for the selectable component
const formatRegions = allRegions.map(region => ({
    label: region.label,
    value: region.label,
    districts: region.districts || []
}));

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
    value: district.code,
    regionCode: district.regionCode
}));

// Get all facilities (this is a placeholder - replace with actual facilities data)
const facilities = [
    { label: "Facility 1", value: "Facility 1" },
    { label: "Facility 2", value: "Facility 2" },
    { label: "Facility 3", value: "Facility 3" },
];


const Filters = () => {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const {
        setSelectedRegions: setSelectedRegionsContext,
        setSelectedDistricts: setSelectedDistrictsContext,
        setSelectedFacilities: setSelectedFacilitiesContext
    } = useAnalyticsContext()

    const applyFilter = () => {
        setSelectedRegionsContext(selectedRegions)
        setSelectedDistrictsContext(selectedDistricts)
        setSelectedFacilitiesContext(selectedFacilities)
    }

    const clearFilters = () => {
        setSelectedRegions([])
        setSelectedDistricts([])
        setSelectedFacilities([])
    }

    const handleRegionChange = (selected: string[]) => {
        setSelectedRegions(selected);
        // When regions change, filter districts to only show those from selected regions
        if (selected.length > 0) {
            const filteredDistricts = allDistricts
                .filter(d => selected.includes(d.regionCode))
                .map(d => d.code);
            setSelectedDistricts(prev =>
                prev.filter(d => filteredDistricts.includes(d))
            );
        }
    };

    const handleDistrictChange = (selected: string[]) => {
        setSelectedDistricts(selected);
    };

    const handleFacilityChange = (selected: string[]) => {
        setSelectedFacilities(selected);
    };

    // Filter districts based on selected regions
    const filteredDistricts = useMemo(() => {
        if (selectedRegions.length === 0) return [];
        
        // Get all districts from selected regions
        const districtsFromRegions = allRegions
            .filter(region => selectedRegions.includes(region.label))
            .flatMap(region => 
                (region.districts || []).map(district => ({
                    label: district.label,
                    value: district.code,
                    regionCode: region.code
                }))
            );
            
        return districtsFromRegions;
    }, [selectedRegions]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <div className="shadow-xs rounded-lg">
                    <RangePicker
                        style={{
                            height: "35px",
                            borderRadius: "8px",
                            fontFamily: "montserrat",
                            width: "150px",
                            fontSize: "12px",
                            color: theme.colors.text.primary,
                            fontWeight: theme.typography.bold.sm2,
                            borderColor: theme.colors.border.secondary,
                        }}
                    // value={fromDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                    // onChange={(dates) => {
                    //     if (dates) {
                    //         setFromDate(dates[0].toISOString().split('T')[0]);
                    //         setToDate(dates[1].toISOString().split('T')[0]);
                    //     } else {
                    //         resetDate();
                    //     }
                    // }}
                    />
                </div>

                <Dropdown
                    component={
                        <Selectable
                            items={formatRegions}
                            onSelectionChange={handleRegionChange}
                            selectedItems={selectedRegions}
                        />
                    }
                    className="!w-fit !rounded-2xl !max-h-fit"
                    position="bottom-left"
                >
                    <Input
                        value={selectedRegions.length > 0
                            ? `${selectedRegions.length} regions selected`
                            : ''}
                        onChange={() => { }}
                        placeholder="Select Region"
                        className="!w-[150px] !px-2 !h-[35px] !shadow-xs"
                        PostIcon={
                            <FaChevronDown size={12} color={theme.colors.text.tetiary} />
                        }
                        PreIcon={
                            <FaGlobe size={15} color={theme.colors.text.primary} />
                        }
                    />
                </Dropdown>

                <Dropdown
                    component={
                        <Selectable
                            items={filteredDistricts}
                            onSelectionChange={handleDistrictChange}
                            selectedItems={selectedDistricts}
                            disabled={selectedRegions.length === 0}
                        />
                    }
                    className="!w-fit !rounded-2xl !max-h-fit"
                    position="bottom-left"
                >
                    <Input
                        value={selectedDistricts.length > 0
                            ? `${selectedDistricts.length} districts selected`
                            : ''}
                        onChange={() => { }}
                        placeholder={selectedRegions.length === 0 ? "Select region first" : "Select District"}
                        disabled={selectedRegions.length === 0}
                        className="!w-[150px] !px-2 !h-[35px] !shadow-xs"
                        PostIcon={
                            <FaChevronDown size={12} color={theme.colors.text.tetiary} />
                        }
                        PreIcon={
                            <BiSolidLandmark size={15} color={theme.colors.text.primary} />
                        }
                    />
                </Dropdown>

                <Dropdown
                    component={
                        <Selectable
                            items={facilities}
                            onSelectionChange={handleFacilityChange}
                            selectedItems={selectedFacilities}
                        />
                    }
                    className="!w-fit !rounded-2xl !max-h-fit"
                    position="bottom-left"
                >
                    <Input
                        value={selectedFacilities.length > 0
                            ? `${selectedFacilities.length} facilities selected`
                            : ''}
                        onChange={() => { }}
                        placeholder="Select Facility"
                        className="!w-[150px] !px-2 !h-[35px] !shadow-xs"
                        PostIcon={
                            <FaChevronDown size={12} color={theme.colors.text.tetiary} />
                        }
                        PreIcon={
                            <PiHospitalFill size={15} color={theme.colors.text.primary} />
                        }
                    />
                </Dropdown>
            </div>

            <div className="flex items-center gap-2">
                <OutlineButton
                    text="Clear Filter"
                    onClick={clearFilters}
                />
                <Button
                    text="Apply Filter"
                    onClick={applyFilter}
                />
            </div>
        </div>
    );
};

export default Filters