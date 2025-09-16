import Text from "@styles/components/text"
import { Progress, Checkbox } from "antd"
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import getDate, { getRelativeTime } from "@/utils/getDate"
import { useState, useEffect, useRef } from "react"
import { useClickAway } from "react-use"
import { TiUserAdd } from "react-icons/ti"
import { theme } from "@/app/styles/theme"
import ClickableTab from "@components/clickable/clickabletab"
import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import AssignTo, { colors } from "./assign-to/assign-to"
import { FaMicrochip } from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs"
import { useFlaggedContext } from "../context/flagged-context"

const Status = ({ status }: { status: string }) => {
    const color = {
        "pending": "#f59e0b",
        "approved": theme.colors.text.success,
        "rejected": theme.colors.text.danger,
        "flagged": theme.colors.text.danger
    }

    const bgColor = {
        "pending": "bg-orange-100",
        "approved": "bg-green-100",
        "rejected": "bg-red-100",
        "flagged": "bg-red-100"
    }

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor[status as keyof typeof bgColor]}`}>
            <Text
                textColor={color[status as keyof typeof color]}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
        </div>
    )
}

const ReviewedBy = ({ reviewedBy }: { reviewedBy: string }) => {
    return (
        reviewedBy === "NHIS_EXPERT_SYSTEM" || reviewedBy === "NHIS_Expert_System" ? (
            <div className="flex items-center gap-1 rounded-md px-2 py-1 bg-bg-quantinary/70">
                <FaMicrochip size={15} color={theme.colors.text.secondary} />
                <Text ellipsis lineHeight={1}>
                    AI
                </Text>
            </div>
        ) : (
            <Text ellipsis lineHeight={1}>
                {reviewedBy}
            </Text>
        )
    )
}

const UserChip = ({
    name,
    index
}: {
    name: string,
    index: number
}) => {
    const nameSplit = name.split(" ")
    const firstName = nameSplit[0]
    const lastName = nameSplit[nameSplit.length - 1]
    return (
        <div className="flex items-center gap-2">
            <div
                style={{
                    backgroundColor: colors[index % 8]
                }}
                className="w-[27px] h-[27px] rounded-full flex items-center justify-center">
                <Text
                    size={theme.typography.size.xs}
                    textColor={theme.colors.bg.primary}
                >
                    {firstName?.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase()}
                </Text>
            </div>
        </div>
    )
}

const dropdownOptions: DropdownItem[] = [
    { key: "view", label: "View Details" },
    { key: "assign", label: "Assign to" },
]

interface UseColumnsProps {
    onRowSelectionChange?: (selectedRowKeys: React.Key[]) => void;
    selectedRowKeys?: React.Key[];
}

const useColumns = ({ onRowSelectionChange, selectedRowKeys = [] }: UseColumnsProps = {}) => {
    const [isAssignToVisible, setIsAssignToVisible] = useState(false)
    const [selectedEncounterToken, setSelectedEncounterToken] = useState<string[]>([])
    const { setSelectedEncounterIds, selectedEncounterIds } = useFlaggedContext()
    
    const handleSelect = (row: any, checked: boolean) => {
        if (!onRowSelectionChange) return;
        
        const key = row.original.encounterToken;
        const newSelectedRowKeys = checked 
            ? [...selectedRowKeys, key]
            : selectedRowKeys.filter(k => k !== key);
            
        onRowSelectionChange(newSelectedRowKeys);
        setSelectedEncounterIds(newSelectedRowKeys);
    };
    
    const handleSelectAll = (e: CheckboxChangeEvent, table: any) => {
        if (!onRowSelectionChange) return;
        const rowData = table.getCoreRowModel().rows.map((row: any) => row.original.encounterToken);
        onRowSelectionChange(e.target.checked ? rowData : []);
        setSelectedEncounterIds(e.target.checked ? rowData : []);
    };

    const columns = [
        {
            id: 'select',
            header: ({ table }: { table: any }) => (
                <Checkbox
                    onChange={(e) => handleSelectAll(e, table)}
                    checked={selectedEncounterIds.length > 0 && selectedEncounterIds.length === table.getCoreRowModel().rows.length}
                    indeterminate={selectedEncounterIds.length > 0 && selectedEncounterIds.length < table.getCoreRowModel().rows.length}
                />
            ),
            cell: ({ row }: { row: any }) => (
                <Checkbox
                    checked={selectedEncounterIds.includes(row.original.encounterToken)}
                    onChange={(e) => handleSelect(row, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                />
            ),
            enableSorting: false,
            size: 50,
        },
        // {
        //     accessorKey : 'encounterToken',
        //     header : 'Encounter Token',
        //     enableSorting : true,
        //     cell : ({getValue} : {getValue : any}) => {
        //         return (
        //             <Text bold={theme.typography.bold.md} ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        {
            accessorKey: 'claimId',
            header: 'Claim ID',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1} className="py-2">
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'providerName',
            header: 'Provider Name',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'fullName',
            header: 'Patient Name',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'nhisId',
            header: 'NHIS ID',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'reviewedBy',
            header: 'Reviewed By',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <ReviewedBy reviewedBy={getValue()} />
                )
            }
        },
        {
            accessorKey: 'dateSubmitted',
            header: 'Date Submitted',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue() ? getDate(new Date(getValue())) : "N/A"}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'lastModified',
            header: 'Last Modified',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getDate(new Date(getValue()))}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'totalApprovedCost',
            header: 'Total Approved Cost',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue() || "N/A"}
                    </Text>
                )
            }
        },
        {
            id: 'actions',
            accessorKey: 'encounterToken',
            header: 'Assign To',
            enableSorting: false,
            cell: ({ row, getValue }: { row: any, getValue: any }) => {
                const assignedTo = row.original.assignedTo
                const rowIndex = row.index
                return (
                    <div className="relative">
                        <ClickableTab
                            className="!rounded-full !p-2"
                            onClick={(e) => {
                                e.stopPropagation()
                                const newEncounterToken = getValue()
                                setSelectedEncounterToken([newEncounterToken])
                                setIsAssignToVisible(prev => !prev)
                            }}
                        >
                            {
                                assignedTo.id ? (
                                    <UserChip index={rowIndex} name={`${assignedTo.firstName} ${assignedTo.lastName}`} />
                                ) : (
                                    <TiUserAdd color={theme.colors.text.tetiary} size={20} />
                                )
                            }
                        </ClickableTab>
                        {
                            selectedEncounterToken.includes(getValue()) && isAssignToVisible && (
                                <AssignTo
                                    isVisible={true}
                                    setIsVisible={setIsAssignToVisible}
                                    selectedEncounterToken={selectedEncounterToken}
                                    assignedTo={assignedTo}
                                />
                            )
                        }
                    </div>
                )
            }
        },
    ]
    return { 
        columns,
        selectedRowKeys,
        setSelectedRowKeys: onRowSelectionChange || (() => {}) 
    }
}
export default useColumns