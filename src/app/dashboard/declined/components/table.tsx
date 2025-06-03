'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { TypographyBold } from "@styles/style.types";
import NoData from "@components/NoData/noData";
import { useApprovedContext } from "../context/context";
import { useState, useEffect, useRef } from "react";
import { IClaimsDetailType } from "../../utils/types";
import ClaimDetails from "../../components/claimDetails/claimDetails";
import Button from "@components/button/button";
import useApprove from "../hooks/useApprove";
import useClaimsTable from "../../hooks/useClaimsTable";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const Table = () => {
    const { setShowClaimDetail, tableData, showClaimDetail, isApprovedClaimsPending: isLoading, sorting, setSorting, getApprovedClaimsMutation, isAllClaimsSelected, handleSelectAllClaims, handleUnselectAllClaims } = useApprovedContext();
    const { columns } = useClaimsTable({
        isAllClaimsSelected,
        handleSelectAllClaims,
        handleUnselectAllClaims
    });
    const { handleApproveMutation, isApprovePending, approveError, approveSuccess } = useApprove()
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType | null>(null);
    const [containerHeight, setContainerHeight] = useState(500)
    const [isReasonVisible, setIsReasonVisible] = useState(false)
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
        manualSorting: true,
        onSortingChange: setSorting,
        state: {
            sorting
        },
    });

    const handleRowClick = (index: number) => {
        setClaimDetails(tableData[index].details);
        setShowClaimDetail(true);
    };

    const onApproveSuccess = () => {
        getApprovedClaimsMutation()
        setShowClaimDetail(false)
    }

    useEffect(() => {
        if (approveSuccess) {
            onApproveSuccess()
        }
    }, [approveSuccess])

    {/* Actions */ }
    const actions = (
        <div className="h-full flex items-center">
            <div className="w-full flex justify-end gap-2 items-center h-full">
                <Button
                    text="Approve"
                    className="!bg-[#36ba69] !border-none"
                    color={theme.colors.bg.primary}
                    onClick={() => handleApproveMutation({ encounterToken: claimDetails?.encounterToken! })}
                    loading={isApprovePending}
                    loadingColor={theme.colors.bg.primary}
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
                    </>
                )
            }

            {tableData.length ? (
                <div className="relative w-full overflow-hidden">
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
                                                className={`text-left border-b-[1px] cursor-pointer border-r-[1px] border-solid border-border-primary 
                                                        ${colIndex === 0 ? 'sticky left-0 bg-white max-w-[50px]' : ''}
                                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}`
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                style={{
                                                    minWidth: colIndex === 0 ? '50px' : '150px',
                                                }}
                                            >
                                                <div className={`py-[15px] ${colIndex === 0 ? 'justify-center' : 'px-[30px]'} flex h-full items-center gap-1`}>
                                                    <Text
                                                        ellipsis
                                                        textColor={header.column.getIsSorted() ? theme.colors.main.primary : theme.colors.text.tetiary}
                                                        bold={TypographyBold.md}
                                                    >
                                                        {
                                                            header.isPlaceholder
                                                                ? null
                                                                : flexRender(header.column.columnDef.header, header.getContext())
                                                        }
                                                    </Text>
                                                    {
                                                        colIndex !== 0 && (
                                                            {
                                                                asc: <FaSortUp size={13} color={theme.colors.main.primary} />,
                                                                desc: <FaSortDown size={13} color={theme.colors.main.primary} />,
                                                            }[header.column.getIsSorted() as string]
                                                            ??
                                                            <FaSort size={13} color={theme.colors.bg.quantinary} />
                                                        )
                                                    }
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            {/* Table Body */}
                            <tbody className={isLoading ? "opacity-50" : ""}>
                                {getRowModel().rows.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className={`${isLoading ? "cursor-wait" : "cursor-pointer"} hover:bg-bg-secondary duration-200`}
                                        onClick={() => !isLoading && handleRowClick(index)}
                                    >
                                        {row.getVisibleCells().map((cell, colIndex) => (
                                            <td
                                                key={cell.id}
                                                className={`border-b-[1px] border-r-[1px] border-solid border-border-primary py-[15px] duration-1000
                                                        ${colIndex === 0 ? 'sticky left-0 z-10 bg-white max-w-[50px] px-0' : ''}
                                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                    `}
                                                style={{
                                                    minWidth: colIndex === 0 ? '50px' : '150px',
                                                }}
                                            >
                                                <div className={`${colIndex === 0 ? 'justify-center' : 'px-[30px]'} w-full flex h-full items-center`}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}

            {/* Loader or No Data */}
            {
                isLoading ? (
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
                ) : null
            }
        </>
    );
};

export default Table;
