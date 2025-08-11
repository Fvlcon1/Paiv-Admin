import { UAMContextProvider } from "./context/context"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <UAMContextProvider>
                {children}
            </UAMContextProvider>
        </>
    )
}
export default Layout