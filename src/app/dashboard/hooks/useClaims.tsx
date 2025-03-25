'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
        declinedClaims
    }
}
export default useClaims