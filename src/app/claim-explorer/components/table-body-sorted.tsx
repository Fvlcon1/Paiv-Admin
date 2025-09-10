import { gradientClass } from "@/utils/constants";
import TableBody from "./table-body";
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useExplorerContext } from "../context/explorer-context"
import { data } from "./data";
import { extractProviderProfile, transformProvidersToTable } from "../utils/transform-providers";
import { ProviderTable } from "../utils/types";
import { useEffect } from "react";

const TableBodySorted = ({ }) => {
    const { providers } = useExplorerContext()
    const providerProfiles = transformProvidersToTable(providers || [])

    const groupDataByProviderName = (): ProviderTable[][] => {
        const groupedData: ProviderTable[][] = Array.from({ length: 26 }, () => []);
    
        providerProfiles?.forEach((item: ProviderTable) => {
            const firstLetter = item.providerName?.charAt(0).toUpperCase();
            const index = firstLetter?.charCodeAt(0) - 'A'.charCodeAt(0);
            if (index >= 0 && index < 26) {
                groupedData[index].push(item);
            }
        });
    
        return groupedData;
    };
    const groupedData = groupDataByProviderName();

    useEffect(() => {
        console.log({providers})
    }, [providers])

    return (
        <div className="w-full flex flex-col gap-12">
            {groupedData.map((group, index) => (
                group.length > 0 ? (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <div className="w-[30px] h-[1px] bg-border-primary" />
                            <div className="rounded-full bg-cyan-600/10 w-7 h-7 flex items-center justify-center">
                                <Text
                                    className={gradientClass}
                                    bold={theme.typography.bold.md2}
                                >
                                    {String.fromCharCode(index + 65)}
                                </Text>
                            </div>
                        </div>
                        <div className="px-4"><TableBody data={group} /></div>
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default TableBodySorted