import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Progress, Tooltip } from "antd"
import { BsThreeDots } from "react-icons/bs"
import { PiWarningFill } from "react-icons/pi"

const ProgressCircle = ({ percent }: { percent: number }) => {
    return (
        <Progress
            //   type="circle"
            percent={percent}
            steps={8}
            trailColor={theme.colors.bg.tetiary}
            strokeColor={"#24ad4e"}
            strokeWidth={10}
            size={15}
        />
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
            accessorKey: 'expectedPayout',
            header: 'Expected Payout',
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
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: true,
            cell: ({ getValue }: { getValue: any }) => {
                return (
                    <BsThreeDots color={theme.colors.text.tetiary} size={20} />
                )
            }
        },
    ]
    return { columns }
}
export default useColumns