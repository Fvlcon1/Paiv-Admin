import Text from "@styles/components/text"
import theme from "@styles/theme"

const Table = () => {
    const tableHeads = ["GRDG", "Description", "Diagnosis", "ICD-10"]
    const tableBody = [
        ["MEDI31A", "Localized infections >= 12", "Localized infections >= 12", "L03.9"],
        ["MEDI64D", "Chronic sinusitis", "Chronic maxillary sinusitis", "J32.0"],
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