import { ReactNode } from "react"
import { MFAContextProvider } from "./context/mfaContext"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <MFAContextProvider>
            {children}
        </MFAContextProvider>
    )
}
export default Layout