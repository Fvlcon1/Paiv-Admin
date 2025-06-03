import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaSquareCheck } from "react-icons/fa6"
import { useEffect } from "react"

const useClaimsTable = ({
    isAllClaimsSelected,
    handleSelectAllClaims,
    handleUnselectAllClaims
}: {
    isAllClaimsSelected : boolean,
    handleSelectAllClaims : () => void,
    handleUnselectAllClaims : () => void
}) => {
    const columns = [
        {
            accessorKey : 'selectable',
            header : ()=> (
                isAllClaimsSelected
                ? <FaSquareCheck 
                    size={20}
                    color={theme.colors.main.primary}
                    className="rounded-[6px] overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary cursor-pointer"
                    onClick={(e)=>{
                        e.stopPropagation()
                        handleUnselectAllClaims()
                    }} 
                />
                : <div 
                    onClick={(e)=>{
                        e.stopPropagation()
                        handleSelectAllClaims()
                    }} 
                    className="rounded-[6px] overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary cursor-pointer"
                />
            ),
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <Text ellipsis lineHeight={1}>
                        {getValue()}
                    </Text>
                )
            }
        },
        {
            accessorKey : 'hospitalName',
            header : 'Hospital Name',
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
            accessorKey : 'claimSubmissionDate',
            header : 'Claim Submission Date',
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
            accessorKey : 'claimProcessingDate',
            header : 'Claim Processing Date',
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
            accessorKey : 'expectedPayout',
            header : 'Expected Payout',
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
            accessorKey : 'actualPayout',
            header : 'Actual Payout',
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
        }
    ]
    return {columns}
}
export default useClaimsTable