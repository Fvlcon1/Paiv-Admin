import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Table from "./table"
import { IDrugsType } from "@/app/dashboard/utils/types"

const Drugs = ({
    drugs
} : {
    drugs : IDrugsType[]
}) => {
    return (
        <div className="w-full border-solid border-[1px] border-bg-tetiary rounded-xl flex flex-col">
            <div className="flex w-full border-solid border-b-[1px] border-bg-tetiary bg-bg-secondary min-h-[55px] items-center pl-4 rounded-t-xl">
                <Text
                    bold={TypographyBold.md}
                >
                    Drugs
                </Text>
            </div>

            <div className="flex w-full flex-col">
                <Table drugs={drugs} />
            </div>
        </div>
    )
}
export default Drugs