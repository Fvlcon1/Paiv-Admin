
import { FlaggedClaimTable } from "@/app/flagged/utils/types";
import { useEffect, useState } from "react";
import Text from "@styles/components/text";
import { theme } from "@/app/styles/theme";
import { LuLoaderCircle } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFlaggedContext } from "@/app/flagged/context/flagged-context";
import { Admin } from "../../hooks/use-admins";
import { colors } from "./assign-to";
import { MdDelete } from "react-icons/md";
import ClickableTab from "@components/clickable/clickabletab";
import { AnomalousBatch } from "../../utils/transform-anomalous-batches";
import { useAdminsContext } from "../../context/admins-context";
import { useAnomalyContext } from "../../context/anomaly-context";

const AssignedAdmin = ({
    assignedTo,
    index,
    selectedAnomalyIds,
    selectedProviderIds,
    selectedMonths,
    setIsVisible
}: {
    assignedTo: AnomalousBatch["assignedTo"]
    index: number
    selectedAnomalyIds?: string[]
    selectedProviderIds?: string[]
    selectedMonths? : string[]
    setIsVisible: (isVisible: boolean) => void
}) => {
    const {unAssignAdminMutation, unAssignAdminLoading} = useAdminsContext()
    const {refetchAnomalousBatches} = useAnomalyContext()

    const handleDelete = async () => {
        console.log({selectedAnomalyIds : selectedAnomalyIds?.[0]})
        await unAssignAdminMutation({groupBy : "batch", yearMonths : selectedMonths, providers : selectedProviderIds})
        setIsVisible(false)
        refetchAnomalousBatches()
    }

    return (
        assignedTo?.id ? (
            <div
                className="flex justify-between items-center gap-2 px-2 py-0 rounded-lg cursor-pointer duration-500"
            >
                <div className="flex items-center gap-2">
                    <div
                        style={{
                            backgroundColor: colors[index]
                        }}
                        className="w-[27px] h-[27px] rounded-full flex items-center justify-center">
                        <Text
                            size={theme.typography.size.xs}
                            textColor={theme.colors.bg.primary}
                        >
                            {assignedTo?.firstName?.charAt(0).toUpperCase() + assignedTo?.lastName?.charAt(0).toUpperCase()}
                        </Text>
                    </div>
                    <Text
                        ellipsis
                    >
                        {`${assignedTo?.firstName} ${assignedTo?.lastName}`}
                    </Text>
                </div>

                <div className="flex items-center gap-2">
                    {
                        (unAssignAdminLoading) ? (
                            <LuLoaderCircle className="animate-spin" />
                        ) : null
                    }

                    <ClickableTab
                        onClick={() => !unAssignAdminLoading && handleDelete()}
                        className="!rounded-full !p-1"
                    >
                        <MdDelete
                            color={theme.colors.text.danger}
                            size={17}
                        />
                    </ClickableTab>
                </div>
            </div>
        ) : null
    )
}

export default AssignedAdmin
