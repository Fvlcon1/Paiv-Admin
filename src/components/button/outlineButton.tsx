import theme from "@styles/theme"
import Button from "./button"
import { ButtonProps } from "@/utils/@types"

const OutlineButton = (props: ButtonProps) => {
    return <Button 
        className="!bg-transparent hover:!bg-bg-secondary"
        {...props}
    >
        {props.children}
    </Button>
}

export default OutlineButton