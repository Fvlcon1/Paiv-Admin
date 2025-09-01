import { useState, useEffect } from "react";
import theme from "@styles/theme";
import Input from "@components/input/input";
import { Radio, Checkbox, RadioChangeEvent } from "antd";
import Text from "@styles/components/text";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "@components/button/button";

interface SelectableItem {
    value: string;
    label: string;
}

interface SelectableProps {
    title?: string;
    items: SelectableItem[];
    selectedItems?: string[];
    onSelectionChange?: (selected: string[]) => void;
    showSearch?: boolean;
    showSelectAll?: boolean;
    radioOptions?: Array<{ label: string; value: string }>;
    onRadioChange?: (value: string) => void;
    defaultRadioValue?: string;
    className?: string;
    onSearchTermChange?: (term: string) => void;
    disabled?: boolean;
}

const Selectable = ({
    title = "Select Items",
    items,
    selectedItems: externalSelectedItems,
    onSelectionChange,
    showSearch = true,
    showSelectAll = true,
    radioOptions,
    onRadioChange,
    defaultRadioValue = "All",
    className = "",
    onSearchTermChange,
    disabled = false,
}: SelectableProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [internalSelected, setInternalSelected] = useState<string[]>([]);
    const [radioValue, setRadioValue] = useState(defaultRadioValue);

    // Sync with external selected items if provided
    useEffect(() => {
        if (externalSelectedItems) {
            setInternalSelected(externalSelectedItems);
        }
    }, [externalSelectedItems]);

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemToggle = (value: string, checked: boolean) => {
        let newSelected: string[];
        if (checked) {
            newSelected = [...internalSelected, value];
        } else {
            newSelected = internalSelected.filter((item) => item !== value);
        }

        setInternalSelected(newSelected);
        onSelectionChange?.(newSelected);
    };

    const handleSelectAll = () => {
        const allValues = items.map((item) => item.value);
        const newSelected = internalSelected.length === items.length ? [] : allValues;
        setInternalSelected(newSelected);
        onSelectionChange?.(newSelected);
    };

    const handleRadioChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setRadioValue(value);
        onRadioChange?.(value);
    };

    return (
        <div className={`w-[300px] flex flex-col gap-3 pl-3 pr-1 py-1 ${className}`}>
            <div className="flex flex-col gap-1 pr-2">
                <Text
                    size={theme.typography.size.body2}
                    bold={theme.typography.bold.md}
                    textColor={theme.colors.main.primary}
                    className="!pl-0.5"
                >
                    {title}
                </Text>

                {showSearch && (
                    <Input
                        placeholder={`Search ${title.toLowerCase()}`}
                        value={searchTerm}
                        onChange={(e) => {
                            if (disabled) return;
                            setSearchTerm(e.target.value);
                            onSearchTermChange?.(e.target.value);
                        }}
                        disabled={disabled}
                        PreIcon={<FaMagnifyingGlass size={14} color={disabled ? theme.colors.text.tetiary : theme.colors.text.tetiary} />}
                        className={`!h-[35px] !shadow-xs !px-2 ${disabled ? 'opacity-50' : ''}`}
                    />
                )}
            </div>

            {radioOptions && (
                <Radio.Group
                    value={radioValue}
                    onChange={disabled ? undefined : handleRadioChange}
                    optionType="button"
                    buttonStyle="solid"
                    className={`w-full ${disabled ? 'opacity-50' : ''}`}
                    size="small"
                    disabled={disabled}
                >
                    {radioOptions.map((option) => (
                        <Radio.Button
                            key={option.value}
                            value={option.value}
                            className="flex-1 text-center text-xs"
                        >
                            {option.label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            )}

            <div className={`flex flex-col w-full gap-1 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-main-primary/50 scrollbar-track-bg-secondary hover:scrollbar-thumb-main-primary/70 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${disabled ? 'opacity-50' : ''}`}>
                <style jsx global>{`
                    .scrollbar-thin::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }
                    .scrollbar-thin::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: 3px;
                        margin: 4px 0;
                    }
                    .scrollbar-thin::-webkit-scrollbar-thumb {
                        background-color: ${theme.colors.main.primary}80;
                        border-radius: 3px;
                        transition: background-color 0.2s ease;
                    }
                    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                        background-color: ${theme.colors.main.primary};
                    }
                    .scrollbar-thin {
                        scrollbar-width: thin;
                        scrollbar-color: ${theme.colors.main.primary}80 transparent;
                    }
                `}</style>
                {filteredItems.map((item) => (
                    <div
                        key={item.value}
                        className={`flex w-full items-center rounded-md px-3 py-2 transition-colors ${
                            disabled 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'cursor-pointer hover:bg-bg-secondary'
                        } ${
                            internalSelected.includes(item.value)
                                ? "bg-main-primary/10 border border-main-primary/30"
                                : "border border-border-primary"
                        }`}
                        onClick={(e) => {
                            if (disabled) return;
                            e.preventDefault();
                            e.stopPropagation();
                            handleItemToggle(item.value, !internalSelected.includes(item.value));
                        }}
                    >
                        <Checkbox
                            checked={internalSelected.includes(item.value)}
                            onChange={(e) => {
                                if (disabled) return;
                                e.stopPropagation();
                                handleItemToggle(item.value, e.target.checked);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            disabled={disabled}
                            className={`w-full pointer-events-none ${disabled ? 'opacity-50' : ''}`}
                        >
                            <Text
                                textColor={
                                    internalSelected.includes(item.value)
                                        ? theme.colors.main.primary
                                        : theme.colors.text.secondary
                                }
                                bold={
                                    internalSelected.includes(item.value)
                                        ? theme.typography.bold.md
                                        : theme.typography.bold.sm2
                                }
                                className="select-none"
                            >
                                {item.label}
                            </Text>
                        </Checkbox>
                    </div>
                ))}
            </div>

            {showSelectAll && items.length > 0 && (
                <div className="flex justify-between items-center mt- pr-2">
                    <Button
                        text={
                            internalSelected.length === items.length ? "Deselect All" : "Select All"
                        }
                        onClick={disabled ? undefined : handleSelectAll}
                        className={`!h-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={disabled}
                    />
                    <Text textColor={theme.colors.text.secondary}>
                        {internalSelected.length} of {items.length} selected
                    </Text>
                </div>
            )}
        </div>
    );
};

export default Selectable;