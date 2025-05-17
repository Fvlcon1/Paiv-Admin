import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Table from "./table"
import { IDiagonosisType } from "@/app/dashboard/utils/types"

const Diagnosis = ({
    diagnosis
} : {
    diagnosis : IDiagonosisType[]
}) => {
    return (
        <div className="w-full border-solid border-[1px] border-bg-tetiary rounded-xl flex flex-col">
            <div className="flex w-full border-solid border-b-[1px] border-bg-tetiary bg-bg-secondary min-h-[55px] items-center pl-4 rounded-t-xl">
                <Text
                    bold={TypographyBold.md}
                >
                    Diagnosis
                </Text>
            </div>

            <div className="flex w-full flex-col">
                <Table diagnosis={diagnosis} />
            </div>
        </div>
    )
}
export default Diagnosis