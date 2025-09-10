import theme from "@styles/theme"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"

const Bottom = ({
    expectedPayout,
    totalPayout,
    actions
} : {
    expectedPayout?: number
    totalPayout? : number
    actions?: React.ReactNode
}) => {
    return (
        <div className="bg-bg-secondary border-solid border-t-[1px] justify-between border-bg-tetiary rounded-b-xl h-[55px] flex items-center pl-6">
            <div className="flex gap-6 items-center">   
                {
                    expectedPayout ? (
                        <Payout
                            title="Expected Payout:"
                            amount={expectedPayout}
                        />
                    ) : <></>
                }
                {
                    totalPayout ? (
                        <>
                            <Text textColor={theme.colors.text.tetiary}>
                                |
                            </Text>
                            <Payout
                                title="Total Payout:"
                                amount={totalPayout}
                            />
                        </>
                    ) : <></>
                }
            </div>
            <div className="flex gap-2 items-center h-full px-6">
                {actions}
            </div>
        </div>
    )
}
export default Bottom

const Payout = ({
    title,
    amount
} : {
    title: string
    amount?: number
}) => {
    return (
        <div className="flex gap-2 items-center">
            <Text
                textColor={theme.colors.text.tetiary}
            >
                {title}
            </Text>
            <Text
                bold={TypographyBold.md}
            >
                GHS {amount ?? 0}
            </Text>
        </div>
    )
}