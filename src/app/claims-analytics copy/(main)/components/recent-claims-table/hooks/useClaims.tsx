'use client'

import { protectedApi } from '@/app/utils/apis/api';
import { useQuery } from '@tanstack/react-query';
import { IRecentTableData } from '../utils/types';
import convertToClaimsDetails from '@/app/claims-analytics/utils/convert-to-claims-details';
import { useEffect, useState } from 'react';
import { useDashboardContext } from '@/app/claims-analytics/(main)/context/context';

const useRecentClaims = () => {
    const [tableData, setTableData] = useState<IRecentTableData[]>([])
    const {startDate, endDate, selectedHospital, selectedRegion, selectedDistrict} = useDashboardContext()

    const getClaims = async () => {
        const response = await protectedApi.GET("/claims/", {
            from_date : startDate,
            to_date : endDate,
            hospital_name : selectedHospital,
            region : selectedRegion,
            district : selectedDistrict
        })
        convertToRecentTableData(response.reverse())
        return response.reverse()
    }

    const convertToRecentTableData = (data: any[]) => {
        const recentTableData = data.map((item) => ({
            id: item.encounter_token,
            hospitalName: item.hospital_name,
            patientName: item.patient_name,
            location: item.location,
            diagnosis: `${item.diagnosis.map((diagnosis: any) => `${diagnosis.ICD10} - ${diagnosis.description}`).join(", ")}`,
            drugs: item.drugs.map((drug: any) => `${drug.code} - (${drug.dosage})`),
            expectedPayout: item.adjusted_amount,
            reasons: item.reason,
            serviceOutcome: item.service_outcome,
            serviceType1: item.service_type_1,
            serviceType2: item.service_type_2,
            specialties: item.specialties,
            typeofAttendance: item.typeofAttendance,
            medicalProcedures: item.medical_procedures,
            labTests: item.lab_tests,
            medicalProceduresTotal: item.medical_procedures_total,
            labTestsTotal: item.lab_tests_total,
            drugsTotal: item.drugs_total,
            createdAt : item.created_at,
            details: convertToClaimsDetails(item)
        }));
        console.log({ recentTableData })
        setTableData(recentTableData);
    }

    const { data: claims, isPending: isClaimsPending } = useQuery({
        queryFn: getClaims,
        queryKey: ["claims", startDate, endDate, selectedHospital, selectedRegion, selectedDistrict],
        refetchOnMount: true,
    })

    useEffect(()=>{
        if(claims?.length)
            convertToRecentTableData(claims)
    }, [])

    return {
        claims,
        isClaimsPending,
        tableData,
    }
}
export default useRecentClaims