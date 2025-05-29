import { ReactNode } from "react"
import WebSocketComponent from "./components/web-socket"

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <>
            <WebSocketComponent />
            {children}
        </>
    )
}
export default Layout