import Text from "@styles/components/text"
import { FaFolder, FaSquarePhone } from "react-icons/fa6"
import theme from "@styles/theme"
import PLevelIcon from "../components/p-level-icon"

const statusClassBg = {
    active : "bg-green-600/20",
    expired : "bg-red-600/20",
    pending : "bg-yellow-600/20",
}

const statusTextColor = {
    active : "#059669",
    expired : "#dc2626",
    pending : "#c77d03",
}

import { FaEye, FaUserTie } from "react-icons/fa"
import Button from "@/components/button/button"
import { PiHospitalFill } from "react-icons/pi"
import { useExplorerContext } from "../context/explorer-context"
import { HiMenuAlt3 } from "react-icons/hi"
import ClickableTab from "@components/clickable/clickabletab"
import getDate from "@/utils/getDate"

const useColumns = () => {
    const { setIsFacilityProfileVisible, setExpandedProviderId } = useExplorerContext()

    const handleContactAuthorizedIndividual = (providerId: string) => {
        // TODO: Implement contact authorized individual logic
        console.log('Contact authorized individual for facility:', providerId)
    }

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
        // {
        //     accessorKey : 'providerId',
        //     header : 'Facility ID',
        //     enableSorting : true,
        //     cell : ({getValue} : {getValue : () => string}) => (
        //         <Text ellipsis lineHeight={1}>
        //             {getValue()}
        //         </Text>
        //     )
        // },
        {
            accessorKey : 'district',
            header : 'District',
            enableSorting : true,
            cell : ({getValue} : {getValue : () => string}) => (
                <Text ellipsis lineHeight={1}>
                    {getValue()}
                </Text>
            )
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
            accessorKey : 'lastUpdated',
            header : 'Last Updated',
            enableSorting : true,
            cell : ({getValue} : {getValue : () => string}) => (
                <Text ellipsis lineHeight={1}>
                    {getDate(new Date(getValue())) || 'N/A'}
                </Text>
            )
        },
        {
            accessorKey : 'totalClaims',
            header : 'Total Claims Submitted',
            enableSorting : true,
            cell : ({getValue} : {getValue : () => number}) => (
                <Text ellipsis lineHeight={1}>
                    {getValue() || 0}
                </Text>
            )
        },
        {
            accessorKey : 'totalApprovedAmount',
            header : 'Total Approved Amount',
            enableSorting : true,
            cell : ({getValue} : {getValue : () => number}) => (
                <Text ellipsis lineHeight={1}>
                    GHS {getValue()?.toLocaleString() || '0'}
                </Text>
            )
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row} : {row: any}) => (
                <ClickableTab className="flex gap-2 cursor-pointer">
                    <HiMenuAlt3
                        color={theme.colors.text.tetiary}
                        size={20}
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsFacilityProfileVisible(true)
                            setExpandedProviderId(row.original.providerId)
                        }}
                    />
                </ClickableTab>
            )
        }
    ]
    return {columns}
}
export default useColumns