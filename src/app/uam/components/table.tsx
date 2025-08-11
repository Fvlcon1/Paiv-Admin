'use client'

import { useReactTable } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { data } from "./data";
import useUAMColumns from "../hooks/useUAMColumns";
import NoData from "@components/NoData/noData";
import { useEffect, useState, useRef } from "react";
import { useUAMContext } from "../context/context";
import TableSkeleton from "@components/loaders/table-skeleton";

const Table = () => {
    const { columns } = useUAMColumns();
    const [isScrolling, setIsScrolling] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(500);
    const {accountsData, accountsLoading, accountsIsFetching, metricsIsFetching} = useUAMContext()

    useEffect(() => {
        if (typeof window !== "undefined") {
            setContainerHeight(window.innerHeight - 300);
        }
    }, []);

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: accountsData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div className="relative w-full overflow-hidden">
                {accountsData?.length > 0 ? (
                    <div
                        ref={tableContainerRef}
                        className="w-full overflow-x-auto"
                        // onScroll={(e) => {
                        //     if (isScrolling) return;
                        //     setIsScrolling(true);
                        //     setTimeout(() => {
                        //         setIsScrolling(false);
                        //     }, 2000);
                        // }}
                    >
                        <table className="w-full min-w-[800px] border-separate border-spacing-0">
                            {/* Table Head */}
                            <thead className="px-2">
                                {getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header, colIndex) => (
                                            <th
                                                key={header.id}
                                                className={`text-left border-b-[1px] border-r-[1px] border-solid border-border-primary 
                                                    ${colIndex === 0 ? 'sticky left-0 bg-white' : ''}
                                                    ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                `}
                                            >
                                                <div className="py-[15px] px-[30px] flex h-full items-center">
                                                    <Text ellipsis textColor={theme.colors.text.tetiary} bold={theme.typography.bold.md}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </Text>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            {/* Table Body */}
                            {!accountsLoading && accountsData?.length > 0 && (
                                <tbody>
                                    {getRowModel().rows.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            className={`hover:bg-bg-secondary bg-white ${(accountsIsFetching || metricsIsFetching) ? "cursor-wait opacity-50" : "cursor-pointer"} duration-200 ${row.getVisibleCells().some((cell) => cell.getValue() === "Admin") ? "bg-bg-secondary" : ""}`}
                                        >
                                            {row.getVisibleCells().map((cell, colIndex) => (
                                                <td
                                                    key={cell.id}
                                                    className={`border-b-[1px] border-r-[1px] border-solid border-border-primary py-[10px] px-[30px] duration-1000
                                                        ${colIndex === 0 ? 'sticky left-0' : ''}
                                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                    `}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                ) : null}

                {/* Loader or No Data */}
                {accountsLoading ? (
                    <div className="w-full mt-2">
                        <TableSkeleton />
                    </div>
                ) : accountsData?.length === 0 ? (
                    <div
                        className="w-full justify-center flex items-center"
                        style={{ height: `${containerHeight}px` }}
                    >
                        <NoData />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
export default Table