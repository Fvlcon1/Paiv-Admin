import { FlaggedContextProvider } from "./context/flagged-context";
import { AdminsContextProvider } from "./context/admins-context";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <FlaggedContextProvider>
            <AdminsContextProvider>
                {children}
            </AdminsContextProvider>
        </FlaggedContextProvider>
    )
}
export default Layout