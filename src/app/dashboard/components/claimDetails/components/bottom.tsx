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
        <div className="bg-bg-tetiary border-solid border-t-[1px] justify-between border-border-secondary rounded-b-[20px] h-[55px] flex items-center pl-6">
            <ExpectedPayout expectedPayout={expectedPayout}/>
            <div className="flex gap-2 items-center h-full px-6">
                {actions}
            </div>
        </div>
    )
}
export default Bottom

const ExpectedPayout = ({
    expectedPayout,
    totalPayout
} : {
    expectedPayout?: number
    totalPayout? : number
}) => {
    return (
        <div className="flex gap-2 items-center">
            <Text
                textColor={theme.colors.text.tetiary}
            >
                {totalPayout ? "Total Payou:t" : 'Expected Payout:'}
            </Text>
            <Text
                bold={TypographyBold.md2}
            >
                GHS {totalPayout ??expectedPayout ?? 0}
            </Text>
        </div>
    )
}