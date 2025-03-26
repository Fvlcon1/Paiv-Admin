import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"

const Reason = ({
    reasons
} : {
    reasons : string[]
}) => {
    return (
        <div className="w-full border-solid border-[1px] border-border-tetiary rounded-xl bg-bg-tetiary flex flex-col gap-2">
            <div className="flex w-full border-solid border-b-[1px] border-border-tetiary h-[55px] items-center pl-4">
                <Text
                    bold={TypographyBold.md}
                >
                    Reasons for flagging
                </Text>
            </div>

            <div className="flex w-full flex-col gap-4 px-2 pb-4 pt-2">
                {
                    reasons.map((reason, index) => (
                        <div key={index} className="flex gap-2 w-full">
                            <div className="bg-bg-quantinary rounded-full w-[25px] h-[25px] flex justify-center items-center">
                                <Text>{index}</Text>
                            </div>
                            <Text>
                                {reason}
                            </Text>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Reason