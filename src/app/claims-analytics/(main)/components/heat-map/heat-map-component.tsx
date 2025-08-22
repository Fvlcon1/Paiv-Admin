import Text from "@styles/components/text"
import { useDashboardContext } from "../../context/context"
import ChartSkeleton from "./heat-map-skeleton"
import dynamic from "next/dynamic"
import theme from "@styles/theme"

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <ChartSkeleton />,
})

const HeatmapChartComponent = () => {
    const { isDashboardDataPending } = useDashboardContext()

    // Restructure data for heatmap format
    const series = [
        {
            name: "Submitted",
            data: [
                { x: "Jan", y: 31 },
                { x: "Feb", y: 40 },
                { x: "Mar", y: 28 },
                { x: "Apr", y: 51 },
                { x: "May", y: 42 },
                { x: "Jun", y: 109 },
                { x: "Jul", y: 100 },
                { x: "Aug", y: 120 },
                { x: "Sep", y: 82 },
                { x: "Oct", y: 91 },
                { x: "Nov", y: 110 },
                { x: "Dec", y: 95 },
            ],
        },
        {
            name: "Approved",
            data: [
                { x: "Jan", y: 11 },
                { x: "Feb", y: 32 },
                { x: "Mar", y: 45 },
                { x: "Apr", y: 32 },
                { x: "May", y: 34 },
                { x: "Jun", y: 52 },
                { x: "Jul", y: 41 },
                { x: "Aug", y: 80 },
                { x: "Sep", y: 62 },
                { x: "Oct", y: 71 },
                { x: "Nov", y: 90 },
                { x: "Dec", y: 65 },
            ],
        },
        {
            name: "Flagged",
            data: [
                { x: "Jan", y: 5 },
                { x: "Feb", y: 8 },
                { x: "Mar", y: 3 },
                { x: "Apr", y: 9 },
                { x: "May", y: 8 },
                { x: "Jun", y: 17 },
                { x: "Jul", y: 10 },
                { x: "Aug", y: 20 },
                { x: "Sep", y: 12 },
                { x: "Oct", y: 11 },
                { x: "Nov", y: 10 },
                { x: "Dec", y: 15 },
            ],
        },
        {
            name: "Declined",
            data: [
                { x: "Jan", y: 2 },
                { x: "Feb", y: 4 },
                { x: "Mar", y: 2 },
                { x: "Apr", y: 6 },
                { x: "May", y: 4 },
                { x: "Jun", y: 10 },
                { x: "Jul", y: 6 },
                { x: "Aug", y: 12 },
                { x: "Sep", y: 8 },
                { x: "Oct", y: 10 },
                { x: "Nov", y: 12 },
                { x: "Dec", y: 18 },
            ],
        },
    ]

    const options = {
        chart: {
            type: "heatmap",
            height: 450,
            toolbar: { show: false },
            foreColor: "#9CA3AF",
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ["#fff"],
                fontSize: "11px",
                fontFamily: "Montserrat",
                fontWeight: 500,
            },
        },
        colors: ["#6366F1"],
        plotOptions: {
            heatmap: {
                shadeIntensity: 0,
                radius: 4,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 20,
                            name: "Low",
                            color: "#E0E7FF", // Light blue
                        },
                        {
                            from: 21,
                            to: 50,
                            name: "Medium",
                            color: "#A5B4FC", // Medium blue
                        },
                        {
                            from: 51,
                            to: 80,
                            name: "High",
                            color: "#6366F1", // Primary blue
                        },
                        {
                            from: 81,
                            to: 120,
                            name: "Very High",
                            color: "#4338CA", // Dark blue
                        },
                    ],
                },
            },
        },
        xaxis: {
            type: "category",
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: "bottom",
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                    fontFamily: "Montserrat",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                },
            },
        },
        grid: {
            show: true,
        },
        legend: {
            show: false,
        },
        tooltip: {
            theme: "light",
            y: {
                formatter: (value: any) => value + " claims",
            },
            custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
                const claimType = w.globals.seriesNames[seriesIndex]
                const month = w.globals.categoryLabels[dataPointIndex]
                const value = series[seriesIndex][dataPointIndex]

                return `
                    <div class="px-3 py-2 bg-white border border-border-secondary rounded-lg shadow-lg">
                        <div class="font-medium text-gray-900 font-montserrat">${claimType}</div>
                        <div class="text-sm text-gray-600 font-montserrat">${value} claims</div>
                    </div>
                `
            },
        },
        states: {
            hover: {
                filter: {
                    type: "darken",
                    value: 0.9,
                },
            },
        },
        stroke: {
            width: 1,
            colors: ["#fff"],
        }
    }

    return (
        <div className="w-full">
            <Chart options={options as any} series={series} type="heatmap" height={400} />

            {/* Custom Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#E0E7FF] border border-border-secondary"></div>
                    <Text textColor={theme.colors.text.tetiary}>Low (0-20)</Text>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#A5B4FC] border border-border-secondary"></div>
                    <Text textColor={theme.colors.text.tetiary}>Medium (21-50)</Text>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#6366F1] border border-border-secondary"></div>
                    <Text textColor={theme.colors.text.tetiary}>High (51-80)</Text>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#4338CA] border border-border-secondary"></div>
                    <Text textColor={theme.colors.text.tetiary}>Very High (81+)</Text>
                </div>
            </div>
        </div>
    )
}

export default HeatmapChartComponent
