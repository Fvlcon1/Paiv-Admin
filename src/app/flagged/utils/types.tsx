import { Claim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/types";
import { IClaimsDetailType } from "@/app/components/claimDetails/utils/types";

export interface Diagnosis {
    GRDG: string;
    description: string;
    ICD10: string;
    price: number | null;
}

export interface EncounterDetails {
    encounter_type: string;
    admission_date: string;
    discharge_date: string;
}

export interface FlaggedClaimResponse {
    adjusted_amount: number | null;
    age: number;
    created_at: string;
    diagnosis: Diagnosis[];
    diagnosis_total: number | null;
    drugs: any[]; // You might want to define a proper type for drugs
    drugs_total: number | null;
    encounter_details: EncounterDetails;
    encounter_token: string;
    enrolment_status: string;
    expectedPayout: number | null;
    gender: string;
    lab_tests: any | null; // You might want to define a proper type for lab tests
    lab_tests_total: number | null;
    length_of_stay: number;
    location: string;
    medical_procedures: any[]; // You might want to define a proper type for procedures
    medical_procedures_total: number | null;
    patient_name: string;
    pharmacy: boolean;
    processed_at: string | null;
    provider_name: string;
    reason: string; // This is a JSON string
    nhis_id: string; // NHIS ID of the patient
    service_outcome: any | null; // You might want to define a proper type
    service_type: string[];
    service_type_1: string | null;
    service_type_2: string | null;
    specialties: any | null; // You might want to define a proper type
    status: string;
    total_payout: number | null;
    type_of_attendance: string;
    updated_at: string;
    updated_by: string;
}

export interface FlaggedClaimTable {
    claimId: string;
    encounterToken: string;
    providerName: string;
    otherNames: string;
    lastName: string;
    fullName: string;
    nhisId: string;
    processedStatus: string;
    reviewedBy: string;
    dateSubmitted: string;
    lastModified: string;
    totalApprovedCost: number;
    assignedTo?: {
        id: string,
        firstName: string;
        lastName: string;
        email: string;
        lastActive: string;
    };
    reasons: {
        stage: string,
        reason: string,
        category: string,
        severity: string,
        timestamp: string,
    };
    details : IClaimsDetailType
}

export interface FlaggedClaim {
    id: string;
    encounter: {
        encounterId: string;
        type: string;
        admissionDate: string | null;
        dischargeDate: string | null;
        lengthOfStay: number;
        typeOfAttendance: string;
    };
    basicInfo: {
        id: string;
        providerName: string;
        location: string;
        status: string;
        processedAt: string | null;
        updatedAt: string;
        updatedBy: string;
    };
    patient: {
        name: string;
        lastName: string;
        otherNames: string;
        age: number;
        gender: string;
        nhisId: string;
    };
    financials: {
        totalApprovedAmount: number;
        expectedPayout: number;
        totalPayout: number;
        medicalProceduresTotal: number;
        labTestsTotal: number;
        diagnosisTotal: number;
        drugsTotal: number;
    };
    diagnosis: Array<{
        code: string;
        description: string;
        gdrgCode: string;
        price: number;
    }>;
    drugs: any[];
    labTests: any[];
    medicalProcedures: any[];
    serviceTypes: string[];
    metadata: {
        createdAt: string;
        updatedAt: string;
        submittedAt: string;
    };
    review: {
        reviewedBy: string;
        reviewedAt: string;
        status: string;
    };
    assignedTo?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        lastActive: string;
    };
    
    reasons: {
        note: string;
        primary_flag: string;
        additional_flags: any | null;
        duplicate_detection?: {
            analysis_summary: {
                total_matches: number;
                highest_confidence: number;
                duplicate_type_counts: Record<string, number>;
            };
            duplicate_summary: Array<{
                type: string;
                confidence: number;
                duplicate_encounter: string;
                matching_fields_count: number;
                differing_fields_count: number;
            }>;
            original_claim_info: {
                diagnosis: string;
                gdrg_code: string;
                encounter_id: string;
                patient_name: string;
                provider_name: string;
                encounter_type: string;
                submission_date: string;
            };
        };
    };
}
