export interface FlaggedClaim {
    claimId: string;
    encounterToken: string;
    providerName: string;
    otherNames: string;
    nhisId: string;
    processedStatus: string;
    reviewedBy: string;
    dateSubmitted: string;
    lastModified: string;
    totalApprovedCost: number;
    reasons: {
        stage: string;
        reason: string;
        category: string;
        severity: string;
        timestamp: string;
    };
}