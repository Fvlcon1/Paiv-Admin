import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"

const DualTable = ({
    data
}: {
    data: any[]
}) => {
    return (
        <div className="w-full max-w-[800px] flex flex-col gap-2">
            <table className="w-full">
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr className={`${index % 2 === 0 ? 'bg-bg-secondary' : ''}`} key={index}>
                                <td className={`pl-[20px] py-[10px] rounded-l-lg`}>
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
                                <td className="rounded-r-lg">
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