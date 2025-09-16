import { flexRender, useReactTable, ColumnDef, Row } from "@tanstack/react-table";
import useColumns from "./use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text";
import { useState, useEffect, useMemo, useRef } from "react";
import theme from "@styles/theme";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { gradientClass } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useFlaggedContext } from "../context/flagged-context";
import NoData from "@components/NoData/noData";
import ClaimDetails from "@/app/components/claimDetails/claimDetails";
import { dummyClaimDetail } from "@/app/components/claimDetails/utils/data";
import { IClaimsDetailType } from "@/app/components/claimDetails/utils/types";
import { transformFlaggedClaimsToTable } from "@/app/flagged/utils/transform-flagged";
import { FlaggedClaimTable } from "../utils/types";

const Table = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const { columns } = useColumns({
        onRowSelectionChange: (keys) => setSelectedRowKeys(keys as string[]),
        selectedRowKeys
    });
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showShadow, setShowShadow] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { flaggedClaims, isFlaggedClaimsLoading, flaggedClaimsError } = useFlaggedContext();
    const [isClaimsDetailsVisible, setIsClaimsDetailsVisible] = useState(false);
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType | null>(null);

    const flaggedClaimsTable = useMemo(() => {
        return transformFlaggedClaimsToTable(flaggedClaims || []);
    }, [flaggedClaims]);

    useEffect(() => {
        console.log('Flagged claims updated:', { flaggedClaims });
    }, [flaggedClaims]);

    useEffect(() => {
        const handleScroll = () => {
            if (tableContainerRef.current) {
                const { scrollTop } = tableContainerRef.current;
                setShowShadow(scrollTop > 0);
            }
        };

        const container = tableContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const table = useReactTable({
        data: flaggedClaimsTable,
        columns: columns as ColumnDef<FlaggedClaimTable>[],
        state: {
            rowSelection: selectedRowKeys.reduce<Record<string, boolean>>((acc, key) => ({
                ...acc,
                [key]: true
            }), {}),
        },
        onRowSelectionChange: (updater) => {
            const newSelection = typeof updater === 'function' 
                ? updater({})
                : updater;
            setSelectedRowKeys(Object.keys(newSelection));
        },
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.encounterToken,
        manualSorting: true,
    });

    const { getHeaderGroups, getRowModel } = table;

    const NoDataLocal = () => (
        <tbody>
            <tr>
                <td
                    colSpan={columns?.length || 1}
                    className="h-[400px] w-full"
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <NoData />
                    </div>
                </td>
            </tr>
        </tbody>
    )

    return (
        <>
            <ClaimDetails
                claimDetails={claimDetails || dummyClaimDetail}
                isVisible={isClaimsDetailsVisible}
                close={() => setIsClaimsDetailsVisible(false)}
            />
            <div className="w-full px-4 pb-4 overflow-x-hidden">
                <div 
                    ref={tableContainerRef}
                    className="w-full overflow-x-auto relative"
                >
                    <div className="min-w-[800px] w-full">
                        <table className="w-full border-separate border-spacing-0">
                            {/* Table Head */}
                            <thead className="relative">
                                {getHeaderGroups().map((headerGroup) => (
                                    <tr 
                                        key={headerGroup.id}
                                        className={`sticky top-0 bg-white z-20 ${
                                            showShadow ? 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]' : ''
                                        }`}
                                    >
                                        {headerGroup.headers.map((header, colIndex: number) => (
                                            <th
                                                key={header.id}
                                                className={`text-left border-b-[1px] cursor-pointer border-solid border-border-primary 
                                                ${colIndex === 0 ? 'sticky left-0 z-30 bg-white' : 'bg-white'}
                                                ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                ${showShadow && colIndex === 0 ? 'shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)]' : ''}`
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                // style={{
                                                //     minWidth: colIndex === 0 ? '150px' : '150px',
                                                //     maxWidth: colIndex === 0 ? '150px' : '150px',
                                                // }}
                                            >
                                                <div className={`py-[15px] ${colIndex === 0 ? 'px-[10px]' : 'px-[30px]'} flex h-full items-center gap-1`}>
                                                    <Text
                                                        ellipsis
                                                        className={`${gradientClass} text-xs sm:text-sm`}
                                                        bold={theme.typography.bold.md}
                                                    >
                                                        {
                                                            header.isPlaceholder
                                                                ? null
                                                                : flexRender(header.column.columnDef.header, header.getContext())
                                                        }
                                                    </Text>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            {
                                flaggedClaims?.length === 0 ? (
                                    <NoDataLocal />
                                ) : (
                                    <tbody className={`${isLoading ? "opacity-50" : ""}`}>
                                        {getRowModel().rows.map((row, index) => (
                                            <tr
                                                key={row.id}
                                                className={`${isLoading ? "cursor-wait" : "cursor-pointer"} ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""} group hover:bg-bg-secondary duration-500`}
                                                onClick={() => {
                                                    // setClaimDetails(row.original)
                                                    setIsClaimsDetailsVisible(true)
                                                }}
                                            >
                                                {row.getVisibleCells().map((cell, colIndex: number) => (
                                                    <td
                                                        key={cell.id}
                                                        className={`border-b-[1px] border-solid border-border-primary py-3 sm:py-4 duration-500 group-hover:bg-bg-secondary whitespace-nowrap
                                                                    ${index % 2 === 0 ? "bg-bg-primary-lighter" : "bg-bg-primary"}
                                                                    ${colIndex === 0 ? 'sticky left-0 z-20' : 'z-10'}
                                                                    ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                                `}
                                                        style={{
                                                        }}
                                                    >
                                                        <div className={`${colIndex === 0 ? 'px-2 sm:px-3' : 'px-2 sm:px-6'} w-full flex h-full items-center gap-1`}>
                                                            <div className="text-xs sm:text-sm">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </div>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;