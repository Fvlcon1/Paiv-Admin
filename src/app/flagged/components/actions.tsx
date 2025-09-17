import Button from "@components/button/button";
import OutlineButton from "@components/button/outlineButton";
import ConfirmationModal from "@components/confirmation-modal/confirmation-modal";
import { useEffect, useState } from "react";
import { FlaggedClaimTable } from "../utils/types";
import useActions from "../hooks/use-actions";
import { IClaimsDetailType } from "@/app/components/claimDetails/utils/types";
import { useFlaggedContext } from "../context/flagged-context";

const ReasonForDeclining = ({
    reasonForDeclining,
    setReasonForDeclining
}: {
    reasonForDeclining: string;
    setReasonForDeclining: (reason: string) => void;
}) => {

    return (
        <textarea
            placeholder="Enter the reason for declining the claim"
            value={reasonForDeclining}
            required
            minLength={10}
            onChange={(e) => setReasonForDeclining(e.target.value)}
            style={{
                fontFamily: "montserrat"
            }}
            autoFocus
            className="w-[400px] min-h-[100px] border border-border-secondary rounded-lg shadow-xs px-3 py-2 placeholder:text-[14px] placeholder:text-text-tetiary text-text-secondary md:text-[14px] text-[16px] focus:border-main-primary outline-none"
        />
    )
}

export const Actions = ({
    claimDetails,
    isClaimsDetailsVisible,
    setIsClaimsDetailsVisible
}: {
    claimDetails: IClaimsDetailType,
    isClaimsDetailsVisible: boolean,
    setIsClaimsDetailsVisible: (visible: boolean) => void
}) => {
    const [isDeclineReasonVisible, setIsDeclineReasonVisible] = useState(false);
    const [isApproveConfirmVisible, setIsApproveConfirmVisible] = useState(false);
    const {updateStatusMutation, updateStatusLoading, updateStatusError, updateStatusSuccess} = useActions();
    const [reasonForDeclining, setReasonForDeclining] = useState('');
    const {refetchFlaggedClaims} = useFlaggedContext()

    const handleDecline = async () => {
        await updateStatusMutation({encounterId: claimDetails.encounterToken, status: "rejected", reason: reasonForDeclining})
    }

    const handleApprove = async () => {
        await updateStatusMutation({encounterId: claimDetails.encounterToken, status: "approved", reason: ""})
    }

    useEffect(() => {
        if(updateStatusSuccess){
            refetchFlaggedClaims()
            setIsDeclineReasonVisible(false)
            setIsApproveConfirmVisible(false)
            setIsClaimsDetailsVisible(false)
        }
    }, [updateStatusSuccess])

    return (
        <>
            <ConfirmationModal
                isVisible={isDeclineReasonVisible}
                close={() => setIsDeclineReasonVisible(false)}
                onConfirm={async ()=> handleDecline()}
                title="Decline Reason"
                cta="Decline"
                loading={updateStatusLoading}
                children={<ReasonForDeclining reasonForDeclining={reasonForDeclining} setReasonForDeclining={setReasonForDeclining}/>}
            />
            <ConfirmationModal
                isVisible={isApproveConfirmVisible}
                close={() => setIsApproveConfirmVisible(false)}
                onConfirm={async () => handleApprove()}
                title="Approve"
                description="Are you sure you want to approve this claim?"
                cta="Approve"
                loading={updateStatusLoading}
            />
            <div className="flex items-center gap-2">
                <OutlineButton
                    text="Decline"
                    onClick={()=>setIsDeclineReasonVisible(true)}
                />
                <Button
                    text="Approve"
                    onClick={()=>setIsApproveConfirmVisible(true)}
                />
            </div>
        </>
    )
}