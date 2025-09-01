import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"

const Reason = ({
    reasons
} : {
    reasons : string[]
}) => {
    return (
        <div className="w-full rounded-xl flex flex-col">
            <div className="flex w-full border-solid border-b-[1px] border-border-secondary bg-main-primary min-h-[45px] items-center pl-4 rounded-t-xl">
                <Text
                    bold={TypographyBold.md}
                    textColor={theme.colors.bg.primary}
                >
                    Comments
                </Text>
            </div>

            <div className="flex w-full flex-col gap-4 px-2 pb-4 pt-2 border-[1px] border-bg-quantinary border-t-[0] rounded-b-xl">
                {
                    Array.isArray((reasons)) ?
                    reasons.length ?
                    reasons.map((reason, index) => (
                        <div key={index} className="flex gap-2 w-full items-center">
                            <div className="rounded-full w-[25px] h-[25px] flex justify-center bg-bg-tetiary items-center">
                                <Text>{index + 1}</Text>
                            </div>
                            <Text>
                                {reason}
                            </Text>
                        </div>
                    ))
                    :
                    <Text textColor={theme.colors.text.tetiary} className="pl-2">No comments</Text>
                    :
                    <div className="flex gap-2 w-full items-center">
                        <div className="rounded-full w-[25px] h-[25px] flex justify-center bg-bg-tetiary items-center">
                            <Text>{1}</Text>
                        </div>
                        <Text>
                            {reasons}
                        </Text>
                    </div>
                }
            </div>
        </div>
    )
}
export default Reason