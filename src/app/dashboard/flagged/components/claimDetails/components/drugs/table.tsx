import { IDrugsType } from "@/app/dashboard/approved/utils/types"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState, useEffect } from "react"

const Table = ({
    drugs
} : {
    drugs : IDrugsType[]
}) => {
    const tableHeads = ["Code", "Description", "Quantity", "Date"]
    const [tableBody, setTableBody] = useState<string[][]>([])

    useEffect(()=>{
        setTableBody(drugs.map((item) => [item.code, item.description, item.quantity.toString(), item.date.toDateString()]))
    },[])
    
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