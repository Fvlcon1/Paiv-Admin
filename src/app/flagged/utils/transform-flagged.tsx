import { Claim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/types";
import { FlaggedClaim, FlaggedClaimTable, FlaggedClaimResponse } from "./types"
import { transformClaim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/transform-claims";
import dayjs from "dayjs";
import { transformClaimToClaimDetail } from "@/app/components/claimDetails/utils/transform-claim";

/**
 * Parses the reason string from the API into a structured object
 */
const parseReason = (reasonString: string) => {
    try {
        // return JSON.parse(reasonString);
        return {
            note: 'Error parsing reason',
            primary_flag: 'parsing_error',
            additional_flags: null
        }
    } catch (e) {
        console.error('Failed to parse reason:', e);
        return {
            note: 'Error parsing reason',
            primary_flag: 'parsing_error',
            additional_flags: null
        };
    }
};

/**
 * Transforms a single flagged claim from API response to FlaggedClaim format
 */
const transformFlaggedClaim = (data: FlaggedClaimResponse): FlaggedClaim => {
    const reason = typeof data.reason === 'string' ? parseReason(data.reason) : data.reason;
    
    // Split patient name into last name and other names
    const nameParts = data.patient_name.trim().split(' ');
    const lastName = nameParts.length > 0 ? nameParts[0] : '';
    const otherNames = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return {
        id: data.encounter_token,
        encounter: {
            encounterId: data.encounter_token,
            type: data.encounter_details?.encounter_type || 'Unknown',
            admissionDate: data.encounter_details?.admission_date,
            dischargeDate: data.encounter_details?.discharge_date,
            lengthOfStay: data.length_of_stay,
            typeOfAttendance: data.type_of_attendance,
        },
        basicInfo: {
            id: data.encounter_token,
            providerName: data.provider_name,
            location: data.location,
            status: data.status,
            processedAt: data.processed_at,
            updatedAt: data.updated_at,
            updatedBy: data.updated_by,
        },
        patient: {
            name: data.patient_name,
            lastName,
            otherNames,
            age: data.age,
            gender: data.gender,
            nhisId: data.nhis_id,
        },
        financials: {
            totalApprovedAmount: data.adjusted_amount || 0,
            expectedPayout: data.expectedPayout || 0,
            totalPayout: data.total_payout || 0,
            medicalProceduresTotal: data.medical_procedures_total || 0,
            labTestsTotal: data.lab_tests_total || 0,
            diagnosisTotal: data.diagnosis_total || 0,
            drugsTotal: data.drugs_total || 0,
        },
        diagnosis: data.diagnosis?.map(d => ({
            code: d.ICD10,
            description: d.description,
            gdrgCode: d.GRDG,
            price: d.price || 0,
        })) || [],
        drugs: data.drugs || [],
        labTests: data.lab_tests || [],
        medicalProcedures: data.medical_procedures || [],
        serviceTypes: data.service_type || [],
        reasons: reason,
        metadata: {
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            submittedAt: data.created_at,
        },
        review: {
            reviewedBy: data.updated_by || 'System',
            reviewedAt: data.updated_at || new Date().toISOString(),
            status: data.status,
        },
    };
};

/**
 * Transforms an array of raw claim data to FlaggedClaim format
 * @param data - Array of raw claim data from API
 * @returns Array of transformed FlaggedClaim objects
 */
export const transformFlaggedClaims = (data: FlaggedClaimResponse[]): FlaggedClaim[] => {
    try {
        return data.map(transformFlaggedClaim);
    } catch (e) {
        console.error('Error transforming flagged claims:', e);
        return [];
    }
};

/**
 * Transforms a single FlaggedClaim to table format
 * @param claim - FlaggedClaim object
 * @returns Formatted table row data
 */
export const transformFlaggedClaimToTable = (claim: FlaggedClaim): FlaggedClaimTable => {
    // Format the primary reason
    const primaryReason = claim.reasons?.primary_flag 
        ? claim.reasons?.primary_flag
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'No reason provided';

    return {
        encounterToken: claim.encounter.encounterId,
        claimId: claim.basicInfo.id,
        providerName: claim.basicInfo.providerName,
        otherNames: claim.patient.otherNames,
        lastName: claim.patient.lastName,
        fullName: claim.patient.name,
        nhisId: claim.patient.nhisId,
        processedStatus: claim.basicInfo.status?.toLowerCase() || 'pending',
        reviewedBy: claim.review.reviewedBy,
        dateSubmitted: claim.metadata.submittedAt,
        lastModified: claim.metadata.updatedAt || claim.metadata.submittedAt,
        totalApprovedCost: claim.financials.totalApprovedAmount,
        reasons: {
            stage: 'detection',
            reason: primaryReason,
            category: claim.reasons?.primary_flag || 'unknown',
            severity: 'high', // You might want to calculate this based on your business logic
            timestamp: claim.metadata.updatedAt || claim.metadata.createdAt,
        },
        assignedTo: claim.assignedTo,
        details : transformClaimToClaimDetail(claim)
    };
};

/**
 * Transforms an array of raw claim data to table format
 * @param claims - Array of raw claim data
 * @returns Array of transformed claim data
 */
export const transformFlaggedClaimsToTable = (claims: FlaggedClaim[]): FlaggedClaimTable[] => {
    return claims.map((claim: FlaggedClaim) => transformFlaggedClaimToTable(claim));
};