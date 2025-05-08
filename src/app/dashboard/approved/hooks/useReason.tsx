'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';

const useReasonForDeclining = () => {
    const handleReasonForDeclining = async ({
        encounterToken,
        reason
    }: {
        encounterToken : string,
        reason : string
    }) => {
        const response = await protectedApi.POST("/claims/decline", {
            encounter_token : encounterToken,
            reason
        })
        console.log({response})
        return response
    }

    const {
        mutate : handleReasonForDecliningMutation, 
        isPending : isReasonForDecliningPending, 
        error : reasonForDecliningError,
        isSuccess : reasonForDecliningSuccess
    } = useMutation({
        mutationFn : handleReasonForDeclining
    })

    return {
        handleReasonForDecliningMutation,
        isReasonForDecliningPending,
        reasonForDecliningError,
        reasonForDecliningSuccess
    }
}

export default useReasonForDeclining
