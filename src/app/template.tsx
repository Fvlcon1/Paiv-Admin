import Siderbar from "@/app/dashboard/components/sidebar/sidebar"
import { ReactNode } from "react"
import Topbar from "./dashboard/components/topbar/topbar"

const Template = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <>
            <Siderbar />
            <Topbar />
            <div className="ml-[250px] mt-[60px]">
                {children}
            </div>
        </>
    )
}
export default Template