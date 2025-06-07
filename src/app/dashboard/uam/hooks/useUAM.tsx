import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { IMetricCard } from "../components/metrics/metrics"
import { FaUser, FaUsers } from "react-icons/fa6"
import { IoCloudOffline } from "react-icons/io5"
import { AiOutlineUsergroupAdd } from "react-icons/ai"

const useUAM = () => {
    const getMetrics = async () => {
        const response = await protectedApi.GET("superadmin/stats")
        return transformMetricsData(response)
    }

    const getAccounts = async () => {
        const response = await protectedApi.GET("superadmin/accounts")
        return transformAccountsData(response)
    }

    const {data : metricsData, isLoading : metricsLoading, error : metricsError} = useQuery({
        queryKey : ["uam-metrics"],
        queryFn : getMetrics
    })

    const {data : accountsData, isLoading : accountsLoading, error : accountsError} = useQuery({
        queryKey : ["uam-accounts"],
        queryFn : getAccounts
    })

    const transformMetricsData = (data : any) => {
        const metrics : IMetricCard[] = [
                {
                    title : "Total Users",
                    value : data?.total_users,
                    color : "6060D0",
                    icon : FaUsers
                },
                {
                    title : "Active Users",
                    value : data?.active_users,
                    color : "299B46",
                    icon : FaUser
                },
                {
                    title : "Inactive Users",
                    value : data?.inactive_users,
                    color : "FF0000",
                    icon : IoCloudOffline
                },
                {
                    title : "Pending Invites",
                    value : data?.pending_invites,
                    color : "FF9500",
                    icon : AiOutlineUsergroupAdd
                },
            ]
        return metrics
    }

    const transformAccountsData = (data : any) => {
        const accounts = data.map((account : any) => ({
            id : account.id,
            email : account.email,
            role : account.account_type,
            region : account.region,
            district : account.district,
            status : account.status,
            lastActive : account.last_active
        }))
        return accounts
    }

    console.log({metricsData, accountsData})

    return {
        metricsData,
        metricsLoading,
        metricsError,
        accountsData,
        accountsLoading,
        accountsError
    }
}
export default useUAM