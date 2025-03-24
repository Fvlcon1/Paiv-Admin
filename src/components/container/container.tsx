import ClickableTab from "@components/clickable/clickabletab";
import theme from "@styles/theme";
import { IoMdCloseCircle } from "react-icons/io";
import { ReactNode, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    isVisible: boolean;
    close: () => void;
    closable?: boolean;
    onClose?: () => void;
}

const Container = ({
    children,
    className,
    isVisible,
    close,
    closable = true,
    onClose,
    ...divProps
}: ContainerProps) => {
    const handleClose = () => {
        close();
        if (onClose) onClose();
    };

    return (
        isVisible && (
            <div
                className={`min-w-[300px] flex flex-col items-center relative rounded-[20px] border-[1px] border-solid border-border-tetiary bg-[#1F1F28] ${className}`}
                style={{
                    backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                {...divProps} // Spread additional div props
            >
                <div className="absolute z-10 left-[-3px] top-[-3px] w-[70px] h-[70px] rounded-tl-[20px] border-t-[5px] border-l-[5px] border-solid border-[#3C3C53]"></div>
                <div className="absolute z-10 right-[-3px] bottom-[-3px] w-[70px] h-[70px] rounded-br-[20px] border-b-[5px] border-r-[5px] border-solid border-[#3C3C53]"></div>
                {closable && (
                    <div className="absolute top-[10px] z-10 right-[10px]">
                        <ClickableTab className="!rounded-full hover:!bg-bg-tetiary" onClick={handleClose}>
                            <IoMdCloseCircle color={theme.colors.text.secondary} />
                        </ClickableTab>
                    </div>
                )}
                {children}
            </div>
        )
    );
};

export default Container;
