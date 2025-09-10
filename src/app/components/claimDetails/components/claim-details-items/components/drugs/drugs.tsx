import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import Table from "./table"
import { IDrugsType } from "@/app/components/claimDetails/utils/types"
import theme from "@styles/theme"

const Drugs = ({
    drugs
} : {
    drugs : IDrugsType[]
}) => {
    return (
        <div className="w-full border-solid border-[1px] border-main-primary rounded-xl flex flex-col overflow-hidden">
            <div className="flex w-full border-solid border-b-[1px] border-main-primary bg-main-primary min-h-[45px] items-center pl-4">
                <Text
                    bold={TypographyBold.md}
                    textColor={theme.colors.bg.primary}
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