import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Progress, Tooltip } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { FaFolder } from "react-icons/fa"
import { PiWarningFill } from "react-icons/pi"
import { ProgressProps } from "antd"
import { snakeToText } from "@/lib/utils"

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
        "completed": theme.colors.text.success,
        "under review": theme.colors.text.danger
    }
    const bgColor = {
        "not submitted": "bg-bg-tetiary",
        "submitted": "bg-bg-tetiary",
        "processing": "bg-orange-100",
        "completed": "bg-green-100",
        "under review": "bg-red-100"
    }
    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor[status as keyof typeof bgColor]}`}>
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
            accessorKey: 'status',
            header: 'Processing Status',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Status status={getValue() ? snakeToText(getValue().toLowerCase()) : "not submitted"} />
                )
            }
        },
        {
            accessorKey: 'batchProgress',
            header: 'Batch Progress',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <ProgressCircle percent={getValue()} />
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
            accessorKey: 'processedClaims',
            header: 'Processed Claims',
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
            accessorKey: 'flaggedClaims',
            header: 'Flagged Claims',
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
            accessorKey: 'rejectedClaims',
            header: 'Rejected Claims',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        // {
        //     accessorKey: 'expectedPayout',
        //     header: 'Expected Payout',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        // {
        //     accessorKey: 'actions',
        //     header: 'Actions',
        //     enableSorting: true,
        //     cell: ({ getValue }: { getValue: any }) => {
        //         return (
        //             <BsThreeDots color={theme.colors.text.tetiary} size={20} />
        //         )
        //     }
        // },
    ]
    return { columns }
}
export default useColumns