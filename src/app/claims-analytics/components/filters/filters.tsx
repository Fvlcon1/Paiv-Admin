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
import dayjs from "dayjs"

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


const Filters = () => {
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {
        setSelectedRegions: setSelectedRegionsContext,
        setSelectedDistricts: setSelectedDistrictsContext,
        setSelectedFacilities: setSelectedFacilitiesContext,
        setStartDate,
        setEndDate,
        providers,
        isProvidersPending,
    } = useAnalyticsContext()

    const facilities = useMemo(() => {
        if (!providers) return []
        return providers.map((provider : any) => ({
            label: provider.name,
            value: provider.id,
        }))
    }, [providers])

    const filteredFacilities = useMemo(() => {
        if (!providers) return [];
        
        // Create regex pattern from search query, escaping special characters
        const createSearchPattern = (query: string) => {
            try {
                // Escape special regex characters except * which we'll treat as a wildcard
                const escapedQuery = query
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    .replace(/\*/g, '.*');
                return new RegExp(escapedQuery, 'i'); // 'i' flag for case-insensitive
            } catch (e) {
                // If regex creation fails, return a pattern that won't match anything
                return /$^/;
            }
        };

        const searchPattern = searchQuery ? createSearchPattern(searchQuery) : null;
        
        return providers
            .filter((provider: any) => {
                // Filter by search query using regex
                const searchMatch = !searchPattern || 
                    (provider.providerName && searchPattern.test(provider.providerName)) ||
                    (provider.district && searchPattern.test(provider.district));
                
                // Filter by region if any regions are selected
                const regionMatch = selectedRegions.length === 0 || 
                    selectedRegions.includes(provider.region);
                
                // Filter by district if any districts are selected
                const districtMatch = selectedDistricts.length === 0 || 
                    selectedDistricts.includes(provider.district);
                
                return searchMatch && regionMatch && districtMatch;
            })
            .map((provider: any) => ({
                label: provider.providerName,
                value: provider.id,
                region: provider.region,
                district: provider.district
            }));
    }, [providers, selectedRegions, selectedDistricts, searchQuery])

    const applyFilter = () => {
        setSelectedRegionsContext(selectedRegions)
        setSelectedDistrictsContext(selectedDistricts)
        setSelectedFacilitiesContext(selectedFacilities)
        setStartDate(fromDate)
        setEndDate(toDate)
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
                        picker="month"
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
                        value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : undefined}
                        onChange={(dates) => {
                            if (dates && dates[0] && dates[1]) {
                                const startDate = dates[0].startOf('month');
                                const endDate = dates[1].endOf('month');
                                setFromDate(startDate.format('YYYY-MM-DD'));
                                setToDate(endDate.format('YYYY-MM-DD'));
                            } else {
                                setFromDate('');
                                setToDate('');
                            }
                        }}
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
                            items={filteredFacilities}
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
                        onChange={(e) => {setSearchQuery(e.target.value)}}
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