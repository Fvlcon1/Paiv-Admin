'use client'

import { AnimatePresence } from "framer-motion"
import Overlay from "@components/overlay/overlay"
import SlideIn from "@styles/components/slidein"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Input from "@components/input/input"
import OutlineButton from "@components/button/outlineButton"
import { GiMagicBroom } from "react-icons/gi"
import Button from "@components/button/button"
import { useExplorerContext } from "../../context/explorer-context"
import { FaCheckCircle, FaTimesCircle, FaFlag, FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa"
import { MdAttachMoney } from "react-icons/md"
import Divider from "@components/divider/divider"

const formatNumber = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isInteger(num) && num < 10 && num >= 0 ? `0${num}` : String(value);
};

interface FinancialInfoItemProps {
    icon?: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
    value: string | number;
    valueColor?: string;
    showDivider?: boolean;
    iconColor?: string;
}

const FinancialInfoItem = ({
    icon: Icon,
    label,
    value,
    valueColor,
    showDivider = true,
    iconColor = theme.colors.text.secondary
}: FinancialInfoItemProps) => (
    <>
        <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
                {Icon && <Icon size={16} color={iconColor} />}
                <Text>{label}</Text>
            </div>
            <Text
                bold={theme.typography.bold.md}
                textColor={valueColor}
            >
                {value}
            </Text>
        </div>
        {showDivider && <Divider className="!bg-border-secondary/50" />}
    </>
);

const StatCard = ({
    title,
    value,
    icon: Icon,
    color = theme.colors.text.secondary,
    bgColor = theme.colors.bg.secondary
}: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
    bgColor?: string;
}) => (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: bgColor }}>
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon size={18} color={color} />
        </div>
        <div className="flex flex-col gap-0">
            <Text size={theme.typography.size.body}>
                {title}
            </Text>
            <Text bold={theme.typography.bold.md} size={theme.typography.size.body2}>
                {formatNumber(value)}
            </Text>
        </div>
    </div>
)

const BatchDetailsSlider = () => {
    const { isBatchDetailsVisible, setIsBatchDetailsVisible, selectedBatch } = useExplorerContext()

    // Mock data - in a real app, this would come from your API
    const stats = {
        totalClaims: 156,
        approved: 142,
        rejected: 8,
        flagged: 6,
        expectedAmount: 'GHS 8,112.00',
        approvedAmount: 'GHS 7,850.50',
        verification: {
            full: 98,
            partial: 42,
            none: 16
        }
    }

    if (!selectedBatch) {
        return null
    }

    return (
        <AnimatePresence>
            {isBatchDetailsVisible && (
                <Overlay onClick={() => setIsBatchDetailsVisible(false)}>
                    <AnimatePresence>
                        {isBatchDetailsVisible && (
                            <SlideIn
                                direction="right"
                                className="absolute top-0 right-0 w-[350px] bg-bg-primary h-full flex flex-col gap-4 px-4 py-4 overflow-y-auto"
                            // onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between border-b border-border-primary pb-3">
                                    <div className="flex items-center gap-2">
                                        <Text size={theme.typography.size.HM} bold={theme.typography.bold.md2}>
                                            Batch Details
                                        </Text>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <StatCard
                                            title="Total Claims"
                                            value={selectedBatch.totalClaims}
                                            icon={MdAttachMoney}
                                            color={theme.colors.text.secondary}
                                        />
                                        <StatCard
                                            title="Approved"
                                            value={selectedBatch.totalApproved}
                                            icon={FaCheckCircle}
                                            color={theme.colors.text.success}
                                            bgColor="#E8F5E9"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <StatCard
                                            title="Rejected"
                                            value={selectedBatch.totalRejected}
                                            icon={FaTimesCircle}
                                            color={theme.colors.text.danger}
                                            bgColor="#FFEBEE"
                                        />
                                        <StatCard
                                            title="Flagged"
                                            value={selectedBatch.totalFlagged}
                                            icon={FaFlag}
                                            color="#FFA000"
                                            bgColor="#FFF8E1"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Text size={theme.typography.size.body} bold={theme.typography.bold.md2}>
                                            Financials
                                        </Text>
                                        <div className="bg-bg-secondary py-0.5 px-3 rounded-lg">
                                            <FinancialInfoItem
                                                label="Expected Amount"
                                                value={`GHS ${selectedBatch.expectedAmount?.toLocaleString() || 0}`}
                                                showDivider={true}
                                            />
                                            <FinancialInfoItem
                                                label="Approved Amount"
                                                value={`GHS ${selectedBatch.approvedAmount?.toLocaleString() || 0}`}
                                                showDivider={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Text size={theme.typography.size.body} bold={theme.typography.bold.md2}>
                                            Patient Verification
                                        </Text>
                                        <div className="space-y-2">
                                            <div className="bg-bg-secondary py-0.5 px-3 rounded-lg">
                                                <FinancialInfoItem
                                                    label="Fully Verified"
                                                    value={selectedBatch.verificationFully?.toLocaleString() || 0}
                                                    showDivider={true}
                                                    icon={FaUserCheck}
                                                    iconColor={theme.colors.text.success}
                                                />
                                                <FinancialInfoItem
                                                    label="Partially Verified"
                                                    value={selectedBatch.verificationPartially?.toLocaleString() || 0}
                                                    showDivider={true}
                                                    icon={FaUserClock}
                                                    iconColor={"orange"}
                                                />
                                                <FinancialInfoItem
                                                    label="Not Verified"
                                                    value={selectedBatch.verificationNotVerified?.toLocaleString() || 0}
                                                    showDivider={false}
                                                    icon={FaUserTimes}
                                                    iconColor={theme.colors.text.danger}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-border-primary">
                                    <Button
                                        text="Close Details"
                                        onClick={() => setIsBatchDetailsVisible(false)}
                                        className="w-full"
                                    />
                                </div>
                            </SlideIn>
                        )}
                    </AnimatePresence>
                </Overlay>
            )}
        </AnimatePresence>
    )
}

export default BatchDetailsSlider
