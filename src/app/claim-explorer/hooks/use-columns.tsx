import Text from "@styles/components/text"
import { FaFolder } from "react-icons/fa6"
import theme from "@styles/theme"
import PLevelIcon from "../components/p-level-icon"

const statusClassBg = {
    active : "bg-green-600/20",
    expired : "bg-red-600/20",
    "pending review" : "bg-yellow-600/20",
}

const statusTextColor = {
    active : "#24ad4e",
    expired : "#dc2626",
    "pending review" : "#f59e0b",
}

const useColumns = () => {
    const columns = [
        {
            accessorKey : 'providerName',
            header : 'Provider Name',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex relative">
                            <FaFolder 
                                color={theme.colors.bg.tetiary} 
                                size={35} 
                            />
                            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                                <Text
                                    bold={theme.typography.bold.md}
                                >
                                    {getValue().slice(0, 2).toUpperCase()}
                                </Text>
                            </div>
                        </div>
                        <Text ellipsis lineHeight={1}>
                            {getValue()}
                        </Text>
                    </div>
                )
            }
        },
        {
            accessorKey : 'prescribingLevel',
            header : 'Prescribing Level',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <div className="flex pl-6">
                        <PLevelIcon level={getValue()} />
                    </div>
                )
            }
        },
        {
            accessorKey : 'providerCategory',
            header : 'Provider Category',
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
            accessorKey : 'credentialStatus',
            header : 'Credential Status',
            enableSorting : true,
            cell : ({getValue} : {getValue : any}) => {
                return (
                    <div className={`flex px-2 py-1 rounded-md ${statusClassBg[getValue().toLowerCase() as keyof typeof statusClassBg]}`}>
                        <Text 
                            textColor={statusTextColor[getValue().toLowerCase() as keyof typeof statusTextColor]}
                            ellipsis lineHeight={1}
                        >
                            {getValue()}
                        </Text>
                    </div>
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
        // {
        //     accessorKey : 'district',
        //     header : 'District',
        //     enableSorting : true,
        //     cell : ({getValue} : {getValue : any}) => {
        //         return (
        //             <Text ellipsis lineHeight={1}>
        //                 {getValue()}
        //             </Text>
        //         )
        //     }
        // }
    ]
    return {columns}
}
export default useColumns