import Input from "@components/input/input"
import theme from "@styles/theme"
import { IoSearch } from "react-icons/io5"
import Text from "@styles/components/text"
import { hexOpacity } from "@/utils/hexOpacity"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import useAdmins, { Admin } from "@/app/claim-anomalies/hooks/use-admins"
import NoData from "@components/NoData/noData"
import AvailableAdmins from "./available-admins"
import AssignedAdmin from "./assigned-admin"
import Divider from "@components/divider/divider"
import { useAdminsContext } from "../../context/admins-context"
import { FlaggedClaimTable } from '../../../flagged/utils/types';
import { AnomalousBatch } from "../../utils/transform-anomalous-batches"


export const colors = [
    "#7e67ee",
    "#1b9ba4",
    "#ffc478",
    "#ff936b",
    "#9b59b6",
    "#3498db",
    "#2ecc71",
    "#e74c3c"
]

const Tag = ({ title }: { title: string }) => {
    return (
        <div className="w-full gap-2 flex items-center px-1">
            <div className="flex px-2 py-0.5 rounded-md">
                <Text
                    textColor={theme.colors.text.secondary + hexOpacity(60)}
                // size={theme.typography.size.xs}
                >
                    {title}
                </Text>
            </div>
            {/* <Divider /> */}
        </div>
    )
}

const AssignTo = ({
    isVisible,
    setIsVisible,
    selectedAnomalyIds,
    selectedProviderIds,
    selectedMonths,
    className,
    assignedTo
}: {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
    selectedAnomalyIds?: string[]
    selectedProviderIds?: string[]
    selectedMonths? : string[]
    className?: string
    assignedTo?: AnomalousBatch["assignedTo"]
}) => {
    const assignToRef = useRef<HTMLDivElement>(null);
    const { admins, setSearchQuery, searchQuery, selectedAdmins, setSelectedAdmins, selectedRegions, setSelectedRegions, selectedDistricts, setSelectedDistricts, selectedProviders, setSelectedProviders, assignToAdminMutation, assignToAdminLoading, assignToAdminError, assignToAdminSuccess, unAssignAdminMutation, unAssignAdminLoading, unAssignAdminError, unAssignAdminSuccess } = useAdminsContext()

    useClickAway(assignToRef, () => {
        setIsVisible(false);
    })

    return (
        <AnimatePresence>
            {
                isVisible ? (
                    <div
                        ref={assignToRef}
                        className={`w-[250px] flex flex-col border border-border-primary bg-bg-primary shadow-2xl rounded-lg absolute right-0 ${className}`}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        style={{
                            zIndex: 100
                        }}
                    >
                        <div className="border-b border-solid border-border-primary">
                            <Input
                                placeholder="Search for admin"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value) }}
                                className="!border-none !px-2"
                                PreIcon={<IoSearch size={15} color={theme.colors.text.tetiary} />}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-0">

                                {
                                    assignedTo?.id && (
                                        <div className="flex flex-col px-1 py-2">
                                            <AssignedAdmin
                                                assignedTo={assignedTo}
                                                index={0}
                                                selectedAnomalyIds={selectedAnomalyIds}
                                                selectedProviderIds={selectedProviderIds}
                                                selectedMonths={selectedMonths}
                                                setIsVisible={setIsVisible}
                                            />
                                        </div>
                                    )
                                }

                                <Divider />

                                <div className="flex flex-col gap-0 py-2">
                                    <Tag title="Select Admin" />
                                    <div className="flex flex-col px-1">
                                        {
                                            admins?.length > 0 ? (
                                                <AvailableAdmins
                                                    admins={admins}
                                                    selectedAnomalyIds={selectedAnomalyIds}
                                                    selectedProviderIds={selectedProviderIds}
                                                    selectedMonths={selectedMonths}
                                                    setIsVisible={setIsVisible}
                                                    assignedTo={assignedTo}
                                                />
                                            ) : (
                                                <NoData />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>
            }
        </AnimatePresence>
    )
}
export default AssignTo