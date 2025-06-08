import { IClaimsDetailType } from "@/app/dashboard/utils/types"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import DualTable from "../encounter-details/components/dual-table"
import getOtherDetails from "./utils/get-other-details"

const OtherDetails = ({
    claimDetails
}: {
    claimDetails: IClaimsDetailType
}) => {
    const { data } = getOtherDetails(claimDetails)

    return (
        <div className="w-full border-solid border-[1px] border-bg-tetiary rounded-xl flex flex-col">
            <div className="flex w-full border-solid border-b-[1px] border-border-secondary bg-bg-secondary min-h-[45px] items-center pl-4 rounded-t-xl">
                <Text
                    bold={theme.typography.bold.md}
                >
                    Other Details
                </Text>
            </div>
            <DualTable
                data={data}
            />
        </div>
    )
}
export default OtherDetails