import Text from "@styles/components/text"
import theme from "@styles/theme"

const Table = () => {
    const tableHeads = ["Code", "Description", "Quantity", "Date"]
    const tableBody = [
        ["AMLODITA1", "Amlodipine tablet 5mg", "40", "19th March 2024"],
        ["PARA500", "Paracetamol 500mg", "30", "20th March 2024"],
        ["IBUPR400", "Ibuprofen 400mg", "25", "18th March 2024"],
    ];
    
    
    return (
        <table>
            <thead>
                <tr>
                    { tableHeads.map((head, index)=> (
                        <th
                            key={index} 
                            className={`pl-4 py-[15px] text-left border-b-[1px] border-r-[1px] border-solid border-border-tetiary`}
                        >
                            <Text textColor={theme.colors.text.tetiary}>{head}</Text>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                { tableBody.map((body, bodyIndex)=> (
                    <tr key={bodyIndex}>
                        {
                            body.map((item, index) => (
                                <td
                                    key={index} 
                                    className={`pl-4 ${bodyIndex !== tableBody.length - 1 ? "border-b-[1px]" : ""} py-[15px] text-left border-r-[1px] border-solid border-border-tetiary`}
                                >
                                    <Text>{item}</Text>
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table