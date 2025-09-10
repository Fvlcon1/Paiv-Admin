import { flexRender, useReactTable } from "@tanstack/react-table";
import useColumns from "./use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text";
import { useState, useMemo } from "react";
import theme from "@styles/theme";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { gradientClass } from "@/utils/constants";
import { useRouter } from "next/navigation";
import useClaims from "./hooks/use-claims";
import { transformClaimsToTable } from "./utils/transform-claims";
import TableSkeleton from "@components/loaders/table-skeleton-v2";
import NoData from "@components/NoData/noData";

const Table = () => {
    const { columns } = useColumns()
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { claims, claimsLoading, claimsError } = useClaims()

    const claimsTable = useMemo(() => {
        return transformClaimsToTable(claims || []);
    }, [claims]);

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: claimsTable,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });

    const NoDataLocal = () => (
        <tbody>
            <tr>
                <td
                    colSpan={columns.length}
                    className="h-[400px] w-full" // Adjust height as needed
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <NoData />
                    </div>
                </td>
            </tr>
        </tbody>
    )

    if(claimsLoading) return (
        <TableSkeleton
            rows={20}
            columns={columns.length}
        />
    )

    return (
        <div className="px-4">
            <table className="w-full min-w-[800px] border-separate border-spacing-0">
                {/* Table Head */}
                <thead className="">
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, colIndex) => (
                                <th
                                    key={header.id}
                                    className={`text-left border-b-[1px] cursor-pointer border-solid border-border-primary 
                                        ${colIndex === 0 ? 'sticky left-0 bg-white max-w-[50px]' : ''}
                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}`
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{
                                        minWidth: colIndex === 0 ? '150px' : '150px',
                                        maxWidth: colIndex === 0 ? '150px' : '150px',
                                    }}
                                >
                                    <div className={`py-[15px] ${colIndex === 0 ? 'px-[10px]' : 'px-[30px]'} flex h-full items-center gap-1`}>
                                        <Text
                                            ellipsis
                                            className={gradientClass}
                                            bold={theme.typography.bold.md}
                                        >
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </Text>
                                        {
                                            // colIndex !== 0 && (
                                            //     {
                                            //         asc: <FaSortUp size={13} color={theme.colors.main.primary} />,
                                            //         desc: <FaSortDown size={13} color={theme.colors.main.primary} />,
                                            //     }[header.column.getIsSorted() as string]
                                            //     ??
                                            //     <FaSort size={13} color={theme.colors.bg.quantinary} />
                                            // )
                                        }
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {
                    claims?.length === 0 ? (
                        <NoDataLocal />
                    ) : (
                        <tbody className={`${isLoading ? "opacity-50" : ""}`}>
                            {getRowModel().rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`${isLoading ? "cursor-wait" : "cursor-pointer"} ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""} group hover:bg-bg-secondary duration-500`}
                                // onClick={() => router.push(`/claim-explorer/${formattedHospitalName}/${row.original.batchId}`)}
                                >
                                    {row.getVisibleCells().map((cell, colIndex) => (
                                        <td
                                            key={cell.id}
                                            className={`border-b-[1px] border-solid border-border-primary py-4 duration-500 group-hover:bg-bg-secondary
                                                ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""}

                                                ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                            `}
                                            style={{
                                                minWidth: colIndex === 0 ? '150px' : '150px',
                                                maxWidth: colIndex === 0 ? '150px' : '150px',
                                            }}
                                        >
                                            <div className={`${colIndex === 0 ? 'px-[10px]' : 'px-[30px]'} w-full flex h-full items-center gap-1`}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    )
}
export default Table