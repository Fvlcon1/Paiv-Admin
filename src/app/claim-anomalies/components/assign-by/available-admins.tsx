
import { useEffect, useState } from "react";
import Text from "@styles/components/text";
import { theme } from "@/app/styles/theme";
import { GoDotFill } from "react-icons/go";
import { Admin, GroupBy } from "../../hooks/use-admins";
import { colors } from "../assign-to/assign-to";
import { FaCheckCircle } from "react-icons/fa";
import Button from "@components/button/button";
import { useAdminsContext } from "../../context/admins-context";

const AvailableAdmins = ({
    admins,
    selectedAdmin,
    setSelectedAdmin,
}: {
    admins: Admin[],
    selectedAdmin: Admin | null,
    setSelectedAdmin: (admin: Admin | null) => void,
}) => {
    const {assignToAdminMutation} = useAdminsContext()

    const handleAssignToAdmin = async (admin: Admin) => {
        setSelectedAdmin(admin)
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
                        onClick={() => handleAssignToAdmin(item)}
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

                        <div className="flex items-center gap-2">
                            {
                                item.lastActive === "just now" && (
                                    <GoDotFill
                                        color="green"
                                        className="animate-pulse"
                                    />
                                )
                            }
                            {
                                selectedAdmin?.id === item.id && (
                                    <FaCheckCircle color={theme.colors.main.primary} size={16} />
                                )
                            }
                        </div>
                    </div>
                )
            )
        })
    )
}

export default AvailableAdmins
