import Text from "@styles/components/text"
import theme from "@styles/theme"

const PrivacyText = () => {
    return (
        <Text className="pl-1">
            By signing up, I agree to &nbsp;
            <Text  
                clickableLink
                textColor={theme.colors.main.primary}
            >
                PAIV's Privacy    
            </Text>&nbsp;
            and&nbsp;
            <Text 
                clickableLink
                textColor={theme.colors.main.primary}
            >
                Terms of service
            </Text>
        </Text>
    )
}
export default PrivacyText