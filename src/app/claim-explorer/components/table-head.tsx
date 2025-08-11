import { flexRender, useReactTable } from "@tanstack/react-table";
import useColumns from "../hooks/use-columns";
import { getCoreRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text";
import { useState } from "react";
import theme from "@styles/theme";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { gradientClass } from "@/utils/constants";

const TableHead = () => {
    const { columns } = useColumns()
    const [isScrolling, setIsScrolling] = useState(false);
    const { getHeaderGroups, getRowModel } = useReactTable({
        data: [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });
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
                                    <div className={`py-[15px] ${colIndex === 0 ? 'px-1' : 'px-[30px]'} flex h-full items-center gap-1`}>
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
            </table>
        </div>
    )
}
export default TableHead