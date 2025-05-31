'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useReasonForDeclining = () => {
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
            toast.success("Claim declined successfully")
        }
    })

    return {
        handleReasonForDecliningMutation,
        isReasonForDecliningPending,
        reasonForDecliningError,
        reasonForDecliningSuccess
    }
}

export default useReasonForDeclining
