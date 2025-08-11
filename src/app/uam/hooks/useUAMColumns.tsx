import Text from "@styles/components/text"

const useUAMColumns = () => {
    const columns = [
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