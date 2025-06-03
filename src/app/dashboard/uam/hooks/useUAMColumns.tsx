import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaSquareCheck } from "react-icons/fa6"
import { useEffect } from "react"

const useUAMColumns = () => {
    const columns = [
        // {
        //     accessorKey : 'selectable',
        //     header : ()=> (
        //         true
        //         ? <FaSquareCheck 
        //             size={20}
        //             color={theme.colors.main.primary}
        //             className="rounded-[6px] overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary cursor-pointer"
        //             onClick={(e)=>{
        //                 e.stopPropagation()
        //             }} 
        //         />
        //         : <div 
        //             onClick={(e)=>{
        //                 e.stopPropagation()
        //             }} 
        //             className="rounded-[6px] overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary cursor-pointer"
        //         />
        //     ),
        //     cell : ({getValue} : {getValue : any}) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // },
        {
            accessorKey : 'profileImage',
            header : 'Profile Image',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    getValue()
                )
            }
        },
        {
            accessorKey : 'fullname',
            header : 'Fullname',
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
            accessorKey : 'email',
            header : 'Email',
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
            accessorKey : 'role',
            header : 'Role',
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
                    getValue()
                )
            }
        },
        {
            accessorKey : 'lastActive',
            header : 'Last Active',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    getValue()
                )
            }
        },
        {
            accessorKey : 'actions',
            header : 'Actions',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    getValue()
                )
            }
        }
    ]
    return {columns}
}
export default useUAMColumns