import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Progress, Tooltip } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { FaFolder } from "react-icons/fa"
import { PiWarningFill } from "react-icons/pi"
import { ProgressProps } from "antd"
import getDate, { getRelativeTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import { HiMenuAlt3 } from "react-icons/hi"
import { useExplorerContext } from "../../context/explorer-context"

const ProgressCircle = ({ percent }: { percent: number }) => {
    const strokeColor: ProgressProps['strokeColor'] = {
        // '0%': '#f09e60',
        '100%': '#55c416',
    };

    return (
        <Progress
            percent={percent}
            strokeColor={strokeColor}
        />
    )
}

const Status = ({ status }: { status: string }) => {
    const color = {
        "not submitted": theme.colors.text.tetiary,
        "submitted": theme.colors.text.secondary,
        "processing": "#f59e0b",
        "processed": "#389e0d",
        "under review": theme.colors.text.danger
    }
    const bgColor = {
        "not submitted": "bg-bg-tetiary",
        "submitted": "bg-bg-tetiary",
        "processing": "bg-orange-100",
        "processed": "bg-[#389e0d]/10",
        "under review": "bg-red-100"
    }
    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${bgColor[status as keyof typeof bgColor]}`}>
            <Text
                textColor={color[status as keyof typeof color]}
                ellipsis
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
        </div>
    )
}

const useColumns = () => {
    const { setIsBatchDetailsVisible, setSelectedBatch } = useExplorerContext()
    const columns = [
        {
            accessorKey: 'batchId',
            header: 'Batch ID',
            enableSorting: true,
            cell: ({ getValue, row }: { getValue: any, row: any }) => {
                const anomaly = row.original.anomaly
                return (
                    <div className="flex items-center gap-4">
                        <Text bold={theme.typography.bold.md} ellipsis lineHeight={1}>
                            {getValue()}
                        </Text>
                        {anomaly > 0 && (
                            <Tooltip
                                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            >
                                <PiWarningFill color={theme.colors.text.danger} />
                            </Tooltip>
                        )}
                    </div>
                )
            }
        },
        {
            accessorKey: 'status',
            header: 'Processing Status',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Status status={getValue() ? getValue() : "not submitted"} />
                )
            }
        },
        {
            accessorKey: 'claimPeriod',
            header: 'Claim Period',
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
            accessorKey: 'dateSubmitted',
            header: 'Date Submitted',
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
            accessorKey: 'lastUpdated',
            header: 'Last Updated',
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
            accessorKey: 'totalApprovalCost',
            header: 'Total Approval Cost',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {`GHS ${getValue()?.toLocaleString() || '0'}`}
                    </Text>
                )
            }
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: true,
            cell: ({ row, getValue }: { row: any, getValue: any }) => {
                return (
                    <ClickableTab className="flex gap-2 cursor-pointer">
                        <HiMenuAlt3
                            color={theme.colors.text.tetiary}
                            size={20}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsBatchDetailsVisible(true)
                                setSelectedBatch(row.original)
                            }}
                        />
                    </ClickableTab>
                )
            }
        },
    ]
    return { columns }
}
export default useColumns