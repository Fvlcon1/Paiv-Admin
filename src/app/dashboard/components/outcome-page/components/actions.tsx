import Button from "@components/button/button"
import theme from "@styles/theme"
import { IActionsType } from "../utils/types"
import useApprove from "../hooks/useApprove"

const DeclineAction = ({
    onClick,
    loading
}: {
    onClick: () => void
    loading? : boolean
}) => {
    return (
        <Button
            text="Decline"
            className="!bg-[#fef6f6] !border-none"
            color={theme.colors.bg.primary}
            onClick={onClick}
            loadingColor={theme.colors.text.primary}
            loading={loading}
        />
    )
}

const ApproveAction = ({
    onClick,
    loading
}: {
    onClick: () => void
    loading? : boolean
}) => {
    return (
        <Button
            text="Approve"
            className="!bg-[#36ba69] !border-none"
            color={theme.colors.bg.primary}
            onClick={onClick}
            loading={loading}
            loadingColor={theme.colors.bg.primary}
        />
    )
}

const Actions = ({
    types,
    setIsReasonVisible,
    encounterToken
} : {
    types : IActionsType[]
    setIsReasonVisible : (value : boolean) => void
    encounterToken : string
}) => {
    const { handleApproveMutation, isApprovePending } = useApprove()

    return (
        <div className="h-full flex items-center">
            <div className="w-full flex justify-end gap-2 items-center h-full">
                {
                    types.map((type, index) => {
                        switch (type){
                            case "approve":
                                return (
                                    <ApproveAction 
                                        onClick={()=>handleApproveMutation({encounterToken})} 
                                        loading={isApprovePending}
                                        key={index}
                                    />
                                )
                            case "decline":
                                return (
                                    <DeclineAction 
                                        onClick={() => setIsReasonVisible(true)}
                                        key={index}
                                    />
                                )
                        }
                    })
                }
            </div>
        </div>
    )
}
export default Actions