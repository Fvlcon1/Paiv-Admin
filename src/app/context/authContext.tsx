'use client'

import { createContext, useContext, useEffect, useRef, useState, useCallback, Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import SessionTimeoutAlert from "../components/sessionTimeoutAlert";
import { setupInterceptors } from "../utils/apis/axiosInstance";
import useProfile from "../hooks/useProfile";

const AuthContext = createContext<{ 
    logout: (showAlert?: boolean) => void
    setUserDetails: Dispatch<SetStateAction<IUserDetails | undefined>>
    userDetails: IUserDetails | undefined
 }>({ 
    logout: () => {},
    setUserDetails : ()=>{},
    userDetails : undefined
  });

const cookies = new Cookies();
interface IUserDetails {
    email? : string
    name? : string
    role? : string
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [showSessionAlert, setShowSessionAlert] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<IUserDetails>()
    const logoutTimer = useRef<number | null>(null);
    const {getProfileMutation} = useProfile()

    useEffect(() => {
        const profile = localStorage.getItem("profile");
        if (profile) {
            setUserDetails(JSON.parse(profile));
        }
    }, []);

    const logout = useCallback((showAlert = true) => {
        setIsAuthenticated(false);
        cookies.remove("accessToken");

        if (pathname.startsWith("/auth")) {
            setShowSessionAlert(false);
            return;
        }

        if (showAlert) {
            setShowSessionAlert(true);
        } else {
            router.push("/auth/login");
            setShowSessionAlert(false);
        }
    }, [pathname, router]);

    const resetTimer = useCallback(() => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        
        logoutTimer.current = window.setTimeout(() => {
            if (!pathname.startsWith("/auth")) {
                logout(true);
            }
        }, 60 * 60 * 1000);
    }, [logout, pathname]);

    useEffect(() => {
        const token = cookies.get("accessToken");

        if (!token) {
            logout(false);
        } else {
            setIsAuthenticated(true);
        }

        setupInterceptors(logout);
    }, [logout]);

    useEffect(() => {
        if (!isAuthenticated || pathname.startsWith("/auth")) return;

        const events = ["mousemove", "keydown", "click"];
        events.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
        };
    }, [isAuthenticated, pathname, resetTimer]);

    return (
        <AuthContext.Provider value={{ 
            logout,
            userDetails,
            setUserDetails
         }}>
            {children}
            {showSessionAlert && !pathname.startsWith("/auth") && <SessionTimeoutAlert show={showSessionAlert} />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
