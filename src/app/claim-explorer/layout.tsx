import ExplorerProvider from "./context/explorer-context"

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <ExplorerProvider>
            {children}
        </ExplorerProvider>
    )
}
export default Layout