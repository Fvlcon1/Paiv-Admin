import { flexRender, useReactTable } from "@tanstack/react-table";
import useColumns from "../hooks/use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TableBody = ({
    data
}: {
    data: any[]
}) => {
    const { columns } = useColumns()
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });
    return (
        <div>
            <table className="w-full min-w-[800px] border-separate border-spacing-0">
                <tbody className={`${isLoading ? "opacity-50" : ""}`}>
                    {getRowModel().rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${isLoading ? "cursor-wait" : "cursor-pointer"} ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""} group hover:bg-bg-secondary duration-500`}
                            onClick={() => router.push(`/claim-explorer/${row.original.providerName}`)}
                        >
                            {row.getVisibleCells().map((cell, colIndex) => (
                                <td
                                    key={cell.id}
                                    className={`border-b-[1px] border-solid border-border-primary py-2.5 duration-500 group-hover:bg-bg-secondary
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
            </table>
        </div>
    )
}
export default TableBody