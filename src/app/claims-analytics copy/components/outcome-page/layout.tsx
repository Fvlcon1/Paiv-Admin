import { ReactNode } from "react"
import { ApprovedContextProvider } from "./context/context"
import { IActionsType } from "./utils/types"
import OutcomePage from "./outcome-page"

const OutcomePageLayout = ({
    endpoint,
    actionsTypes
}: {
    endpoint: string,
    actionsTypes?: IActionsType[]
}) => {
    return (
        <>
            <ApprovedContextProvider>
                <OutcomePage
                    endpoint={endpoint}
                    actionsTypes={actionsTypes}
                />
            </ApprovedContextProvider>
        </>
    )
}
export default OutcomePageLayout