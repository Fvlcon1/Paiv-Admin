import { Batch, BatchDetails, BatchTable } from "./types";


/**
 * Transforms the batches data from the API response to a more usable format.
 * @param data - The batches data from the API response.
 * @returns The transformed batches data.
 */
export const transformBatches = (data: any[]): Batch[] => {
    return data.map(batch => ({
        month: batch.month,
        batchId: batch.batch_id,
        processingStatus: batch.processing_status,
        periodStart: batch.period_start,
        periodEnd: batch.period_end,
        dateSubmitted: batch.date_submitted,
        claimPeriod: new Date(batch.period_end).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalClaims: batch.total_claims,
        totalApprovalCost: batch.total_approval_cost,
        totalApproved: batch.total_approved,
        totalRejected: batch.total_rejected,
        totalFlagged: batch.total_flagged,
        expectedAmount: batch.expected_amount,
        approvedAmount: batch.approved_amount,
        verificationFully: batch.verification_fully,
        verificationPartially: batch.verification_partially,
        verificationNotVerified: batch.verification_not_verified,
    }));
};

/**
 * Transforms batch data into a format suitable for display in a table
 * @param batches - Array of batch data
 * @returns Transformed batch data for table display
 */
export const transformBatchesToTable = (batches: Batch[]): BatchTable[] => {
    return batches.map(batch => ({
        month: batch.month,
        batchId: batch.batchId,
        totalClaims: batch.totalClaims,
        totalApproved: batch.totalApproved,
        totalRejected: batch.totalRejected,
        totalFlagged: batch.totalFlagged,
        approvedAmount: batch.approvedAmount,
        expectedAmount: batch.expectedAmount,
        totalApprovalCost: batch.totalApprovalCost,
        claimPeriod: batch.claimPeriod,
        status: batch.processingStatus,
        dateSubmitted: batch.dateSubmitted
    }));
};

export const transformBatchToDetails = (batch: Batch): BatchDetails => {
    return {
        month: batch.month,
        batchId: batch.batchId,
        processingStatus: batch.processingStatus,
        periodStart: batch.periodStart,
        periodEnd: batch.periodEnd,
        dateSubmitted: batch.dateSubmitted,
        totalClaims: batch.totalClaims,
        totalApprovalCost: batch.totalApprovalCost,
        totalApproved: batch.totalApproved,
        totalRejected: batch.totalRejected,
        totalFlagged: batch.totalFlagged,
        expectedAmount: batch.expectedAmount,
        approvedAmount: batch.approvedAmount,
        verificationFully: batch.verificationFully,
        verificationPartially: batch.verificationPartially,
        verificationNotVerified: batch.verificationNotVerified,
    }
}