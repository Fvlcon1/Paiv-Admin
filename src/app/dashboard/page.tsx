import Text from "@styles/components/text"
import { redirect } from "next/navigation"

const Dashboard = () => {
    redirect("/dashboard/approved")
    return (
        <div>
        </div>
    )
}
export default Dashboard