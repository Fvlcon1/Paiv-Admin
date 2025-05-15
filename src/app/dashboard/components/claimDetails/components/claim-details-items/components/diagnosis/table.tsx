import { IDiagonosisType } from "@/app/dashboard/utils/types"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useEffect, useState } from "react"

const Table = ({
    diagnosis
} : {
    diagnosis : IDiagonosisType[]
}) => {
    const tableHeads = ["GRDG", "Description", "Diagnosis", "ICD-10"]
    const [tableBody, setTableBody] = useState<string[][]>([])

    useEffect(()=>{
        setTableBody(diagnosis.map((item) => [item.GRDG, item.description, item.diagnosis, item.ICD10]))
    },[])
    
    return (
        <table>
            <thead>
                <tr>
                    { tableHeads.map((head, index)=> (
                        <th
                            key={index} 
                            className={`pl-4 py-[15px] text-left ${tableBody.length > 0 ? "border-b-[1px]" : ""} ${index !== tableHeads.length - 1 ? "border-r-[1px]" : ""} border-solid border-bg-tetiary`}
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
                                    className={`pl-4 ${bodyIndex !== tableBody.length - 1 ? "border-b-[1px]" : ""} py-[15px] text-left ${index !== body.length - 1 ? "border-r-[1px]" : ""} border-solid border-bg-tetiary`}
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