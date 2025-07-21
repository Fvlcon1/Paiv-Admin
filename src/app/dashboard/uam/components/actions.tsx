'use client'

import { IUserInfo } from "./edit-modal/hooks/useEditUser"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { DropdownItem } from "@/utils/@types"
import { toast } from "react-hot-toast"
import theme from "@styles/theme"
import { FaEdit, FaUserAltSlash } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { Tooltip } from "antd"
import ConfirmationModal from "@components/confirmation-modal/confirmation-modal"
import DeactivateConfirmationModal from "./deactivate-confirmation-modal copy/confirmation-modal"
import EditModal from "./edit-modal/edit-modal"
import DeleteConfirmationModal from "./confirmation-modal/confirmation-modal"
import { FaLinkSlash } from "react-icons/fa6"

const Actions = ({
    user,
    refetchAccounts,
    refetchMetrics
}: {
    user: IUserInfo,
    refetchAccounts: () => void,
    refetchMetrics: () => void
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeactivateVisible, setIsDeactivateVisible] = useState(false);
    const [isRevokeVisible, setIsRevokeVisible] = useState(false);

    const revokePendingInvite = async () => {
        const response = await protectedApi.PUT(`superadmin/invites/${user.invite_id}/revoke`)
        return response
    }

    const { mutateAsync: revokePendingInviteMutation, isPending: isRevokePending } = useMutation({
        mutationFn: revokePendingInvite,
        onSuccess: () => {
            toast.success("Invite revoked successfully")
            refetchAccounts()
            refetchMetrics()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || "Failed to revoke invite")
        }
    })

    const dropdownItems: DropdownItem[] = [
        { key: "1", label: "Deactivate", onClick: () => { } },
        { key: "2", label: "Delete User", onClick: () => { } },
    ]
    return (
        <>
            <DeleteConfirmationModal isVisible={isVisible} close={() => setIsVisible(false)} user={user} />
            <EditModal isVisible={isEditVisible} close={() => setIsEditVisible(false)} user={user} />
            <DeactivateConfirmationModal isVisible={isDeactivateVisible} close={() => setIsDeactivateVisible(false)} user={user} />
            <ConfirmationModal
                isVisible={isRevokeVisible}
                close={() => setIsRevokeVisible(false)}
                description="Are you sure you want to revoke this invite?"
                onConfirm={revokePendingInviteMutation}
                cta="Revoke"
                loading={isRevokePending}
            />

            <div className="flex items-center gap-2">
                <Tooltip
                    title="Edit user"
                >
                    <div
                        className="p-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary"
                        onClick={() => setIsEditVisible(true)}
                    >
                        <FaEdit color={theme.colors.text.tetiary} />
                    </div>
                </Tooltip>

                {
                    user.status !== "pending" ? (
                        <>
                            <Tooltip
                                title="Deactivate user"
                            >
                                <div
                                    className="p-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary"
                                    onClick={() => setIsDeactivateVisible(true)}
                                >
                                    <FaUserAltSlash color={"orange"} />
                                </div>
                            </Tooltip>
                            <Tooltip
                                title="Delete user"
                            >
                                <div
                                    className="p-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary"
                                    onClick={() => setIsVisible(true)}
                                >
                                    <MdDelete
                                        color={"#eb4646"}
                                    />
                                </div>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip
                            title="Revoke invite"
                        >
                            <div
                                className="p-2 rounded-md bg-bg-tetiary hover:bg-bg-quantinary"
                                onClick={() => setIsRevokeVisible(true)}
                            >
                                <FaLinkSlash
                                    color={"purple"}
                                />
                            </div>
                        </Tooltip>
                    )
                }
            </div>
        </>
    )
}

export default Actions