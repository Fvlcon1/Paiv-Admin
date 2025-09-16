import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Menu, Button } from "antd"
import { BsThreeDotsVertical } from "react-icons/bs"
import { getRelativeTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import { TiUserAdd } from "react-icons/ti"
import AssignTo, { colors } from "./assign-to/assign-to"
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import Dropdown from "@components/dropdown/dropdown"
import { Checkbox } from "antd"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAnomalyContext } from "../context/anomaly-context"
import { useAdminsContext } from "../context/admins-context"

const RiskBadge = ({ level, score = 0 }: { level: 'High' | 'Medium' | 'Low', score?: number }) => {
    // Define color codes based on risk level and score
    const getColorCode = (level: string, score: number) => {
        switch (level) {
            case 'High':
                return {
                    bg: 'bg-red-50',
                    text: '!text-red-700',
                    dot: 'bg-red-600',
                    border: 'border-red-100',
                    scoreColor: score > 90 ? 'text-red-800 font-medium' : 'text-red-700'
                };
            case 'Medium':
                return {
                    bg: 'bg-yellow-50',
                    text: '!text-yellow-700',
                    dot: 'bg-yellow-500',
                    border: 'border-yellow-100',
                    scoreColor: 'text-yellow-700'
                };
            case 'Low':
            default:
                return {
                    bg: 'bg-green-50',
                    text: '!text-green-700',
                    dot: 'bg-green-500',
                    border: 'border-green-100',
                    scoreColor: 'text-green-700'
                };
        }
    };

    const { bg, text, dot, border, scoreColor } = getColorCode(level, score);

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${border} ${bg}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${dot}`}></div>
            <div className="flex items-center gap-1.5">
                <Text className={`text-sm font-medium ${text}`} ellipsis>
                    {level}
                </Text>
                {/* <Text className={`text-xs ${scoreColor}`}>({score})</Text> */}
            </div>
        </div>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
        'Open': {
            bg: 'bg-blue-100',
            text: '!text-blue-600'
        },
        'Under Investigation': {
            bg: 'bg-purple-100',
            text: '!text-purple-600'
        },
        'Confirmed Anomaly': {
            bg: 'bg-red-100',
            text: '!text-red-600'
        },
        'Dismissed': {
            bg: 'bg-gray-100',
            text: '!text-gray-600'
        }
    }[status] || { bg: 'bg-gray-100', text: '!text-gray-600' }

    return (
        <div className={`px-3 py-1 rounded-full flex ${statusConfig.bg} ${statusConfig.text}`}>
            <Text className={statusConfig.text} ellipsis>
                {status}
            </Text>
        </div>
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

interface UseColumnsProps {
    onRowSelectionChange?: (selectedRowKeys: string[]) => void;
    selectedRowKeys?: string[];
}

const useColumns = ({ onRowSelectionChange, selectedRowKeys = [] }: UseColumnsProps = {}) => {
    const [selectedBatchId, setSelectedBatchId] = useState("")
    const [isAssignToVisible, setIsAssignToVisible] = useState(false)
    const { selectedAnomalyIds, setSelectedAnomalyIds, } = useAnomalyContext()
    const {selectedProviders, setSelectedProviders, selectedYearMonths, setSelectedYearMonths} = useAdminsContext()

    const handleSelect = (row: any, checked: boolean) => {
        if (!onRowSelectionChange) return;

        const key = row.original.batchId;
        const providerId = row.original.providerId;
        const dateSubmited = row.original.dateSubmitted;

        const newSelectedYearMonths = checked
            ? [...selectedYearMonths, dateSubmited]
            : selectedYearMonths.filter(k => k !== dateSubmited);
        const newSelectedProviders = checked
            ? [...selectedProviders, providerId]
            : selectedProviders.filter(k => k !== providerId);
        const newSelectedRowKeys = checked
            ? [...selectedRowKeys, key]
            : selectedRowKeys.filter(k => k !== key);

        onRowSelectionChange(newSelectedRowKeys);
        setSelectedAnomalyIds(newSelectedRowKeys);
        setSelectedProviders(newSelectedProviders);
        setSelectedYearMonths(newSelectedYearMonths);
    };

    const handleSelectAll = (e: CheckboxChangeEvent, table: any) => {
        if (!onRowSelectionChange) return;

        const rowData = table.getCoreRowModel().rows.map((row: any) => row.original.batchId);
        const providerData = table.getCoreRowModel().rows.map((row: any) => row.original.providerId);
        const yearMonthData = table.getCoreRowModel().rows.map((row: any) => row.original.dateSubmitted);
        onRowSelectionChange(e.target.checked ? rowData : []);
        setSelectedAnomalyIds(e.target.checked ? rowData : []);
        setSelectedProviders(e.target.checked ? providerData : []);
        setSelectedYearMonths(e.target.checked ? yearMonthData : []);
    };

    const handleMenuClick = (e: any, record: any) => {
        // Handle action based on e.key
        console.log('Action:', e.key, 'on record:', record.id)
    }

    const actionOption: DropdownItem[] = [
        { key: "view", label: "View Details" },
        { key: "escalate", label: "Escalate" },
        { key: "confirm", label: "Confirm" },
        { key: "dismiss", label: "Dismiss" },
    ]

    const columns = [
        // Selection column
        {
            id: 'selection',
            header: ({ table }: { table: any }) => (
                <Checkbox
                    onChange={(e) => handleSelectAll(e, table)}
                    checked={selectedAnomalyIds?.length > 0 && selectedAnomalyIds.length === table.getCoreRowModel().rows?.length}
                    indeterminate={selectedAnomalyIds?.length > 0 && selectedAnomalyIds.length < table.getCoreRowModel().rows?.length}
                />
            ),
            cell: ({ row }: { row: any }) => (
                <Checkbox
                    checked={selectedAnomalyIds.includes(row.original.batchId)}
                    onChange={(e) => handleSelect(row, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                />
            ),
            size: 50,
        },
        {
            accessorKey: 'batchId',
            header: 'Batch ID',
            enableSorting: true,
            cell: ({ getValue }: { getValue: () => string }) => (
                <Text bold={theme.typography.bold.md} ellipsis>
                    {getValue()}
                </Text>
            )
        },
        {
            accessorKey: 'providerName',
            header: 'Provider Name',
            enableSorting: true,
            cell: ({ getValue }: { getValue: () => string }) => (
                <Text ellipsis>
                    {getValue()}
                </Text>
            )
        },
        // {
        //     accessorKey: 'claimPeriod',
        //     header: 'Claim Period',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: () => string }) => (
        //         <Text ellipsis>
        //             {getValue()}
        //         </Text>
        //     )
        // },
        {
            accessorKey: 'riskScoreLevel',
            header: 'Anomaly Risk Score',
            enableSorting: true,
            cell: ({ getValue }: { getValue: () => 'High' | 'Medium' | 'Low' }) => (
                <RiskBadge level={getValue()} />
            )
        },
        {
            accessorKey: 'dateDetected',
            header: 'Date Detected',
            enableSorting: true,
            cell: ({ getValue }: { getValue: () => string }) => {
                const date = new Date(getValue())
                return (
                    <Text ellipsis>
                        {isNaN(date.getTime()) ? 'N/A' : getRelativeTime(date)}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'reviewStatus',
            header: 'Anomaly Status',
            enableSorting: true,
            cell: ({ getValue }: { getValue: () => string }) => (
                <StatusBadge status={getValue()} />
            )
        },
        {
            accessorKey: 'totalClaims',
            header: 'Total Claims',
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
            accessorKey: 'totalApprovedCost',
            header: 'Total Approved Cost',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1} bold={theme.typography.bold.md}>
                        {`GHS ${getValue()?.toLocaleString() || "0"}`}
                    </Text>
                )
            }
        },
        // {
        //     accessorKey: 'reason',
        //     header: 'Reason',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        {
            id: 'assignTo',
            accessorKey: 'batchId',
            header: 'Assign To',
            enableSorting: false,
            cell: ({ row, getValue }: { row: any, getValue: any }) => {
                const assignedTo = row.original.assignedTo
                const rowIndex = row.index
                return (
                    <div className="relative">
                        <ClickableTab
                            onClick={(e) => {
                                e.stopPropagation()
                                const newBatchId = getValue()
                                setSelectedBatchId(newBatchId)
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
                            getValue() === selectedBatchId && isAssignToVisible && (
                                <AssignTo
                                    isVisible={true}
                                    setIsVisible={setIsAssignToVisible}
                                    assignedTo={assignedTo}
                                    selectedAnomalyIds={[selectedBatchId]}
                                    selectedProviderIds={[row.original.providerId]}
                                    selectedMonths={[row.original.dateSubmitted?.split('T')[0].substring(0, 7)]}
                                />
                            )
                        }
                    </div>
                )
            }
        },
        {
            id: 'actions',
            header: 'Actions',
            enableSorting: false,
            cell: ({ row }: { row: any }) => (
                <Dropdown
                    menuItems={actionOption}
                    onClick={(e) => handleMenuClick(e, row.original)}
                >
                    <Button type="text" icon={<BsThreeDotsVertical />} />
                </Dropdown>
            )
        }
    ]

    return {
        columns,
    }
}
export default useColumns