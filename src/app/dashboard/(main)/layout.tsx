import { ReactNode } from "react"
import WebSocketComponent from "../components/web-socket"
import { DashboardContextProvider } from "./context/context"

const Layout = ({
    children
}: {
    children: ReactNode
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