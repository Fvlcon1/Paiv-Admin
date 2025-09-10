import React from 'react';

interface TableSkeletonProps {
    columns?: number;
    rows?: number;
    showHeader?: boolean;
    className?: string;
    rowHeight?: string;
    headerHeight?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    columns = 7,
    rows = 5,
    showHeader = true,
    className = '',
    rowHeight = 'h-10',
    headerHeight = 'h-12',
}) => {
    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <div className="w-full overflow-x-auto">
                <table className="w-full border-separate border-spacing-0">
                    {showHeader && (
                        <thead>
                            <tr>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <th
                                        key={`header-${colIndex}`}
                                        className={`px-4 py-3 text-left border-b border-gray-200 dark:border-gray-700 ${headerHeight}`}
                                    >
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={`row-${rowIndex}`} className="animate-pulse">
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td
                                        key={`cell-${rowIndex}-${colIndex}`}
                                        className={`px-4 py-3 ${rowHeight} ${colIndex === 0 ? 'font-medium' : ''}`}
                                    >
                                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableSkeleton;
