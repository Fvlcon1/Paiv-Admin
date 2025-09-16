import { useEffect, useMemo, useState } from "react"
import { regions as allRegions } from "@/utils/regions"
import Button from "@components/button/button"
import { ViewState } from "./assign-by"
import Selectable from "@/app/components/selectable/selectable"
import { GroupBy } from "../../hooks/use-admins"
import { useAnomalyContext } from "../../context/anomaly-context"

const Providers = ({
    viewState,
    setViewState,
    groupBy,
    setGroupBy,
    selectedProviders,
    setSelectedProviders
}: {
    viewState: ViewState,
    setViewState: (viewState: ViewState) => void
    groupBy: GroupBy,
    setGroupBy: (groupBy: GroupBy) => void
    selectedProviders: string[],
    setSelectedProviders: (selectedProviders: string[]) => void
}) => {
    const {providers} = useAnomalyContext()

    const formatProviders = useMemo(() => providers?.map((provider : any) => ({
        label: provider.providerName,
        value: provider.providerId
    })), [providers])

    const handleProviderChange = (selectedProviders: string[]) => {
        setSelectedProviders(selectedProviders);
    };

    useEffect(()=>{
        setGroupBy("provider")
    }, [])

    return (
        <div className="flex flex-col gap-2 px-2">
            <Selectable
                items={formatProviders}
                onSelectionChange={handleProviderChange}
                selectedItems={selectedProviders}
            />
            <Button 
                text="Next"
                onClick={() => { setViewState("assigning") }}
                className="!w-full"
            />
        </div>
    )
}
export default Providers