'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useMutation } from '@tanstack/react-query';
import { ITableData } from '@/app/dashboard/utils/types';
import { useEffect, useState } from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import theme from '@/app/styles/theme';
import convertToClaimsDetails from '../../utils/convert-to-claims-details';
import getDate from '@/utils/getDate';

const useApprovedClaims = () => {
    const [selectedClaims, setSelectedClaims] = useState<string[]>([])
    const [isAllClaimsSelected, setIsAllClaimsSelected] = useState(false)
    const [tableData, setTableData] = useState<ITableData[]>([])

    const getApprovedClaims = async () => {
        setSelectedClaims([])
        const response = await protectedApi.GET("/claims/flagged")
        return response.reverse()
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
                diagnosis: `${item.diagnosis.map((diagnosis:any) => `${diagnosis.ICD10} - ${diagnosis.description}`).join(", ")}`,
                drugs: item.drugs.map((drug : any) => `${drug.code} - (${drug.dosage})`),
                expectedPayout : "GHS " + item.expected_payout,
                reasons : item.reason,
                serviceOutcome : item.service_outcome,
                serviceType1 : item.service_type_1,
                serviceType2 : item.service_type_2,
                specialties : item.specialties,
                typeofAttendance : item.typeofAttendance,
                medicalProcedures : item.medical_procedures,
                labTests : item.lab_tests,
                medicalProceduresTotal : item.medical_procedures_total,
                labTestsTotal : item.lab_tests_total,
                drugsTotal : item.drugs_total,
                claimSubmissionDate : getDate(new Date(item.created_at)),
                claimProcessingDate : item.updated_at ? getDate(new Date(item.updated_at)) : "-",
                claimStatus : item.status,
                actualPayout : item.total_payout ? "GHS " + item.total_payout : "-",
                details : convertToClaimsDetails(item)
            }));
            console.log({approvedTableData})
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