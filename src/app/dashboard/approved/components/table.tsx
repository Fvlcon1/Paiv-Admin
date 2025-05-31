'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { TypographyBold } from "@styles/style.types";
import NoData from "@components/NoData/noData";
import { useApprovedContext } from "../context/context";
import useApprovedClaims from "../hooks/useClaims";
import useClaimsTable from "../hooks/useClaimsTable";
import { useState, useEffect, useRef } from "react";
import { IClaimsDetailType } from "../../utils/types";
import ClaimDetails from "../../components/claimDetails/claimDetails";
import Button from "@components/button/button";
import ReasonForDeclining from '@/app/dashboard/components/reason/reason';
import useReasonForDeclining from "../hooks/useReason";

const Table = () => {
    const { setShowClaimDetail, showClaimDetail, tableData, isApprovedClaimsPending: isLoading, getApprovedClaimsMutation } = useApprovedContext();
    const { columns } = useClaimsTable();
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType | null>(null);
    const [containerHeight, setContainerHeight] = useState(500)
    const [isReasonVisible, setIsReasonVisible] = useState(false)
    const { handleReasonForDecliningMutation, isReasonForDecliningPending, reasonForDecliningError, reasonForDecliningSuccess } = useReasonForDeclining()
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setContainerHeight(window.innerHeight - 300);
        }
    }, []);

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (index: number) => {
        setClaimDetails(tableData[index].details);
        setShowClaimDetail(true);
    };

    const onDeclineSuccess = () => {
        getApprovedClaimsMutation()
        setShowClaimDetail(false)
    }

    useEffect(() => {
        if (reasonForDecliningSuccess) {
            onDeclineSuccess()
        }
    }, [reasonForDecliningSuccess])

    {/* Actions */ }
    const actions = (
        <div className="h-hull flex items-center">
            <div className="w-full flex justify-end gap-2 items-center h-full">
                <Button
                    text="Decline"
                    className="!bg-[#db4138] !border-none"
                    color={theme.colors.bg.primary}
                    onClick={() => setIsReasonVisible(true)}
                    loadingColor={theme.colors.text.primary}
                />
            </div>
        </div>
    )

    return (
        <>
            {
                claimDetails && (
                    <>
                        <ClaimDetails
                            claimDetails={claimDetails}
                            isVisible={showClaimDetail}
                            close={() => setShowClaimDetail(false)}
                            actions={actions}
                        />

                        <ReasonForDeclining
                            isVisible={isReasonVisible}
                            close={() => setIsReasonVisible(false)}
                            handleSubmit={(value) => handleReasonForDecliningMutation({
                                encounterToken: claimDetails?.encounterToken,
                                reason: value,
                            })}
                            isLoading={isReasonForDecliningPending}
                            error={reasonForDecliningError}
                            success={reasonForDecliningSuccess}
                        />
                    </>
                )
            }

            {tableData.length > 0 && !isLoading ? (
                <div className="relative w-full overflow-hidden">
                    {tableData.length > 0 && !isLoading ? (
                        <div
                            ref={tableContainerRef}
                            className="w-full overflow-x-auto h-[calc(100vh-100px)]"
                            onScroll={(e) => {
                                if (isScrolling) return;
                                setIsScrolling(true);
                                setTimeout(() => {
                                    setIsScrolling(false);
                                }, 2000);
                            }}
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
                                                    style={{
                                                        minWidth: colIndex === 0 ? '50px' : '150px',
                                                    }}
                                                >
                                                    <div className="py-[15px] mt-[-5px] px-[30px]">
                                                        <Text ellipsis textColor={theme.colors.text.tetiary} bold={TypographyBold.md}>
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
                                {!isLoading && tableData.length > 0 && (
                                    <tbody>
                                        {getRowModel().rows.map((row, index) => (
                                            <tr
                                                key={row.id}
                                                className="hover:bg-bg-secondary cursor-pointer duration-200"
                                                onClick={() => handleRowClick(index)}
                                            >
                                                {row.getVisibleCells().map((cell, colIndex) => (
                                                    <td
                                                        key={cell.id}
                                                        className={`border-b-[1px] border-r-[1px] border-solid border-border-primary py-[10px] px-[30px] duration-1000
                                                        ${colIndex === 0 ? 'sticky left-0 z-10 bg-white' : ''}
                                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                    `}
                                                        style={{
                                                            minWidth: colIndex === 0 ? '50px' : '150px',
                                                        }}
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
                    {isLoading ? (
                        <div
                            className="w-full justify-center flex items-center"
                            style={{ height: `${containerHeight}px` }}
                        >
                            <div className="normal-loader"></div>
                        </div>
                    ) : tableData.length === 0 ? (
                        <div
                            className="w-full justify-center flex items-center"
                            style={{ height: `${containerHeight}px` }}
                        >
                            <NoData />
                        </div>
                    ) : null}
                </div>
            ) : null}

            {/* Loader or No Data */}
            {isLoading ? (
                <div
                    className="w-full justify-center flex items-center"
                    style={{ height: `${containerHeight}px` }}
                >
                    <div className="normal-loader"></div>
                </div>
            ) : tableData.length === 0 ? (
                <div
                    className="w-full justify-center flex items-center"
                    style={{ height: `${containerHeight}px` }}
                >
                    <NoData />
                </div>
            ) : null}
        </>
    );
};

export default Table;
