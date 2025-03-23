'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./data";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { TypographyBold } from "@styles/style.types";
import NoData from "@components/NoData/noData";

const Table = ({
    data,
    isLoading,
}: {
    data: any;
    isLoading: boolean;
}) => {
    const { getHeaderGroups, getRowModel } = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <table className="w-full min-w-[800px] border-separate border-spacing-0">
                {/* Table Head */}
                <thead className="px-2">
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-left border-b-[1px] border-r-[1px] border-solid border-border-primary"
                                >
                                    <div className="py-[15px] mt-[-5px] pl-[30px]">
                                        <Text textColor={theme.colors.text.tetiary} bold={TypographyBold.md}>
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
                {!isLoading && data.length ? (
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-b-[1px] border-r-[1px] border-solid border-border-primary py-[10px] pl-[30px]"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                ) : null}
            </table>

            {/* Loader or No Data */}
            {isLoading ? (
                <div className="h-[100px] flex items-center">
                    <div className="normal-loader"></div>
                </div>
            ) : !data.length ? (
                <NoData />
            ) : null}
        </>
    );
};

export default Table;
