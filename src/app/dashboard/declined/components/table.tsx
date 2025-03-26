'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { TypographyBold } from "@styles/style.types";
import NoData from "@components/NoData/noData";
import { useApprovedContext } from "../context/context";
import useApprovedClaims from "../hooks/useClaims";
import useClaimsTable from "../hooks/useClaimsTable";
import ClaimDetails from "./claimDetails/claimDetails";
import { useState } from "react";
import { IClaimsDetailType } from "../utils/types";

const Table = ({

}: {

}) => {
    const {setShowClaimDetail} = useApprovedContext()
    const {tableData, isApprovedClaimsPending : isLoading} = useApprovedContext()
    const {columns} = useClaimsTable()
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType>()

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (index:number) => {
        setClaimDetails(tableData[index].details)
        setShowClaimDetail(true)
    }

    return (
        <>
            {
                claimDetails ?
                <ClaimDetails claimDetails={claimDetails} /> : <></>
            }
            {
                tableData.length && !isLoading &&
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
                    {!isLoading && tableData.length ? (
                        <tbody>
                            {getRowModel().rows.map((row, index) => (
                                <tr 
                                    key={row.id} className="hover:bg-bg-secondary cursor-pointer duration-200"
                                    onClick={()=>handleRowClick(index)}
                                >
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
            }

            {/* Loader or No Data */}
            {isLoading ? (
                <div 
                    className={`w-full justify-center flex items-center`}
                    style={{
                        height : `${window.innerHeight - 300}px`
                    }}
                >
                    <div className="normal-loader"></div>
                </div>
            ) : !tableData.length ? (
                <div 
                    className={`w-full justify-center flex items-center`}
                    style={{
                        height : `${window.innerHeight - 300}px`
                    }}
                >
                    <NoData />
                </div>
            ) : null}
        </>
    );
};

export default Table;
