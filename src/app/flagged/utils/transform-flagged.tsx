import { FlaggedClaim } from "./types"

export const transformFlaggedClaims = (claims: any[]) : FlaggedClaim[] => {
    return claims.map((claim: any) => {
        return {
            claimId: claim.id,
            encounterToken: claim.encounter_id,
            providerName: claim.provider_name,
            otherNames: claim.other_names,
            firstName: claim.first_name,
            fullName: claim.other_names + " " + claim.last_name,
            nhisId: claim.nhis_number,
            processedStatus: claim.processed_status,
            reviewedBy: claim.processed_by,
            dateSubmitted: claim.created_at,
            lastModified: claim.updated_at,
            totalApprovedCost: claim.total_approved_amount,
            reasons: {
                stage: claim.reasons.stage,
                reason: claim.reasons.reason,
                category: claim.reasons.category,
                severity: claim.reasons.severity,
                timestamp: claim.reasons.timestamp,
            },
        }
    })
}