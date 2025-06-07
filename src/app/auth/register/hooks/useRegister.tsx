import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import validationSchema from "../utils/validationSchema"
import { useRouter } from "next/navigation"

interface SignupType {
    firstname : string,
    lastname : string,
    email : string,
    password : string
}

const useRegister = () => {
    const params = useSearchParams()
    const token = params.get("token")

    const router = useRouter()

    const handleSubmit = async (values : SignupType) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/activate-signup`, {
            token,
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            password: values.password
        })
        return response.data
    }

    const handleSubmitMutation = useMutation({
        mutationFn : handleSubmit,
        onSuccess : ()=>{
            toast.success("registration successful")
            router.push('/auth/login')
        },
        onError: (error) => {
            toast.error(error.message)
            console.error({error});
        }
    })

    const {isError, isPending, error, mutate} = handleSubmitMutation

    const formik = useFormik({
        initialValues: {
            firstname : '',
            lastname : '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            mutate(values)
        }
    })

    return {
        formik,
        isPending,
        isError,
        error
    }
}
export default useRegister