import { AnomalyProvider } from "./context/anomaly-context";
import { AdminsContextProvider } from "./context/admins-context";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <AnomalyProvider>
            <AdminsContextProvider>
                {children}
            </AdminsContextProvider>
        </AnomalyProvider>
    )
}

export default Layout
