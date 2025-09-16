import Divider from "@components/divider/divider";
import Text from "@styles/components/text";
import theme from "@styles/theme";
import { FaCrown } from "react-icons/fa6";

const rejectionReasons = [
    { id: 1, reason: "Incomplete or missing documentation" },
    { id: 2, reason: "Diagnosis not covered by insurance policy" },
    { id: 3, reason: "Lack of medical necessity" },
    { id: 4, reason: "Duplicate claim submission" },
    { id: 5, reason: "Expired authorization" }
];

const getCrownColor = (position: number) => {
    switch(position) {
        case 1: return "#D4AF37"; // Gold
        case 2: return "#C0C0C0"; // Silver
        case 3: return "#CD7F32"; // Bronze
        default: return "";
    }
};

const Top5RejectionReasons = () => {
    return (
        <div className="w-full h-full rounded-2xl bg-bg-primary flex flex-col gap-4 p-4 px-6">
            <Text
                textColor={theme.colors.text.primary}
                bold={theme.typography.bold.md}
                size={theme.typography.size.HM}
            >
                Top 5 Claim Rejection Reasons
            </Text>

            <div className="flex flex-col gap-3 w-full">
                {rejectionReasons.map((item, index) => (
                    <div key={item.id} className="w-full">
                        <div className="w-full flex gap-4 items-center">
                            <div className="flex items-center gap-4 flex-1">
                                <Text
                                    textColor={theme.colors.text.tetiary}
                                    bold={theme.typography.bold.md2}
                                    size={theme.typography.size.HL}
                                    className="min-w-[24px] text-center"
                                >
                                    {String(item.id).padStart(2, '0')}
                                </Text>
                                <Text
                                    textColor={theme.colors.text.primary}
                                    className="flex-1"
                                >
                                    {item.reason}
                                </Text>
                            </div>
                            {index < 3 && (
                                <FaCrown 
                                    size={20} 
                                    color={getCrownColor(index + 1)} 
                                    className="flex-shrink-0"
                                />
                            )}
                        </div>
                        {index < rejectionReasons.length - 1 && (
                            <div className="pl-[45px] mt-2">
                                <Divider />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Top5RejectionReasons;