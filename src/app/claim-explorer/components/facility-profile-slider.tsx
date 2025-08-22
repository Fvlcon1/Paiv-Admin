import { motion, AnimatePresence } from "framer-motion"
import {
    HiOutlineOfficeBuilding,
    HiOutlineX,
    HiOutlineShieldCheck,
    HiOutlineLocationMarker,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineGlobeAlt,
    HiOutlineIdentification
} from "react-icons/hi"
import Button from "@components/button/button"
import Separator from "@components/divider/divider"
import Text from "@styles/components/text"
import { useExplorerContext } from "../context/explorer-context"
import { useState } from "react"
import theme from "@styles/theme"
import Overlay from "@components/overlay/overlay"
import { gradientClass } from "@/utils/constants"

interface FacilityData {
    facilityId: string
    providerName: string
    prescribingLevel: string
    providerCategory: string
    email: string
    credentialStatus: string
    district: string
    phone: string
    address: string
    region: string
    establishedDate?: string
    staffCount?: number
    specialties?: string[]
}

const FacilityProfileSlider = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { isFacilityProfileVisible, setIsFacilityProfileVisible } = useExplorerContext()

    // Sample data if no facility provided
    const facilityData: FacilityData = {
        facilityId: "KATH001",
        providerName: "Komfo Anokye Teaching Hospital",
        prescribingLevel: "D",
        providerCategory: "Teaching Hospital",
        email: "info@kathhsp.org",
        credentialStatus: "Active",
        district: "Kumasi Metropolitan",
        phone: "+233 32 202 1234",
        address: "P.O. Box 1934, Kumasi, Ghana",
        region: "Ashanti Region",
        establishedDate: "1954",
        staffCount: 2850,
        specialties: ["Emergency Medicine", "Cardiology", "Oncology", "Pediatrics", "Surgery"]
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'success';
            case 'pending review': return 'warning';
            case 'suspended': return 'destructive';
            default: return 'secondary';
        }
    }

    const getPrescribingLevelInfo = (level: string) => {
        const levels = {
            'A': { name: 'Full Prescribing', color: 'success' },
            'B': { name: 'Limited Prescribing', color: 'warning' },
            'C': { name: 'Restricted Prescribing', color: 'warning' },
            'D': { name: 'Teaching Hospital', color: 'primary' }
        }
        return levels[level as keyof typeof levels] || { name: 'Unknown', color: 'secondary' }
    }

    const handleViewFullDetails = () => {
        setIsLoading(true)
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false)
            // Handle navigation or action
        }, 1000)
    }

    return (
        <AnimatePresence>
            {
                isFacilityProfileVisible && (
                    <Overlay
                        onClick={() => setIsFacilityProfileVisible(false)}
                    >
                        <AnimatePresence>
                            {/* Slider Panel */}
                            <motion.div
                                key="facility-panel"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300,
                                    duration: 0.3
                                }}
                                className="fixed bg-bg-primary top-0 right-0 w-[400px] h-full bg-background shadow-hover z-50 overflow-hidden"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="relative bg-main-primary p-4">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsFacilityProfileVisible(false)}
                                            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                        >
                                            <HiOutlineX color={theme.colors.bg.secondary} size={18} />
                                        </motion.button>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex flex-col"
                                        >
                                            <Text
                                                size={theme.typography.size.HM}
                                                bold={theme.typography.bold.md2}
                                                textColor={theme.colors.bg.secondary}
                                            >
                                                Facility Profile
                                            </Text>
                                            <Text
                                                textColor={theme.colors.bg.secondary}
                                            >
                                                Healthcare Provider Information
                                            </Text>
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-4">
                                            {/* Facility Overview div */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="bg-gradient-card border-0 shadow-card">
                                                    <div className="p-4">
                                                        <div className="flex flex-col gap-1 mb-3">
                                                            <div className="flex-1 min-w-0">
                                                                <Text
                                                                    size={theme.typography.size.HM}
                                                                    bold={theme.typography.bold.md2}
                                                                    className={gradientClass}
                                                                >
                                                                    {facilityData.providerName}
                                                                </Text>
                                                                <div className="flex items-center gap-1">
                                                                    {/* <HiOutlineLocationMarker className="text-text-tetiary flex-shrink-0" size={14} /> */}
                                                                    <Text textColor={theme.colors.text.tetiary}>{facilityData.district}, {facilityData.region}</Text>
                                                                </div>
                                                            </div>
                                                            <div className="flex w-fit items-center gap-1 rounded-full px-2 py-0.5 bg-green-500/20">
                                                                <HiOutlineShieldCheck color={theme.colors.text.success} className="" size={13} />
                                                                <Text textColor={theme.colors.text.success}>{facilityData.credentialStatus}</Text>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                                            <div className="flex flex-col gap-1">
                                                                <Text textColor={theme.colors.text.tetiary}>Category</Text>
                                                                <Text>{facilityData.providerCategory}</Text>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <Text textColor={theme.colors.text.tetiary}>Established</Text>
                                                                <Text>{facilityData.establishedDate || 'N/A'}</Text>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Quick Stats */}
                                            {facilityData.staffCount && (
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="grid grid-cols-2 gap-3 px-4"
                                                >
                                                    <div className="bg-bg-secondary rounded-lg">
                                                        <div className="p-3 text-center flex flex-col items-center gap-0.5">
                                                            <Text
                                                                size={theme.typography.size.body2}
                                                                bold={theme.typography.bold.md}
                                                                className={gradientClass}
                                                            >
                                                                {facilityData.staffCount.toLocaleString()}
                                                            </Text>
                                                            <Text>Staff Members</Text>
                                                        </div>
                                                    </div>
                                                    <div className="bg-bg-secondary rounded-lg">
                                                        <div className="p-3 text-center flex flex-col items-center">
                                                            <Text
                                                                size={theme.typography.size.body2}
                                                                bold={theme.typography.bold.md}
                                                                className={gradientClass}
                                                            >
                                                                {facilityData.specialties?.length || 0}
                                                            </Text>
                                                            <Text>Specialties</Text>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Identification */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <div className="px-4">
                                                    <div className="bg-bg-primary-lighter flex flex-col border border-border-primary rounded-xl p-4">
                                                        <div className="flex items-center gap-1">
                                                            <HiOutlineIdentification className="text-text-secondary" size={16} />
                                                            <Text
                                                                bold={theme.typography.bold.md}
                                                                className={gradientClass}
                                                            >
                                                                Identification
                                                            </Text>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center justify-between">
                                                                <Text className="text-xs">Facility ID</Text>
                                                                <div className="flex px-3 py-1 rounded-md bg-bg-tetiary">
                                                                    <Text>
                                                                        {facilityData.facilityId}
                                                                    </Text>
                                                                </div>
                                                            </div>

                                                            <Separator />

                                                            <div className="flex flex-col gap-1">
                                                                <Text>
                                                                    Prescribing Level
                                                                </Text>
                                                                <div className="bg-main-primary w-fit rounded-full px-3 py-1 flex">
                                                                    <Text
                                                                        textColor={theme.colors.bg.primary}
                                                                    >
                                                                        Level {facilityData.prescribingLevel} - {getPrescribingLevelInfo(facilityData.prescribingLevel).name}
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Contact Information */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <div className="px-4">
                                                    <div className="bg-bg-primary-lighter flex flex-col gap-2 border border-border-primary rounded-xl p-4">
                                                        {/* <div className="flex items-center gap-1">
                                                            <HiOutlineIdentification className="text-text-secondary" size={16} />
                                                            <Text
                                                                bold={theme.typography.bold.md}
                                                                className={gradientClass}
                                                            >
                                                                Contact Information
                                                            </Text>
                                                        </div> */}

                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <HiOutlineMail className="text-text-secondary" size={14} />
                                                                    <Text textColor={theme.colors.text.secondary}>Email - </Text>
                                                                </div>
                                                                <Text>
                                                                    <a
                                                                        href={`mailto:${facilityData.email}`}
                                                                    >
                                                                        {facilityData.email}
                                                                    </a>
                                                                </Text>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <HiOutlinePhone className="text-text-secondary" size={14} />
                                                                    <Text textColor={theme.colors.text.secondary}>Phone - </Text>
                                                                </div>
                                                                <Text>
                                                                    <a
                                                                        href={`tel:${facilityData.phone}`}
                                                                    >
                                                                        {facilityData.phone}
                                                                    </a>
                                                                </Text>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <HiOutlineLocationMarker className="text-text-secondary" size={14} />
                                                                    <Text textColor={theme.colors.text.secondary}>Address - </Text>
                                                                </div>
                                                                <Text>{facilityData.address}</Text>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Specialties */}
                                            {facilityData.specialties && facilityData.specialties.length > 0 && (
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    <div className="">
                                                        <div className="px-4 flex flex-col gap-2">
                                                            <div className="flex items-center gap-1 pl-1">
                                                                <HiOutlineIdentification className="text-text-secondary" size={16} />
                                                                <Text
                                                                    bold={theme.typography.bold.md}
                                                                    className={gradientClass}
                                                                >
                                                                    Medical Specialties
                                                                </Text>
                                                            </div>

                                                            <div className="flex flex-wrap gap-1.5">
                                                                {facilityData.specialties.map((specialty, index) => (
                                                                    <div
                                                                        className="flex gap-1 px-2 py-[2px] bg-bg-secondary border border-border-primary rounded-full"
                                                                        key={index}
                                                                    >
                                                                        <Text>
                                                                            {specialty}
                                                                        </Text>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </Overlay>
                )}
        </AnimatePresence>
    )
}

export default FacilityProfileSlider