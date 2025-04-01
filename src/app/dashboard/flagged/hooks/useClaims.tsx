'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';
import { IApprovedTableData } from '../utils/types';
import { useEffect, useState } from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import theme, { colors } from '../../../styles/theme';
import { IClaimsDetailType } from '../../utils/types';

const useApprovedClaims = () => {
    const [selectedClaims, setSelectedClaims] = useState<string[]>([])
    const [isAllClaimsSelected, setIsAllClaimsSelected] = useState(false)
    const [tableData, setTableData] = useState<IApprovedTableData[]>([])

    const getApprovedClaims = async () => {
        setSelectedClaims([])
        const response = await protectedApi.GET("/flagged")
        console.log({response})
        return response
    }

    const handleSelectClaim = (id:string) => {
        setSelectedClaims(prev => {
            if(!prev.find((claimId) => id === claimId))
                return [...prev, id]
            return prev
        })
    }

    const handleUnselectClaim = (id:string) => {
        setSelectedClaims(prev => {
            return prev.filter((claimId) => id !== claimId)
        })
    }

    const checkIsAllClaimsSelected = () => {
        if(approvedClaims?.length){
            let isAllClaimsSelected = true
            approvedClaims?.forEach((claim:any) => {
                if(!selectedClaims.includes(claim.id)){
                    return isAllClaimsSelected = false
                }
            })
            setIsAllClaimsSelected(isAllClaimsSelected)
        }
    }

    const handleSelectAllClaims = () => {
        const selectedClaims : string[] = []
        approvedClaims.forEach((claim:any) => selectedClaims.push(claim.id))
        setSelectedClaims(selectedClaims)
    }

    const handleUnselectAllClaims = () => {
        setSelectedClaims([])
    }

    const convertToClaimsDetails = (claim:any) : IClaimsDetailType => {
        return {
            reasons : claim.reason,
            totalPayout : claim.total_payout,
            diagnosis : [{
                description : claim.diagnosis,
                diagnosis : claim.diagnosis,
                ICD10 : "L03.9",
                GRDG : "MEDI31A"
            }],
            drugs : claim.drugs.map((drug:any) => ({
                code : drug.code,
                quantity : drug.quantity,
                description : drug.code,
                date : new Date()
            }))
        }
    }

    const convertToApprovedTableData = (data:any[]) => {
        const approvedTableData = data.map((item) => ({
            id: item.encounter_token,
            selectable: (
                selectedClaims.includes(item.encounter_token)
                ? <FaSquareCheck 
                    size={20}
                    color={theme.colors.main.primary}
                    className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"
                    onClick={(e)=>{
                        e.stopPropagation()
                        handleUnselectClaim(item.encounter_token)
                    }} 
                />
                : <div 
                    onClick={(e)=>{
                        e.stopPropagation()
                        handleSelectClaim(item.encounter_token)
                    }} 
                    className="rounded-[6px] mt-2 overflow-hidden relative w-[20px] h-[20px] bg-bg-tetiary"
                />
            ),
            hospitalName: item.hospital_name,
            patientName: item.patient_name,
            location: item.location,
            diagnosis: item.diagnosis,
            drugs: item.drugs.map((drug : any) => `${drug.code} Qty(${drug.quantity})`),
            details : convertToClaimsDetails(item)
        }));
        
        setTableData(approvedTableData);
    }

    const {mutate : getApprovedClaimsMutation, data : approvedClaims, isPending : isApprovedClaimsPending} = useMutation({
        mutationFn : getApprovedClaims,
        onSuccess : (data) => {
            convertToApprovedTableData(data)
        }
    })

    useEffect(()=>{
        checkIsAllClaimsSelected()
        if(approvedClaims)
            convertToApprovedTableData(approvedClaims)
    },[selectedClaims])

    return {
        getApprovedClaimsMutation,
        approvedClaims,
        isApprovedClaimsPending,
        tableData,
        selectedClaims,
        isAllClaimsSelected,
        handleSelectAllClaims,
        handleUnselectAllClaims
    }
}
export default useApprovedClaims