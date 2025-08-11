import Text from "@styles/components/text"
import theme from "@styles/theme"

const PLevelIcon = ({
    level
}: {
    level: "A" | "B1" | "B2" | "C" | "D" | "M" | "V"
}) => {
    const colors = {
        A: "bg-cyan-600/20",
        B1: "bg-green-600/20",
        B2: "bg-orange-600/20",
        C: "bg-blue-600/20",
        D: "bg-red-600/20",
        M: "bg-yellow-600/20",
        V: "bg-purple-600/20",
    }

    const textColor = {
        A: "#059669",
        B1: "#24ad4e",
        B2: "#dc2626",
        C: "#059669",
        D: "#ef4444",
        M: "#f59e0b",
        V: "#ef4444",
    }

    return (
        <div className={`${colors[level]} w-7 h-7 flex items-center justify-center rounded-full`}>
            <Text
                textColor={textColor[level as keyof typeof textColor]}
                bold={theme.typography.bold.md}
            >
                {level}
            </Text>
        </div>
    )
}
export default PLevelIcon