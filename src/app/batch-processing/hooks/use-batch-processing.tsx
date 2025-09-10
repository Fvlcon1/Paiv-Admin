import useWebSocket from "@/app/hooks/use-websocket"
import { transformBatchProcessingList } from "../utils/transform-socket-batches"
import { useState } from "react"
import { BatchProcessingData } from "../utils/types"

const useBatchProcessing = () => {
    const [tableData, setTableData] = useState<BatchProcessingData[]>([])
    const {addMessageHandler} = useWebSocket({
        url: process.env.NEXT_PUBLIC_STATUS_SOCKET_URL!,
    })

    const allBatchesHandler = (event : any) => {
        const eventData = JSON.parse(event.data)
        if(eventData.type === "all_batches_update"){
            const data = transformBatchProcessingList(eventData.data)
            setTableData(data)
        }
    }

    addMessageHandler(allBatchesHandler)

    return {
        tableData
    }
}
export default useBatchProcessing