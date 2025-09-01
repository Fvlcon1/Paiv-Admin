'use client'

import { useState, useEffect, useRef } from "react";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import { AnimatePresence } from "framer-motion";
import { IClaimsDetailType } from "@/app/dashboard/utils/types";
import ClaimDetailsItems from "./components/claim-details-items";
import Bottom from "./components/bottom";
import theme from "@styles/theme";
import ClickableTab from "@components/clickable/clickabletab";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "@components/button/button";
import { FaFileExport } from "react-icons/fa6";
import usePdfExport from "./hooks/usePdfExport";

const ClaimDetails = ({
    claimDetails,
    isVisible,
    close,
    actions
}: {
    claimDetails: IClaimsDetailType
    isVisible: boolean
    close: () => void
    actions?: React.ReactNode
}) => {
    const [maxHeight, setMaxHeight] = useState<number | null>(null);
    const {generatePdf, isGenerating, error} = usePdfExport()
    const claimDetailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            setMaxHeight(window.innerHeight - 200);
        };

        updateHeight(); // Set initial height
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <Overlay
                    onClick={() => close()}
                    className="!px-6"
                >
                    <Container
                        isVisible={isVisible}
                        close={() => close()}
                        closable={false}
                        className={``}
                    >
                        <div
                            className="md:w-[800px] w-full flex flex-col"
                        >
                            <div className="bg-bg-tetiary border-solid border-b-[1px] border-bg-tetiary rounded-t-[20px] h-[55px] flex justify-between items-center pl-6 pr-4">
                                <Text bold={TypographyBold.md}>
                                    Claim Details
                                </Text>
                                <div className="flex items-center gap-2">
                                    <Button
                                        text="Export"
                                        type="button"
                                        icon={(
                                            <FaFileExport size={14}/>
                                        )}
                                        loading={isGenerating}
                                        onClick={() => generatePdf({
                                            refObject: claimDetailsRef as any,
                                            fileName: 'claim-details.pdf',
                                        })}
                                    />
                                    <ClickableTab className="!rounded-full hover:!bg-bg-tetiary" onClick={close}>
                                        <IoMdCloseCircle color={theme.colors.text.secondary} />
                                    </ClickableTab>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <ClaimDetailsItems
                                maxHeight={maxHeight}
                                claimDetails={claimDetails}
                                ref={claimDetailsRef}
                            />

                            {/* Bottom */}
                            <Bottom
                                expectedPayout={claimDetails.expectedPayout}
                                totalPayout={claimDetails.totalPayout}
                                actions={actions}
                            />
                        </div>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default ClaimDetails;
