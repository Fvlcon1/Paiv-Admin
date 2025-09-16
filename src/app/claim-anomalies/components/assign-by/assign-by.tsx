import { AnimatePresence } from "framer-motion"
import { Admin, GroupBy } from "../../hooks/use-admins"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import Region from "./region"
import AdminSearch from "./admin-search"
import { useAdminsContext } from '../../context/admins-context';
import { useAnomalyContext } from "../../context/anomaly-context"
import District from "./district"
import Providers from "./providers"

export type AssignByGrouping = "Region" | "District" | "Provider"
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
    const { admins, setSearchQuery, searchQuery, assignToAdminSuccess, refetchAdmins } = useAdminsContext()
    const {refetchAnomalousBatches} = useAnomalyContext()
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
    const [selectedProviders, setSelectedProviders] = useState<string[]>([])
    const [groupBy, setGroupBy] = useState<GroupBy>("region")
    const assignToRef = useRef<HTMLDivElement>(null);
    const [viewState, setViewState] = useState<ViewState>("grouping")

    useClickAway(assignToRef, () => {
        setIsVisible(false);
    })

    useEffect(()=>{
        if(assignToAdminSuccess){
            setIsVisible(false)
            refetchAnomalousBatches()
        }
    }, [assignToAdminSuccess])

    const GroupToComponentMapping: Record<AssignByGrouping, React.FC<{
        viewState: ViewState, 
        setViewState: (viewState: ViewState) => void,
        selectedRegions: string[],
        selectedDistricts: string[],
        selectedProviders: string[],
        setSelectedRegions: (selectedRegions: string[]) => void,
        setSelectedDistricts: (selectedDistricts: string[]) => void,
        setSelectedProviders: (selectedProviders: string[]) => void,
        groupBy: GroupBy,
        setGroupBy: (groupBy: GroupBy) => void
    }>> = {
        Region: Region,
        District: District,
        Provider: Providers,
    }
    
    const GroupBy = GroupToComponentMapping[grouping]
    
    const stateToComponentMapping: Record<ViewState, ReactNode> = {
        grouping: (
            <GroupBy 
                viewState={viewState} 
                setViewState={setViewState}
                selectedRegions={selectedRegions}
                selectedDistricts={selectedDistricts}
                selectedProviders={selectedProviders}
                setSelectedRegions={setSelectedRegions}
                setSelectedDistricts={setSelectedDistricts}
                setSelectedProviders={setSelectedProviders}
                groupBy={groupBy}
                setGroupBy={setGroupBy}
            />
        ),
        assigning: (
            <AdminSearch
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                selectedAdmin={selectedAdmin}
                setSelectedAdmin={setSelectedAdmin}
                selectedRegions={selectedRegions}
                selectedDistricts={selectedDistricts}
                selectedProviders={selectedProviders}
                groupBy={groupBy}
            />
        )
    }
    
    const StateComponent = stateToComponentMapping[viewState]

    const cleanup = () => {
        setSearchQuery("")
        setSelectedAdmin(null)
        setSelectedRegions([])
        setSelectedDistricts([])
        setSelectedProviders([])
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