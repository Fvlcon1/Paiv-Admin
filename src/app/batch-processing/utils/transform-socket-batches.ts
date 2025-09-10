import { BatchProcessingData } from "./types";

/**
 * Transforms batch processing data from the socket into a BatchProcessingData object.
 * @param data - The batch processing data from the socket.
 * @returns A BatchProcessingData object.
 */
export const transformBatchProcessingData = (data: any): BatchProcessingData => {
    return {
        batchId: data.batch_id,
        providerName: data.provider_name,
        processingStatus: data.processing_status,
        totalClaims: data.total_claims,
        processedClaims: data.processed_claims,
        approvedClaims: data.approved_claims,
        rejectedClaims: data.rejected_claims,
        flaggedClaims: data.flagged_claims,
        pendingClaims: data.pending_claims,
        batchProgress: data.percentage_complete,
        status: data.status,
        startedAt: data.started_at,
        completedAt: data.completed_at || null,
        lastUpdated: data.last_updated
    };
};

/**
 * Transforms an array of batch processing data from the socket into an array of BatchProcessingData objects.
 * @param data - The array of batch processing data from the socket.
 * @returns An array of BatchProcessingData objects.
 */
export const transformBatchProcessingList = (data: any[]): BatchProcessingData[] => {
    return data.map(transformBatchProcessingData);
};