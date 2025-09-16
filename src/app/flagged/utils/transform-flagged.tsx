import { Claim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/types";
import { FlaggedClaim, FlaggedClaimTable } from "./types"
import { transformClaim } from "@/app/claim-explorer/[hospital]/[batch-id]/utils/transform-claims";

/**
 * Transforms an array of raw claim data to table format
 * @param data - Array of raw claim data
 * @returns Array of transformed claim data
 */
export const transformFlaggedClaims = (data: any[]) : FlaggedClaim[] => {
    try{
        const transformedFlaggedClaims = data.map((flaggedClaim: any, index: number) => {
            const claim = transformClaim(flaggedClaim)
            const reasons : any = []
            
            const transformedFlaggedClaim = {
                ...claim,
                reasons,
            }
            return transformedFlaggedClaim
        })
        return transformedFlaggedClaims
    } catch(e){
        console.log({e})
        return []
    }
}

/**
 * Transforms a raw claim data to table format
 * @param claim - Raw claim data
 * @returns Transformed claim data
 */
export const transformFlaggedClaimToTable = (claim: FlaggedClaim): FlaggedClaimTable => {
    return {
        encounterToken: claim.encounter.encounterId,
        claimId: claim.basicInfo.id,
        providerName: claim.basicInfo.providerName,
        otherNames: claim.patient.otherNames,
        lastName: claim.patient.lastName,
        fullName: `${claim.patient.lastName} ${claim.patient.otherNames}`.trim(),
        nhisId: claim.patient.nhisNumber,
        processedStatus: claim.status.processedStatus?.toLowerCase() || 'pending',  // Ensure lowercase status
        reviewedBy: claim.review.reviewedBy,
        dateSubmitted: claim.metadata.submittedAt,
        lastModified: claim.metadata.updatedAt || claim.metadata.submittedAt,
        totalApprovedCost: claim.financials.totalApprovedAmount,
        reasons: claim.reasons,
        assignedTo: claim.assignedTo,
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