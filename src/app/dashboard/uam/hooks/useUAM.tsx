import { protectedApi } from "@/app/utils/apis/api"
import { useQuery } from "@tanstack/react-query"
import { IMetricCard } from "../components/metrics/metrics"
import { FaUser, FaUsers } from "react-icons/fa6"
import { IoCloudOffline } from "react-icons/io5"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import Text from "@styles/components/text"
import { DropdownItem } from "@/utils/@types"
import theme from "@styles/theme"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

const useUAM = () => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case "pending":
                return `bg-[#FF950033]`
            case "active":
                return `bg-[#00C85133]`
            case "inactive":
                return `bg-[#FF000033]`
        }
    }

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case "pending":
                return "#FF9500"
            case "active":
                return "#058e3c"
            case "inactive":
                return "#FF0000"
        }
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case "Admin":
                return "bg-[#3498db33]"
            case "User":
                return "bg-[#7a00e633]"
        }
    }

    const getRoleTextColor = (role: string) => {
        switch (role) {
            case "superadmin":
                return "red"
            case "admin":
                return "#3498db"
        }
    }

    const StatusChip = ({ status }: { status: string }) => {
        return (
            <div className={`flex px-4 py-1 rounded-full w-fit ${getStatusClass(status)}`}>
                <Text
                    whiteSpace="nowrap"
                    textColor={getStatusTextColor(status)}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
            </div>
        )
    }

    const RoleChip = ({ role }: { role: string }) => {
        return (
            <Text
                whiteSpace="nowrap"
                textColor={getRoleTextColor(role)}
            >
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
        )
    }

    const LastActiveChip = ({ lastActive }: { lastActive: string }) => {
        return (
            <div className="flex px-4 py-1 rounded-full w-fit bg-bg-secondary">
                <Text
                    whiteSpace="nowrap"
                >
                    {lastActive ?? "-"}
                </Text>
            </div>
        )
    }

    const Actions = () => {
        const dropdownItems: DropdownItem[] = [
            { key : "1", label: "Deactivate", onClick: () => { } },
            { key : "2", label: "Delete User", onClick: () => { } },
        ]
        return (
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-bg-secondary hover:bg-bg-tetiary">
                    <MdDelete color={"#eb4646"} />
                </div>
                <div className="p-2 rounded-md bg-bg-secondary hover:bg-bg-tetiary">
                    <FaEdit color={theme.colors.text.secondary} />
                </div>
            </div>
        )
    }

    const getMetrics = async () => {
        const response = await protectedApi.GET("superadmin/stats")
        return transformMetricsData(response)
    }

    const getAccounts = async () => {
        const response = await protectedApi.GET("superadmin/accounts")
        return transformAccountsData(response)
    }

    const { data: metricsData, isLoading: metricsLoading, error: metricsError, refetch: refetchMetrics, isFetching: metricsIsFetching } = useQuery({
        queryKey: ["uam-metrics"],
        queryFn: getMetrics
    })

    const { data: accountsData, isLoading: accountsLoading, error: accountsError, refetch: refetchAccounts, isFetching: accountsIsFetching } = useQuery({
        queryKey: ["uam-accounts"],
        queryFn: getAccounts
    })

    const transformMetricsData = (data: any) => {
        const metrics: IMetricCard[] = [
            {
                title: "Total Users",
                value: data?.total_users + data.total_superadmins,
                color: "6060D0",
                icon: FaUsers
            },
            {
                title: "Active Users",
                value: data?.active_users,
                color: "299B46",
                icon: FaUser
            },
            {
                title: "Inactive Users",
                value: data?.inactive_users,
                color: "FF0000",
                icon: IoCloudOffline
            },
            {
                title: "Pending Invites",
                value: data?.pending_invites,
                color: "FF9500",
                icon: AiOutlineUsergroupAdd
            },
        ]
        return metrics
    }

    const transformAccountsData = (data: any) => {
        const accounts = data.map((account: any) => ({
            fullname: account.name ?? "-",
            id: account.id,
            email: account.email,
            region: account.region,
            district: account.district,
            status: (
                <StatusChip status={account.status} />
            ),
            role: (
                <RoleChip role={account.role} />
            ),
            lastActive: (
                <LastActiveChip lastActive={account.last_active} />
            ),
            actions: (
                <Actions />
            )
        }))
        return accounts
    }

    console.log({ metricsData, accountsData })

    return {
        metricsData,
        metricsLoading,
        metricsError,
        accountsData,
        accountsLoading,
        accountsError,
        refetchMetrics,
        refetchAccounts,
        metricsIsFetching,
        accountsIsFetching
    }
}
export default useUAM