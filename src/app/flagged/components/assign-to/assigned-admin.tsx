
import { FlaggedClaimTable } from "../../utils/types";
import { useEffect, useState } from "react";
import Text from "@styles/components/text";
import { theme } from "@/app/styles/theme";
import { LuLoaderCircle } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFlaggedContext } from "../../context/flagged-context";
import { Admin } from "../../hooks/use-admins";
import { colors } from "./assign-to";
import { MdDelete } from "react-icons/md";
import ClickableTab from "@components/clickable/clickabletab";

const AssignedAdmin = ({
    assignedTo,
    index,
    selectedEncounterToken,
    unassignAdminMutation,
    unassignAdminLoading,
    unassignAdminError,
    unassignAdminSuccess
}: {
    assignedTo: FlaggedClaimTable["assignedTo"]
    index: number
    selectedEncounterToken: string[]
    unassignAdminMutation?: any
    unassignAdminLoading?: any
    unassignAdminError?: any
    unassignAdminSuccess?: any
}) => {
    const { setSelectedEncounterIds } = useFlaggedContext()

    const handleDelete = () => {
        console.log({selectedEncounterToken : selectedEncounterToken[0]})
        unassignAdminMutation(selectedEncounterToken[0])
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
                        (unassignAdminLoading) ? (
                            <LuLoaderCircle className="animate-spin" />
                        ) : assignedTo.lastActive === "just now" && (
                            <GoDotFill
                                color="green"
                            />
                        )
                    }

                    <ClickableTab
                        onClick={() => !unassignAdminLoading && handleDelete()}
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
