import { flexRender, useReactTable } from "@tanstack/react-table";
import useColumns from "./use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text";
import { useEffect, useMemo, useRef, useState } from "react";
import theme from "@styles/theme";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { gradientClass } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { data } from "./data";
import { useAnomalyContext } from "../context/anomaly-context";
import { transformAnomalousBatchToTableData } from "../utils/transform-anomalous-batches";

const Table = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const {anomalousBatches} = useAnomalyContext()

    const transformedAnomalousBatches = useMemo(() => transformAnomalousBatchToTableData(anomalousBatches || []), [anomalousBatches])
    useEffect(()=>{
        console.log({transformedAnomalousBatches})
    },[transformedAnomalousBatches])
    
    const { columns } = useColumns({
        selectedRowKeys,
        onRowSelectionChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    });
    
    const { getHeaderGroups, getRowModel } = useReactTable({
        data: transformedAnomalousBatches || [],
        columns: columns,
        state: {
            rowSelection: selectedRowKeys.reduce((acc, key) => ({
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
        getRowId: (row) => String(row.batchId || ''),
        manualSorting: true,
    });

    // Handle scroll events for the shadow effect
    useEffect(() => {
        const handleScroll = () => {
            if (tableContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
                setIsScrolling(scrollLeft > 0);
                
                // Update shadow based on scroll position
                const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
                tableContainerRef.current.style.setProperty('--show-right-shadow', isAtEnd ? '0' : '1');
            }
        };

        const container = tableContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Initial check
            handleScroll();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div 
                ref={tableContainerRef}
                className="relative w-full h-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-4"
                style={{
                    '--show-right-shadow': '0',
                    '--shadow-opacity': '0.1',
                } as React.CSSProperties}
            >
                <table className="w-full min-w-full border-separate border-spacing-0">
                    {/* Table Head */}
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, colIndex) => (
                                    <th
                                        key={header.id}
                                        className={`text-left border-b-[1px] cursor-pointer border-solid border-border-primary 
                                            ${colIndex === 0 ? 'sticky left-0 z-10 bg-white' : ''}
                                            ${isScrolling && colIndex === 0 ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}`}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{
                                            // minWidth: colIndex === 0 ? '180px' : '150px',
                                            position: colIndex === 0 ? 'sticky' : 'relative',
                                            left: colIndex === 0 ? '0' : 'auto',
                                            zIndex: colIndex === 0 ? 10 : 'auto',
                                        }}
                                    >
                                        <div className={`py-3 ${colIndex === 0 ? 'pl-4 pr-6' : 'px-4'} flex h-full items-center gap-1 whitespace-nowrap`}>
                                            <Text
                                                ellipsis
                                                className={gradientClass}
                                                bold={theme.typography.bold.md}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </Text>
                                            {header.column.getCanSort() && (
                                                <span className="ml-1">
                                                    {header.column.getIsSorted() === 'asc' ? (
                                                        <FaSortUp size={13} color={theme.colors.main.primary} />
                                                    ) : header.column.getIsSorted() === 'desc' ? (
                                                        <FaSortDown size={13} color={theme.colors.main.primary} />
                                                    ) : (
                                                        <FaSort size={13} color={theme.colors.bg.quantinary} />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className={isLoading ? "opacity-50" : ""}>
                        {getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`${isLoading ? "cursor-wait" : "cursor-pointer"} ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""} group hover:bg-bg-secondary transition-colors duration-200`}
                                // onClick={() => router.push(`/claim-explorer/${row.original.batchId}`)}
                            >
                                {row.getVisibleCells().map((cell, colIndex) => (
                                    <td
                                        key={cell.id}
                                        className={`relative border-b border-solid border-border-primary py-3 group-hover:bg-bg-secondary transition-colors duration-200
                                            ${colIndex === 0 ? 'sticky left-0 z-[5]' : ''}
                                            ${isScrolling && colIndex === 0 ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                            ${index % 2 === 0 ? 'bg-bg-primary-lighter' : 'bg-white'}`}
                                        style={{
                                            // minWidth: colIndex === 0 ? '180px' : '150px',
                                            // maxWidth: colIndex === 0 ? '180px' : '200px',
                                            position: colIndex === 0 ? 'sticky' : 'relative',
                                            left: colIndex === 0 ? '0' : 'auto',
                                            zIndex: colIndex === 0 ? 5 : 'auto',
                                        }}
                                    >
                                        <div className={`${colIndex === 0 ? 'pl-4 pr-6' : 'px-4'} w-full flex h-full items-center whitespace-nowrap`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Right shadow when scrolled */}
            <div 
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,var(--shadow-opacity)) 100%)',
                    opacity: 'var(--show-right-shadow, 0)',
                    transition: 'opacity 0.2s ease',
                }}
            />
        </div>
    );
};

export default Table;