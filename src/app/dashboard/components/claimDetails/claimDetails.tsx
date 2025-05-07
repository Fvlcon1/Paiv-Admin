'use client'

import { useState, useEffect } from "react";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import { AnimatePresence } from "framer-motion";
import { IClaimsDetailType } from "@/app/dashboard/utils/types";
import ClaimDetailsItems from "./components/claim-details-items";
import Bottom from "./components/bottom";

const ClaimDetails = ({
    claimDetails,
    isVisible,
    close
} : {
    claimDetails: IClaimsDetailType
    isVisible: boolean
    close: () => void
}) => {
    const [maxHeight, setMaxHeight] = useState<number | null>(null);

    useEffect(() => {
        const updateHeight = () => {
            setMaxHeight(window.innerHeight - 300);
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
                        className={``}
                    >
                        <div
                            className="md:w-[800px] w-full flex flex-col"
                        >
                            <div className="bg-[#1F1F28] border-solid border-b-[1px] border-border-secondary rounded-t-[20px] h-[55px] flex items-center pl-6">
                                <Text bold={TypographyBold.md}>
                                    Claim Details
                                </Text>
                            </div>

                            {/* Scrollable Content */}
                            <ClaimDetailsItems
                                maxHeight={maxHeight}
                                claimDetails={claimDetails}
                            />

                            {/* Bottom */}
                            <Bottom
                                expectedPayout={claimDetails.expectedPayout}
                                totalPayout={claimDetails.totalPayout}
                            />
                        </div>
                    </Container>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default ClaimDetails;
