import { ReactNode } from "react"
import { DashboardContextProvider } from "./context/context"
import WebSocketComponent from "./components/web-socket"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <>
            <DashboardContextProvider>
                <WebSocketComponent />
                {children}
            </DashboardContextProvider>
        </>
    )
}
export default Layout