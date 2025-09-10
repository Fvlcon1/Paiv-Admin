import { gradientClass } from "@/utils/constants";
import TableBody from "./table-body";
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { transformBatchesToTable } from "../utils/transform-batches";
import { BatchTable } from "../utils/types";
import { useHospitalContext } from "../context/hospital-context";
import NoData from "@components/NoData/noData";

interface ProviderData {
    batchId: string;
    batchProgress: string;
    totalClaims: string;
    expectedPayout: string;
}

const groupDataByYear = (): { years: string[], groupedData: BatchTable[][] } => {
    const { batches } = useHospitalContext()
    const batchData = transformBatchesToTable(batches || [])
    // Extract years from batchIds and find unique years
    const years = [...new Set(batchData.map(item => item.batchId.slice(-4)))];
    years.sort((a, b) => b.localeCompare(a)); // Sort years in descending order

    // Create an array to hold data for each year
    const groupedData: BatchTable[][] = Array.from({ length: years.length }, () => []);

    batchData.forEach((item: BatchTable) => {
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

    if (groupedData.length === 0) {
        return (
            <NoData />
        )
    }

    return (
        <div className="w-full flex flex-col gap-12 mt-2">
            {groupedData.map((group: BatchTable[], index: number) => (
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