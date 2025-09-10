export interface BatchProcessingData {
    batchId: string;
    providerName: string;
    processingStatus: string;
    totalClaims: number;
    processedClaims: number;
    approvedClaims: number;
    rejectedClaims: number;
    flaggedClaims: number;
    pendingClaims: number;
    batchProgress: number;
    status: 'processed' | 'submitted' | 'under_review'
    startedAt: string;
    completedAt: string | null;
    lastUpdated: string;
  }