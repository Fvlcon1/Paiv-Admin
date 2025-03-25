import { ReactNode } from "react"
import { DashboardContextProvider } from "./context/context"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <>
            <DashboardContextProvider>
                {children}
            </DashboardContextProvider>
        </>
    )
}
export default Layout