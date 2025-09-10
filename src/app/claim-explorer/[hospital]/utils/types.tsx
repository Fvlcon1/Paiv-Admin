export interface Batch {
    month: string;
    batchId: string;
    processingStatus: string;
    periodStart: string;
    periodEnd: string;
    dateSubmitted: string;
    totalClaims: number;
    totalApprovalCost: number;
    totalApproved: number;
    totalRejected: number;
    totalFlagged: number;
    expectedAmount: number;
    approvedAmount: number;
    verificationFully: number;
    verificationPartially: number;
    verificationNotVerified: number;
    claimPeriod: string;
}

export interface BatchTable {
    month: string;
    batchId: string;
    totalClaims: number;
    totalApproved: number;
    totalRejected: number;
    totalFlagged: number;
    approvedAmount: number;
    totalApprovalCost: number;
    claimPeriod: string;
    status: string;
    dateSubmitted: string;
}

export interface BatchDetails {
    month: string;
    batchId: string;
    processingStatus: string;
    periodStart: string;
    periodEnd: string;
    dateSubmitted: string;
    totalClaims: number;
    totalApprovalCost: number;
    totalApproved: number;
    totalRejected: number;
    totalFlagged: number;
    expectedAmount: number;
    approvedAmount: number;
    verificationFully: number;
    verificationPartially: number;
    verificationNotVerified: number;
}
