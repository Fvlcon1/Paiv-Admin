import ClaimsContextProvider from "./context/claims-context"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClaimsContextProvider>
            {children}
        </ClaimsContextProvider>
    )
}
export default Layout