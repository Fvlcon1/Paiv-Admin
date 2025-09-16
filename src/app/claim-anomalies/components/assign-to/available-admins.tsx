
import { FlaggedClaimTable } from "@/app/flagged/utils/types";
import { useEffect, useState } from "react";
import Text from "@styles/components/text";
import { theme } from "@/app/styles/theme";
import { LuLoaderCircle } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { Admin } from "../../hooks/use-admins";
import { colors } from "./assign-to";
import { useAdminsContext } from "../../context/admins-context";
import { useAnomalyContext } from "../../context/anomaly-context";
import { AnomalousBatch } from "../../utils/transform-anomalous-batches";

const AvailableAdmins = ({
    admins,
    selectedMonths,
    setIsVisible,
    assignedTo
}: {
    admins: Admin[],
    selectedAnomalyIds?: string[],
    selectedProviderIds?: string[],
    selectedMonths?: string[]
    setIsVisible: (isVisible: boolean) => void,
    assignedTo?: AnomalousBatch["assignedTo"]
}) => {
    const [clickedAdminId, setClickedAdminId] = useState("")
    const { refetchAnomalousBatches, setSelectedAnomalyIds } = useAnomalyContext()
    const { assignToAdminMutation, assignToAdminSuccess, assignToAdminLoading, selectedProviders, selectedYearMonths, setSelectedYearMonths } = useAdminsContext()

    const handleAssignToAdmin = async (adminId: string) => {
        setClickedAdminId(adminId)
        await assignToAdminMutation({
            groupBy : "batch", 
            adminId, 
            yearMonths : selectedMonths, 
            providers : selectedProviders
        })
        setIsVisible(false)
        setSelectedAnomalyIds([])
        refetchAnomalousBatches()
    }

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
                        onClick={() => handleAssignToAdmin(item.id)}
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
                            ((assignToAdminLoading) && clickedAdminId === item.id) ? (
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
