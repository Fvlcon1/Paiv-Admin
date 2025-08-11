import { ReactNode } from "react"
import { ApprovedContextProvider } from "./context/context"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <>
            <ApprovedContextProvider>
                {children}
            </ApprovedContextProvider>
        </>
    )
}
export default Layout