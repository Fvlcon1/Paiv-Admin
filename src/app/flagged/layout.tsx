import { FlaggedContextProvider } from "./context/flagged-context";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <FlaggedContextProvider>
            {children}
        </FlaggedContextProvider>
    )
}
export default Layout