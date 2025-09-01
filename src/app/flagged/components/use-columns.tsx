import Text from "@styles/components/text"
import { Progress } from "antd"
import { getRelativeTime } from "@/utils/getDate"
import theme from "@styles/theme"
import { FaMicrochip } from "react-icons/fa6"

const Status = ({status} : {status : string}) => {
    const color = {
        "pending" : "#f59e0b",
        "approved" : theme.colors.text.success,
        "rejected" : theme.colors.text.danger,
        "flagged" : theme.colors.text.danger    
    }

    const bgColor = {
        "pending" : "bg-orange-100",
        "approved" : "bg-green-100",
        "rejected" : "bg-red-100",
        "flagged" : "bg-red-100"    
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

const ReviewedBy = ({reviewedBy} : {reviewedBy : string}) => {
    return (
        reviewedBy === "ai" ? (
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

const useColumns = () => {
    const columns = [
        {
            accessorKey : 'id',
            header : 'Encounter Token',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text bold={theme.typography.bold.md} ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'claimId',
            header : 'Claim ID',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'patientName',
            header : 'Patient Name',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'nhisId',
            header : 'NHIS ID',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'reviewedBy',
            header : 'Reviewed By',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <ReviewedBy reviewedBy={getValue()} />
                )
            }
        },
        {
            accessorKey : 'dateSubmitted',
            header : 'Date Submitted',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getRelativeTime(getValue())}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'lastModified',
            header : 'Last Modified',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getRelativeTime(getValue())}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'totalApprovedCost',
            header : 'Total Approved Cost',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        // {
        //     accessorKey : 'actions',
        //     header : 'Actions',
        //     enableSorting : true,
        //     cell : ({getValue} : {getValue : any}) => {
        //         return (
        //             <BsThreeDots color={theme.colors.text.tetiary} size={20} />
        //         )
        //     }
        // },
    ]
    return {columns}
}
export default useColumns