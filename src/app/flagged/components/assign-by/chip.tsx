import Text from "@styles/components/text";
import theme from "@styles/theme";
import { IoClose } from "react-icons/io5";

const Chip = ({
    label,
    onClick,
    icon
}: {
    label: string,
    onClick?: () => void,
    icon?: React.ReactNode
}) => {
    return (
        <div
            onClick={onClick}
            className="border w-fit border-main-primary rounded-full px-2 py-0.5 flex items-center cursor-pointer gap-1"
        >
            {icon}
            <Text>
                {label}
            </Text>
            <IoClose size={15} color={theme.colors.text.secondary} />
        </div>
    )
}
export default Chip