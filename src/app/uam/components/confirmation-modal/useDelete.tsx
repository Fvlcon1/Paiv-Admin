import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useUAMContext } from "../../context/context"

const useDelete = ({
    id,
    close
}: {
    id: string,
    close: () => void
}) => {
    const { refetchAccounts, refetchMetrics } = useUAMContext()
    const deleteUser = async () => {
        const response = await protectedApi.DELETE(`superadmin/admins/${id}`)
        return response
    }

    const { mutateAsync: deleteUserMutation, isPending: isDeletePending } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User deleted successfully")
            refetchAccounts()
            refetchMetrics()
            close()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.detail || "Failed to delete user")
        }
    })
    return {
        deleteUserMutation,
        isDeletePending
    }
}
export default useDelete