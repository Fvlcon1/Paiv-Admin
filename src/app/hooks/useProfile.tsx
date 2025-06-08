import { protectedApi } from "../utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../context/authContext"

const useProfile = () => {
    const {setUserDetails} = useAuth()

    const transformProfile = (data : any) => {
        return {
            name : `${data.first_name} ${data.last_name}`,
            createdAt : data.created_at,
            email : data.email,
            id : data.id,
            role : data.role,
            status : data.status,
        }
    }

    const getProfile = async () => {
        const response = await protectedApi.GET("/admin/profile")
        return transformProfile(response)
    }

    const {mutate : getProfileMutation, isPending : isPendingProfile, isError : isErrorProfile, error : errorProfile} = useMutation({
        mutationFn : getProfile,
        onSuccess : (data)=>{
            setUserDetails(data as any)
            localStorage.setItem("profile", JSON.stringify(data));
        },
        onError : (error)=>{
            console.log({error})
        }
    })
        
    
    return {
        getProfileMutation,
        isPendingProfile,
        isErrorProfile,
        errorProfile
    }
}
export default useProfile