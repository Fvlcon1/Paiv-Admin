import { ReactNode } from "react"
import WebSocketComponent from "./components/web-socket"
import Siderbar from "./components/sidebar/sidebar"
import Topbar from "./components/topbar/topbar"

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <>
            <Siderbar />
            <Topbar />
            <WebSocketComponent />
            <div className="ml-[250px] mt-[60px]">
                {children}
            </div>
        </>
    )
}
export default Layout