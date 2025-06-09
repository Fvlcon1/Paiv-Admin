import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Table from "./table"
import { IDiagonosisType } from "@/app/dashboard/utils/types"
import theme from "@styles/theme"

const Diagnosis = ({
    diagnosis
} : {
    diagnosis : IDiagonosisType[]
}) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full border-solid border-b-[1px] border-border-secondary bg-main-primary min-h-[45px] items-center pl-4 rounded-t-xl">
                <Text
                    bold={TypographyBold.md}
                    textColor={theme.colors.bg.primary}
                >
                    Diagnosis
                </Text>
            </div>

            <div className="flex w-full flex-col border-[1px] border-bg-quantinary border-t-[0] rounded-b-xl">
                <Table diagnosis={diagnosis} />
            </div>
        </div>
    )
}
export default Diagnosis