export interface AnomalousBatch {
    id: string;
    month: string;
    batchId: string;
    processingStatus: string;
    periodStart: string;
    periodEnd: string;
    dateSubmitted: string;
    totalClaims: number;
    totalApprovedCost: number;
    totalApproved: number;
    totalRejected: number;
    totalFlagged: number;
    expectedAmount: number;
    approvedAmount: number;
    isAnomalous: boolean;
    category: string;
    assignedTo: AssignedTo;
    assignedBy: string;
    assignedAt: string;
    note: string;
    reviewerNotes: string;
    reviewStatus: string;
    riskScoreLevel: string;
    verificationFully: number;
    verificationPartially: number;
    verificationNotVerified: number;
    reasons: Record<string, unknown>;
    provider : Provider
}

export interface Provider {
    id: string;
    name: string;
    email: string;
    category: string;
    region: string;
    district: string;
}

export interface AssignedTo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const transformAnomalousBatches = (data : any[]): AnomalousBatch[] => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => transformSingleAnomalousBatch(item));
};

export const transformSingleAnomalousBatch = (item : any): AnomalousBatch => {
    return {
        id: item.batch_id,
        month: item.month,
        batchId: item.batch_id,
        processingStatus: item.processing_status,
        periodStart: item.period_start,
        periodEnd: item.period_end,
        dateSubmitted: item.date_submitted,
        totalClaims: item.total_claims,
        totalApprovedCost: item.total_approval_cost,
        totalApproved: item.total_approved,
        totalRejected: item.total_rejected,
        totalFlagged: item.total_flagged,
        expectedAmount: item.expected_amount,
        approvedAmount: item.approved_amount,
        isAnomalous: item.is_anomalous,
        category: item.anomaly_category,
        assignedBy: item.anomaly_assigned_by,
        assignedAt: item.anomaly_assigned_at,
        note: item.note,
        reviewerNotes: item.reviewer_notes,
        reviewStatus: item.review_status,
        riskScoreLevel: item.risk_score_level,
        verificationFully: item.verification_fully,
        verificationPartially: item.verification_partially,
        verificationNotVerified: item.verification_not_verified,
        reasons: item.reasons,
        provider : {
            id : item.provider.id,
            name : item.provider.facility_name,
            email : item.provider.email,
            category : item.provider.category,
            region : item.provider.region,
            district : item.provider.district,
        },
        assignedTo: {
            id : item.anomaly_assigned_to?.id,
            firstName: item.anomaly_assigned_to?.first_name,
            lastName: item.anomaly_assigned_to?.last_name,
            email: item.anomaly_assigned_to?.email,
        }
    };
};

export const transformAnomalousBatchToTableData = (data : AnomalousBatch[]) => {
    return data.map((item) => transformSingleAnomalousBatchToTableData(item));
};
    
export const transformSingleAnomalousBatchToTableData = (item : AnomalousBatch) => {
    return {
        batchId : item.batchId,
        providerName : item.provider.name,
        providerId : item.provider.id,
        riskScoreLevel : item.riskScoreLevel,
        dateDetected : item.dateSubmitted,
        reviewStatus : item.reviewStatus,
        totalClaims : item.totalClaims,
        totalApprovedCost : item.totalApprovedCost,
        assignedTo : item.assignedTo,
        month : item.month,
        dateSubmitted : item.dateSubmitted,
    }       
}