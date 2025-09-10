import { ClaimTable, Claim } from './types';

export const transformClaim = (data: any): Claim => {
    return {
        basicInfo: {
            id: data.id,
            providerId: data.provider_id,
            providerName: data.provider_name,
            district: data.district,
            providerType: data.provider_type,
            healthcareLevel: data.healthcare_level,
            prescriberLevel: data.prescriber_level,
        },
        patient: {
            lastName: data.last_name,
            otherNames: data.other_names,
            dateOfBirth: data.date_of_birth,
            gender: data.gender,
            nhisNumber: data.nhis_number,
        },
        encounter: {
            encounterId: data.encounter_id,
            encounterType: data.encounter_type,
            admissionDate: data.admission_date,
            dischargeDate: data.discharge_date,
            serviceType1: data.service_type_1,
            serviceType2: data.service_type_2,
            serviceOutcome: data.service_outcome,
            attendanceType: data.attendance_type,
            specialtiesAttended: data.specialties_attended,
            specialtyCode: data.specialty_code,
        },
        diagnosis: {
            diagnosisName: data.diagnosis_name,
            icd10Diagnosis: data.icd10_diagnosis,
            icd10Code: data.icd10_code,
            gDrgDiagnosis: data.g_drg_diagnosis,
            gdrgCode: data.gdrg_code,
            gdrgDescription: data.gdrg_description,
        },
        procedure: {
            procedureName: data.procedure_name,
            icd10Procedure: data.icd10_procedure,
            icd10CodeProcedure: data.icd10_code_procedure,
            icd10DescriptionProcedure: data.icd10_description_procedure,
            specialtyCodeProcedure: data.specialty_code_procedure,
            gDrgProcedure: data.g_drg_procedure,
            gdrgCodeProcedure: data.gdrg_code_procedure,
            gdrgDescriptionProcedure: data.gdrg_description_procedure,
            levelProcedure: data.level_procedure,
            procedureDate: data.procedure_date,
        },
        medicine: {
            medicineCode: data.medicine_code,
            medicineName: data.medicine_name,
            medicineCodeProcedure: data.medicine_code_procedure,
            medicineNameProcedure: data.medicine_name_procedure,
            dosage: data.dosage,
            standardDosage: data.standard_dosage,
            standardDosageProcedure: data.standard_dosage_procedure,
            frequency: data.frequency,
            frequencyProcedure: data.frequency_procedure,
            duration: data.duration,
            durationDays: data.duration_days,
            durationDaysProcedure: data.duration_days_procedure,
            medicineDate: data.medicine_date,
        },
        investigation: {
            gDrgInve: data.g_drg_inve,
            descriptionInve: data.description_inve,
        },
        status: {
            claimStatus: data.claim_status,
            processedStatus: data.processed_status,
            processingStartedAt: data.processing_started_at,
            processingCompletedAt: data.processing_completed_at,
        },
        financials: {
            totalClaimedAmount: data.total_claimed_amount,
            totalApprovedAmount: data.total_approved_amount,
            totalRejectedAmount: data.total_rejected_amount,
            totalPendingAmount: data.total_pending_amount,
            totalFlaggedAmount: data.total_flagged_amount,
            amountBreakdown: data.amount_breakdown,
        },
        processing: {
            validationResults: data.validation_results,
            rejectionReasons: data.rejection_reasons,
            flagReasons: data.flag_reasons,
            pendingRequirements: data.pending_requirements,
            clinicalFlags: data.clinical_flags,
            inferenceRulesApplied: data.inference_rules_applied,
            processingEngineVersion: data.processing_engine_version,
        },
        review: {
            autoProcessed: data.auto_processed,
            reviewRequired: data.review_required,
            reviewedBy: data.processed_by,
            reviewedAt: data.reviewed_at,
            reviewerNotes: data.reviewer_notes,
            qualityScore: data.quality_score,
        },
        appeal: {
            appealStatus: data.appeal_status,
            appealSubmittedAt: data.appeal_submitted_at,
            appealResolvedAt: data.appeal_resolved_at,
        },
        metadata: {
            correctionHistory: data.correction_history,
            batchId: data.batch_id,
            externalReference: data.external_reference,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            submittedAt: data.submitted_at,
        },
    };
};

/**
 * Transforms claim data into a format suitable for display in a table
 */
export const transformClaimToTable = (claim: Claim): ClaimTable => {
    console.log({reviewedBy : claim.review.reviewedBy})
    return {
        encounterToken: claim.encounter.encounterId,
        claimId: claim.basicInfo.id,  // Using the same ID as claimId
        patientName: `${claim.patient.lastName} ${claim.patient.otherNames}`.trim(),
        nhisId: claim.patient.nhisNumber,
        status: claim.status.processedStatus?.toLowerCase() || 'pending',  // Ensure lowercase status
        reviewedBy: claim.review.reviewedBy,
        dateSubmitted: claim.metadata.submittedAt,
        lastModified: claim.metadata.updatedAt || claim.metadata.submittedAt,
        totalApprovedCost: claim.financials.totalApprovedAmount
    };
};

/**
 * Transforms an array of raw claim data to table format
 */
export const transformClaimsToTable = (data: any[]): ClaimTable[] => {
    return data.map(item => transformClaimToTable(item));
};

export const transformClaims = (data: any[]): Claim[] => {
    const claims = data.map(item => transformClaim(item));
    return claims
}
    