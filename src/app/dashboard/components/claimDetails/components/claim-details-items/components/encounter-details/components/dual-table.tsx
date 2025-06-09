import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"

const DualTable = ({
    data
}: {
    data: any[]
}) => {
    return (
        <div className="w-full max-w-[800px] border-solid border-[1px] border-bg-quantinary border-t-[0] rounded-b-xl flex flex-col gap-2">
            <table className="w-full">
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr
                                className={`
                                    ${index % 2 === 0 ? 'border-y-[1px] border-border-secondary' : ''}
                                    ${index === data.length - 1 ? 'border-b-[0]' : ''}
                                `}
                                key={index}
                            >
                                <td className={`pl-[20px] py-[10px]`}>
                                    {
                                        typeof item[0] === 'string' ?
                                            <Text
                                                textColor={theme.colors.text.tetiary}
                                                bold={TypographyBold.md}
                                            >
                                                {item[0]}
                                            </Text>
                                            :
                                            item[0]
                                    }
                                </td>
                                <td className="">
                                    <div className="flex gap-6 items-center">
                                        {
                                            typeof item[1] === 'string' ?
                                                <Text>
                                                    {item[1]}
                                                </Text>
                                                :
                                                item[1]
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default DualTable