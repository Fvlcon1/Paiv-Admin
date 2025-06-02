"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@components/container/container";
import Overlay from "@components/overlay/overlay";
import Button from "@components/button/button";
import Text from "@styles/components/text";
import { TbAlertSquareFilled } from "react-icons/tb";
import theme from "@styles/theme";
import { useAuth } from "../context/authContext";

const SessionTimeoutAlert = ({ show }: { show: boolean }) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(show);
    const {logout} = useAuth()

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    if (!isVisible) return null;

    return (
        <Overlay>
            <Container
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                className="!w-fit border-[1px] border-solid border-border-primary"
                closable={false}
            >
                <div className="p-6 rounded-lg h-[200px flex flex-col justify-center items-center text-center w-[300px]">
                    <TbAlertSquareFilled 
                        color={theme.colors.text.secondary}
                        size={20}
                        className="mb-1"
                    />
                    <Text
                        fontfamily="greater-theory"
                        textColor={theme.colors.text.secondary}
                    >
                        Session Expired
                    </Text>
                    <Text>
                        Your session has expired. Please log in again.
                    </Text>
                    <Button
                        onClick={() => logout(false)}
                        text="Relogin"
                        className="mt-2"
                    />
                </div>
            </Container>
        </Overlay>
    );
};

export default SessionTimeoutAlert;
