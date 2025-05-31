import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const useStatus = () => {
    const handleApprove = async ({
        encounterToken
    }: {
        encounterToken : string
    }) => {
        const response = await protectedApi.PATCH(`/claims/update-status/${encounterToken}`, {
            status : "approved"
        })
        return response
    }

    const {
        mutate : handleApproveMutation, 
        isPending : isApprovePending, 
        error : approveError,
        isSuccess : approveSuccess
    } = useMutation({
        mutationFn : handleApprove,
        onSuccess : () => {
            toast.success("Claim Approved Successfully")   
        }
    })

    const handleReasonForDeclining = async ({
        encounterToken,
        reason
    }: {
        encounterToken : string,
        reason : string
    }) => {
        const response = await protectedApi.PATCH(`/claims/update-status/${encounterToken}`, {
            reason,
            status : "rejected"
        })
        return response
    }

    const {
        mutate : handleReasonForDecliningMutation, 
        isPending : isReasonForDecliningPending, 
        error : reasonForDecliningError,
        isSuccess : reasonForDecliningSuccess
    } = useMutation({
        mutationFn : handleReasonForDeclining,
        onSuccess : () => {
            toast.success("Claim Declined Successfully")   
        }
    })

    return {
        handleApproveMutation,
        isApprovePending,
        approveError,
        approveSuccess,
        handleReasonForDecliningMutation,
        isReasonForDecliningPending,
        reasonForDecliningError,
        reasonForDecliningSuccess
    }
}

export default useStatus
