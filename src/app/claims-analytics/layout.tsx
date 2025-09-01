import { ReactNode } from "react"
import { AnalyticsContextProvider } from "./context/context"

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <>
            {/* <Topbar /> */}
            <AnalyticsContextProvider>
                <div className="mt-[60px] bg-[#F2F2F2]">
                    {children}
                </div>
            </AnalyticsContextProvider>
        </>
    )
}
export default Layout