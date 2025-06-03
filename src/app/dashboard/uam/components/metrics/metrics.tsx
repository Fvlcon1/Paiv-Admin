import SlideIn from "@styles/components/slidein"
import MetricCard from "./components/card"
import { FaUser, FaUsers } from "react-icons/fa"
import { IoCloudOffline } from "react-icons/io5"
import { AiOutlineUsergroupAdd } from "react-icons/ai"

export interface IMetricCard {
    title : string,
    value : string,
    color : string
    icon : any
}

const Metrics = () => {
    const metrics : IMetricCard[] = [
        {
            title : "Total Users",
            value : "32",
            color : "6060D0",
            icon : FaUsers
        },
        {
            title : "Active Users",
            value : "25",
            color : "299B46",
            icon : FaUser
        },
        {
            title : "Inactive Users",
            value : "7",
            color : "FF0000",
            icon : IoCloudOffline
        },
        {
            title : "Pending Invites",
            value : "1",
            color : "FF9500",
            icon : AiOutlineUsergroupAdd
        },
    ]
    
    return (
        <div className="w-full px-3 py-3 flex items-center border-b-[1px] border-solid border-b-border-primary gap-4">
            {
                metrics.map((metric, index) => (
                    <SlideIn
                        direction="left"
                        duration={0.5}
                        delay={index * 0.1}
                        key={index}
                    >
                        <MetricCard
                            metric={metric}
                        />
                    </SlideIn>
                ))
            }
        </div>
    )
}
export default Metrics