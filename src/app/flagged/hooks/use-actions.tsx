import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useActions = () => {
    const updateStatus = async (encounterId: string, status: string, reason: string) => {
        const response = await protectedApi.PATCH(`v2/flagged-claims/${encounterId}/update-status`, {
            new_status : status,
            reviewer_notes : reason || undefined,
        })
        return response
    }

    const {mutateAsync : updateStatusMutation, isPending : updateStatusLoading, error : updateStatusError, isSuccess : updateStatusSuccess} = useMutation({
        mutationFn : ({encounterId, status, reason}: {encounterId: string, status: string, reason: string}) => updateStatus(encounterId, status, reason),
        onSuccess : () => {
            toast.success("Claim updated successfully")
        },
        onError : () => {
            toast.error("Failed to update claim")
        }
    })

    return {
        updateStatusMutation,
        updateStatusLoading,
        updateStatusError,
        updateStatusSuccess
    }
}
export default useActions