import { FlaggedClaim } from "@/app/flagged/utils/types";
import { IClaimsDetailType, IDiagonosisType, IDrugsType, IEncounterDetails } from "./types";

type DrugItem = {
    code: string;
    description: string;
    price?: number;
    [key: string]: any;
};

/**
 * Transforms a FlaggedClaim to IClaimsDetailType
 * @param claim The FlaggedClaim to transform
 * @returns IClaimsDetailType
 */
export const transformClaimToClaimDetail = (claim: FlaggedClaim): IClaimsDetailType => {
    // Extract diagnosis data
    const diagnosis: IDiagonosisType[] = claim.diagnosis.map(d => ({
        ICD10: d.code,
        description: d.description,
        GRDG: d.gdrgCode,
        diagnosis: d.description,
        tariff: d.price || 0,
    }));

    // Transform drugs data to match IDrugsType
    const drugs: IDrugsType[] = claim.drugs?.map((drug: DrugItem) => ({
        code: drug.code || '',
        description: drug.description || 'Unknown Drug',
        dosage: '', // Default empty if not available
        date: new Date(), // Use current date as fallback
        quantity: 1, // Default quantity
        tariff: drug.price || 0,
        total: drug.price || 0,
    })) || [];

    // Extract reasons from the flagged claim
    const reasons: string[] = [];
    if (claim.reasons?.note) {
        reasons.push(claim.reasons.note);
    }
    if (claim.reasons?.primary_flag) {
        reasons.push(`Primary flag: ${claim.reasons.primary_flag}`);
    }

    // Handle service types
    const serviceType1 = claim.serviceTypes[0] || '';
    const serviceType2 = claim.serviceTypes.length > 1 ? claim.serviceTypes[1] : '';

    // Calculate totals from the actual data
    const medicalProceduresTotal = claim.financials.medicalProceduresTotal || 0;
    const labTestsTotal = claim.financials.labTestsTotal || 0;
    const diagnosisTotal = claim.financials.diagnosisTotal || 0;
    const drugsTotal = claim.financials.drugsTotal || 0;

    // Create comprehensive encounter details
    const now = new Date().toISOString();
    const encounterDetails: IEncounterDetails = {
        // Required INhisDetails properties
        othernames: claim.patient?.otherNames || '',
        lastname: claim.patient?.lastName || '',
        nhisId: claim.patient?.nhisId || '',
        lastVisit: '',
        gender: claim.patient?.gender || '',
        dob: '',
        expirtyDate: '',
        enrolementStatus: '',
        insuranceType: '',
        issueDate: '',
        maritalStatus: '',
        residentialAddress: '',
        phoneNumber: '',
        ghanaCardNumber: '',
        memberShipId: '',
        imageUrl: '',
        
        // IEncounterDetails properties
        checkinImageUrl: '',
        checkoutImageUrl: '',
        createdAt: claim.metadata?.createdAt || now,
        checkinStatus: false,
        checkoutStatus: false,
        EncounterId: claim.encounter.encounterId,
        checkinTime: claim.encounter.admissionDate ? new Date(claim.encounter.admissionDate) : undefined,
        checkoutTime: claim.encounter.dischargeDate ? new Date(claim.encounter.dischargeDate) : undefined,
        disposition: '',
        claimSubmissionAt: claim.metadata?.submittedAt ? new Date(claim.metadata.submittedAt) : undefined,
    };

    return {
        encounterToken: claim.encounter.encounterId,
        totalPayout: claim.financials.totalPayout,
        expectedPayout: claim.financials.expectedPayout,
        reasons,
        diagnosis,
        drugs,
        serviceOutcome: claim.reasons?.primary_flag || '',
        serviceType1,
        serviceType2,
        specialties: [], // No direct mapping available without rawData
        typeofAttendance: claim.encounter.typeOfAttendance,
        medicalProcedures: claim.medicalProcedures?.map(p => 
            typeof p === 'string' ? p : JSON.stringify(p)
        ) || [],
        labTests: claim.labTests?.map(test => 
            typeof test === 'string' ? test : JSON.stringify(test)
        ) || [],
        medicalProceduresTotal,
        labTestsTotal,
        diagnosisTotal,
        drugsTotal,
        hospitalName: claim.basicInfo.providerName,
        patientName: claim.patient.name,
        location: claim.basicInfo.location,
        pharmacy: 'No', // Default value since we don't have this info without rawData
        status: claim.basicInfo.status,
        encounterDetails,
    };
};
