import React from 'react';

export const SummaryCardSkeleton = () => {
    return (
        <div className="relative w-full p-4 rounded-2xl border border-border-primary bg-white">
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-8 rounded-md bg-gray-200 animate-pulse"></div>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="absolute top-0 bottom-0 left-0 flex items-center">
                <div className="w-1 h-1/2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export const SummaryCardsSkeleton = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="flex gap-4 flex-1">
            {Array.from({ length: count }).map((_, index) => (
                <SummaryCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default SummaryCardSkeleton;
