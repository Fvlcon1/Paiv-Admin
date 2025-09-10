export interface Claim {
    basicInfo: {
        id: string;
        providerId: string;
        providerName: string;
        district: string;
        providerType: string;
        healthcareLevel: string;
        prescriberLevel: string;
    }

    patient: {
        lastName: string;
        otherNames: string;
        dateOfBirth: string;
        gender: string;
        nhisNumber: string;
    }

    encounter: {
        encounterId: string;
        encounterType: string;
        admissionDate: string;
        dischargeDate: string;
        serviceType1: string;
        serviceType2: string;
        serviceOutcome: string;
        attendanceType: string;
        specialtiesAttended: string;
        specialtyCode: string;
    }

    diagnosis: {
        diagnosisName: string;
        icd10Diagnosis: string;
        icd10Code: string;
        gDrgDiagnosis: string;
        gdrgCode: string;
        gdrgDescription: string;
    }

    procedure: {
        procedureName: string;
        icd10Procedure: string;
        icd10CodeProcedure: string;
        icd10DescriptionProcedure: string;
        specialtyCodeProcedure: string;
        gDrgProcedure: string;
        gdrgCodeProcedure: string;
        gdrgDescriptionProcedure: string;
        levelProcedure: string;
        procedureDate: string;
    }
    medicine: {
        medicineCode: string;
        medicineName: string;
        medicineCodeProcedure: string;
        medicineNameProcedure: string;
        dosage: string;
        standardDosage: string;
        standardDosageProcedure: string;
        frequency: string;
        frequencyProcedure: string;
        duration: string;
        durationDays: string;
        durationDaysProcedure: string;
        medicineDate: string;
    }

    investigation: {
        gDrgInve: string;
        descriptionInve: string;
    }

    status: {
        claimStatus: string;
        processedStatus: string;
        processingStartedAt: string;
        processingCompletedAt: string;
    }

    financials: {
        totalClaimedAmount: number;
        totalApprovedAmount: number;
        totalRejectedAmount: number;
        totalPendingAmount: number;
        totalFlaggedAmount: number;
        amountBreakdown: string;
    }

    processing: {
        validationResults: string;
        rejectionReasons: string;
        flagReasons: string;
        pendingRequirements: string;
        clinicalFlags: string;
        inferenceRulesApplied: string;
        processingEngineVersion: string;
    }

    review: {
        autoProcessed: boolean;
        reviewRequired: boolean;
        reviewedBy: string;
        reviewedAt: string;
        reviewerNotes: string;
        qualityScore: number;
    }

    appeal: {
        appealStatus: string;
        appealSubmittedAt: string;
        appealResolvedAt: string;
    }

    metadata: {
        correctionHistory: string;
        batchId: string;
        externalReference: string;
        createdAt: string;
        updatedAt: string;
        submittedAt: string;
    }
}

// Table-specific interface
export interface ClaimTable {
    // Core table fields
    encounterToken: string;
    claimId: string;
    patientName: string;
    nhisId: string;
    status: string;  // 'pending' | 'approved' | 'rejected' etc.
    reviewedBy: string;
    dateSubmitted: string;
    lastModified: string;
    totalApprovedCost: number;
}