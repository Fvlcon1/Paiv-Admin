import { IClaimsDetailType } from "@/app/components/claimDetails/utils/types"
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
        <div className="w-full border-solid border-[1px] border-main-tetiary rounded-xl flex flex-col  h-[300px]">
            <div className="flex w-full border-solid border-b-[1px] border-main-tetiary bg-main-primary min-h-[45px] items-center pl-4 rounded-t-[10px]">
                <Text
                    bold={theme.typography.bold.md}
                    textColor={theme.colors.bg.primary}
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