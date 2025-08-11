import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Progress } from "antd"
import { BsThreeDots } from "react-icons/bs"

const ProgressCircle = ({percent} : {percent : number}) => {
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
            accessorKey : 'dateSubmitted',
            header : 'Date Submitted',
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
            accessorKey : 'dateProcessed',
            header : 'Date Processed',
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
            accessorKey : 'status',
            header : 'Status',
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