
import { FlaggedClaimTable } from "../../utils/types";
import { useEffect, useState } from "react";
import Text from "@styles/components/text";
import { theme } from "@/app/styles/theme";
import { LuLoaderCircle } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFlaggedContext } from "../../context/flagged-context";
import { Admin } from "../../hooks/use-admins";
import { colors } from "./assign-to";
import { FaCircleCheck } from "react-icons/fa6";
import { useAdminsContext } from "../../context/admins-context";

const AvailableAdmins = ({
    admins,
    selectedEncounterToken,
    setIsVisible,
    assignedTo
}: {
    admins: Admin[],
    selectedEncounterToken: string[],
    setIsVisible: (isVisible: boolean) => void,
    assignedTo: FlaggedClaimTable["assignedTo"]
}) => {
    const [clickedAdminId, setClickedAdminId] = useState("")
    const { setSelectedEncounterIds } = useFlaggedContext()
    const {assignToAdminMutation, reAssignAdminLoading, reAssignAdminMutation, assignToAdminSuccess, assignToAdminLoading} = useAdminsContext()

    const handleAssignToAdmin = async (adminId: string, encounterIds: string[]) => {
        setClickedAdminId(adminId)
        if(assignedTo?.id){
            await reAssignAdminMutation({ encounterId: encounterIds[0], adminId })
        } else {
            await assignToAdminMutation({ encounterIds, adminId })
        }
        setIsVisible(false)
        setSelectedEncounterIds([])
    }

    useEffect(() => {
        if (assignToAdminSuccess) {
            setIsVisible(false)
        }
    }, [assignToAdminSuccess])

    return (
        admins.map((item: Admin, index: number) => {
            const nameSplit = item.name?.split(" ")
            const firstName = nameSplit?.[0]
            const lastName = nameSplit?.[nameSplit?.length - 1]

            return (
                (index < 6 && item.name) && (
                    <div
                        className="flex justify-between items-center gap-2 hover:bg-bg-secondary px-2 py-1 rounded-lg cursor-pointer duration-500"
                        key={index}
                        onClick={() => handleAssignToAdmin(item.id, selectedEncounterToken)}
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
                                    {firstName?.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase()}
                                </Text>
                            </div>
                            <Text
                                ellipsis
                            >
                                {item.name}
                            </Text>
                        </div>

                        {
                            ((assignToAdminLoading || reAssignAdminLoading) && clickedAdminId === item.id) ? (
                                <LuLoaderCircle className="animate-spin" />
                            ) : item.lastActive === "just now" && (
                                <GoDotFill
                                    color="green"
                                />
                            )
                        }
                    </div>
                )
            )
        })
    )
}

export default AvailableAdmins
