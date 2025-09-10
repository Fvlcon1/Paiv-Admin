import axios from "axios";
import toast from "react-hot-toast";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL
});

// Axios Interceptor: Handles Unauthorized Errors (401)
export const setupInterceptors = (logout: () => void) => {
    console.log("interceptor")
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("instance")
                toast.error("Please login to continue")
                // logout();
                return null
            }
            
            // 🔹 Allow other errors to be handled by the calling function
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
