import BatchProcessingContextProvider from "./context/btach-processing-context"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <BatchProcessingContextProvider>
            {children}
        </BatchProcessingContextProvider>
    )
}
export default Layout