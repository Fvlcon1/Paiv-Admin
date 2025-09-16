import { Claim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/types";

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
}

export interface FlaggedClaim extends Claim {
    reasons: {
        stage: string,
        reason: string,
        category: string,
        severity: string,
        timestamp: string,
    };
}
