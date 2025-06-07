import { IEncounterDetails } from "@/app/dashboard/approved/utils/types"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Images from "./components/images"
import getTableData from "./utils/get-table-data"
import DualTable from "./components/dual-table"

const EncounterDetails = ({
    encounterDetails
} : {
    encounterDetails : IEncounterDetails
}) => {
    const { data } = getTableData(encounterDetails)

    return (
        <div className="w-full flex flex-col gap-4">
            <Images
                encounterDetails={encounterDetails}
            />
            <div className="w-full border-solid border-[1px] border-bg-tetiary rounded-xl flex flex-col">
                <div className="flex w-full border-solid border-b-[1px] border-border-secondary bg-bg-secondary min-h-[45px] items-center pl-4 rounded-t-xl">
                    <Text
                        bold={theme.typography.bold.md}
                    >
                        Patient Details
                    </Text>
                </div>
                <DualTable
                    data={data}
                />
            </div>
        </div>
    )
}
export default EncounterDetails