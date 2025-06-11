import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useUAMContext } from "../../context/context"

const useDeactivate = ({
    id,
    close
}: {
    id: string,
    close: () => void
}) => {
    const { refetchAccounts, refetchMetrics } = useUAMContext()
    const deactivateUser = async () => {
        const response = await protectedApi.PUT(`superadmin/admins/${id}`)
        return response
    }

    const { mutateAsync: deactivateUserMutation, isPending: isDeactivatePending } = useMutation({
        mutationFn: deactivateUser,
        onSuccess: () => {
            toast.success("User deactivated successfully")
            refetchAccounts()
            refetchMetrics()
            close()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || "Failed to deactivate user")
        }
    })
    return {
        deactivateUserMutation,
        isDeactivatePending
    }
}
export default useDeactivate