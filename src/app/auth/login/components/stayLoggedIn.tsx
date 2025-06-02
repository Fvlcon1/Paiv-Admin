import Pressable from "@components/button/pressable"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction } from "react"
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa"

const StayLoggedIn = ({
    setStayLoggedIn,
    stayLoggedIn
} : {
    setStayLoggedIn: Dispatch<SetStateAction<boolean>>
    stayLoggedIn : boolean
}) => {
    return (
        <Pressable
            onClick={()=>setStayLoggedIn(prev => !prev)}
            scaleFactor={0.99}
        >
            <div className="flex gap-1 items-center pl-1 mt-1">
                {
                    stayLoggedIn ?
                    <FaCheckSquare
                        color={theme.colors.main.primary}
                    />
                    :
                    <FaRegCheckSquare
                        color={theme.colors.text.tetiary}
                    />
                }
                <Text textColor={theme.colors.text.tetiary}>
                    Stay logged in
                </Text>
            </div>
        </Pressable>
    )
}
export default StayLoggedIn