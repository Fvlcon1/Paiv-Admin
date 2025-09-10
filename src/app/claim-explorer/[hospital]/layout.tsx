import HospitalProvider from "./context/hospital-context"

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <HospitalProvider>
            {children}
        </HospitalProvider>
    )
}
export default Layout