'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useClaims = () => {

    const getApprovedClaims = async () => {
        const response = await protectedApi.GET("/approved")
        console.log({response})
        return response
    }
    
    const getFlaggedClaims = async () => {
        const response = await protectedApi.GET("/approved")
        console.log({response})
        return response
    }

    const getDeclinedClaims = async () => {
        const response = await protectedApi.GET("/approved")
        console.log({response})
        return response
    }

    const handleStatusUpdate = async ({
        status,
        encounterToken,
        reason
    }: {
        status : string,
        encounterToken : string,
        reason : string
    }) => {
        const response = await protectedApi.PATCH(`/claims/update-status/${encounterToken}`, {
            status,
            reason
        })
        console.log({response})
        return response
    }

    const {
        mutate : handleStatusUpdateMutation,
        isPending : isStatusUpdatePending,
        error : statusUpdateError,
        isSuccess : statusUpdateSuccess
    } = useMutation({
        mutationFn : handleStatusUpdate,
        onSuccess : () => {
            toast.success("Claim Status Updated Successfully")
        }
    })

    const {mutate : getApprovedClaimsMutation, data : approvedClaims} = useMutation({
        mutationFn : getApprovedClaims,
    })

    const {mutate : getFlaggedCLaimsMutation, data : flaggedClaims} = useMutation({
        mutationFn : getFlaggedClaims,
    })

    const {mutate : getDeclinedClaimsMutation, data : declinedClaims} = useMutation({
        mutationFn : getDeclinedClaims,
    })

    // useEffect(()=>{
    //     getApprovedClaimsMutation()
    //     getFlaggedCLaimsMutation()
    //     getDeclinedClaimsMutation()
    // },[])

    return {
        getApprovedClaimsMutation, 
        getFlaggedCLaimsMutation, 
        getDeclinedClaimsMutation,
        approvedClaims,
        flaggedClaims,
        declinedClaims,
        handleStatusUpdateMutation,
        isStatusUpdatePending,
        statusUpdateError,
        statusUpdateSuccess
    }
}
export default useClaims