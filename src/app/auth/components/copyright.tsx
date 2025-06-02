import Text from "@styles/components/text"
import theme from "@styles/theme"

const Copyright = () => {
    return (
        <div className="absolute bottom-[30px]">
            <Text
                textColor={theme.colors.text.tetiary}
            >
                © 2025 PAIV Admin. All rights reserved. | &nbsp;
                <Text
                    clickableLink
                    textColor={theme.colors.main.primary}
                >
                    Privacy Policy
                </Text> |
                <Text
                    clickableLink
                    textColor={theme.colors.main.primary}
                >
                    &nbsp;Terms of Service
                </Text>
            </Text>
        </div>
    )
}
export default Copyright