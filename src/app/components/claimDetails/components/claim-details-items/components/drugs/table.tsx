import { IDrugsType } from "@/app/components/claimDetails/utils/types"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useEffect, useState } from "react"

const Table = ({
    drugs
} : {
    drugs : IDrugsType[]
}) => {
    const tableHeads = ["Code", "Description", "Dosage", "Quantity", "Tariff", "Total"]
    const [tableBody, setTableBody] = useState<string[][]>([])

    useEffect(()=>{
        setTableBody(drugs.map((item) => [item.code, (item as any).generic_name, item.dosage, item.quantity?.toString(), `GHS ${item.tariff?.toString()}`, `GHS ${item.total?.toString()}`]))
    },[drugs])
    
    return (
        <table>
            <thead>
                <tr>
                    { tableHeads.map((head, index)=> (
                        <th
                            key={index} 
                            className={`pl-4 py-[15px] text-left ${tableBody.length > 0 ? "border-b-[1px]" : ""} ${index !== tableHeads.length - 1 ? "border-r-[1px]" : ""} border-solid border-bg-tetiary`}
                        >
                            <Text bold={theme.typography.bold.md} textColor={theme.colors.main.primary}>{head}</Text>
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