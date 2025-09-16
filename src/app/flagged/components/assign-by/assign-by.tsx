import NoData from "@components/NoData/noData"
import { AnimatePresence } from "framer-motion"
import { useAdminsContext } from "../../context/admins-context"
import AvailableAdmins from "./available-admins"
import { Admin } from "../../hooks/use-admins"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import Input from "@components/input/input"
import { IoSearch } from "react-icons/io5"
import theme from "@styles/theme"
import Region from "./region"
import Text from "@styles/components/text"
import { hexOpacity } from "@/utils/hexOpacity"
import Divider from "@components/divider/divider"
import AdminSearch from "./admin-search"

export type AssignByGrouping = "Region" | "District" | "Provider" | "Claim Period"
export type ViewState = "grouping" | "assigning"

const AssignBy = ({
    className,
    grouping,
    isVisible,
    setIsVisible
}: {
    className?: string
    grouping: AssignByGrouping
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
}) => {
    const { admins, setSearchQuery, searchQuery } = useAdminsContext()
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const assignToRef = useRef<HTMLDivElement>(null);
    const [viewState, setViewState] = useState<ViewState>("grouping")
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])

    useClickAway(assignToRef, () => {
        setIsVisible(false);
    })

    const GroupToComponentMapping: Record<AssignByGrouping, React.FC<{
        viewState: ViewState, 
        setViewState: (viewState: ViewState) => void,
        selectedRegions: string[],
        setSelectedRegions: (selectedRegions: string[]) => void
    }>> = {
        Region: Region,
        District: Region,
        Provider: Region,
        "Claim Period": Region
    }
    
    const GroupBy = GroupToComponentMapping[grouping]
    
    const stateToComponentMapping: Record<ViewState, ReactNode> = {
        grouping: (
            <GroupBy 
                viewState={viewState} 
                setViewState={setViewState} 
                selectedRegions={selectedRegions} 
                setSelectedRegions={setSelectedRegions}
            />
        ),
        assigning: (
            <AdminSearch
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                selectedAdmin={selectedAdmin}
                setSelectedAdmin={setSelectedAdmin}
                selectedRegions={selectedRegions}
            />
        )
    }
    
    const StateComponent = stateToComponentMapping[viewState]

    const cleanup = () => {
        setSearchQuery("")
        setSelectedAdmin(null)
        setViewState("grouping")
    }

    useEffect(() => {
        if (!isVisible) return cleanup()
    }, [isVisible])

    return (
        <AnimatePresence>
            {
                isVisible ? (
                    <div
                        ref={assignToRef}
                        className={`w-[300px] py-2 flex flex-col gap-2 border border-border-primary bg-bg-primary shadow-2xl rounded-xl absolute right-0 top-[110%] z-50 ${className}`}
                    >
                        {StateComponent}
                    </div>
                ) : <></>
            }
        </AnimatePresence>
    )
}
export default AssignBy