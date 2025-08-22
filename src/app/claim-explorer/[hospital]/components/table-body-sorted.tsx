import { gradientClass } from "@/utils/constants";
import { data } from "./data"
import TableBody from "./table-body";
import Text from "@styles/components/text"
import theme from "@styles/theme"

interface ProviderData {
    batchId: string;
    batchProgress: string;
    totalClaims: string;
    expectedPayout: string;
}

const groupDataByYear = (): { years: string[], groupedData: ProviderData[][] } => {
    // Extract years from batchIds and find unique years
    const years = [...new Set(data.map(item => item.batchId.slice(-4)))];
    years.sort((a, b) => b.localeCompare(a)); // Sort years in descending order
    
    // Create an array to hold data for each year
    const groupedData: ProviderData[][] = Array.from({ length: years.length }, () => []);
    
    data.forEach((item: ProviderData) => {
        const year = item.batchId.slice(-4);
        const yearIndex = years.indexOf(year);
        if (yearIndex >= 0 && yearIndex < groupedData.length) {
            groupedData[yearIndex].push(item);
        }
    });

    return { years, groupedData };
};

const TableBodySorted = () => {
    const { years, groupedData } = groupDataByYear();

    return (
        <div className="w-full flex flex-col gap-12 mt-2">
            {groupedData.map((group: ProviderData[], index: number) => (
                group.length > 0 ? (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <div className="w-[20px] h-[1px] bg-border-primary" />
                            <div className="rounded-md bg-cyan-600/10 px-2 py-0.5 flex items-center justify-center">
                                <Text
                                    className={gradientClass}
                                    bold={theme.typography.bold.md2}
                                >
                                    {years[index]}
                                </Text>
                            </div>
                        </div>
                        <div className="px-0"><TableBody data={group} /></div>
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default TableBodySorted