import theme from "@styles/theme"
import { useDashboardContext } from "../../context/context"
import BarChartSkeleton from "./chart-skeleton"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <BarChartSkeleton />,
})

const RadarChartComponent = () => {
    const { isDashboardDataPending } = useDashboardContext()

    const series = [
        {
            name: "Submitted",
            data: [31, 40, 28, 51, 42, 109, 100, 120, 82, 91, 110, 95],
        },
        {
            name: "Approved",
            data: [11, 32, 45, 32, 34, 52, 41, 80, 62, 71, 90, 65],
        },
        {
            name: "Flagged",
            data: [5, 8, 3, 9, 8, 17, 10, 20, 12, 11, 10, 15],
        },
        {
            name: "Declined",
            data: [2, 4, 2, 6, 4, 10, 6, 12, 8, 10, 12, 18],
        },
    ]

    const options = {
        chart: {
            type: "radar",
            height: 450,
            toolbar: { show: false },
            foreColor: "#9CA3AF",
        },
        colors: ["#6366F1", "#10B981", "#EF4444", "#FF9500"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            curve: "smooth",
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            strokeColors: "#fff",
            hover: {
                size: 6,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "12px",
                    fontFamily: "Montserrat",
                },
            },
        },
        yaxis: {
            show: true,
            min: 0,
            max: 130, // Adjust based on your data range
            tickAmount: 5,
            labels: {
                style: {
                    colors: "#6B7280",
                    fontSize: "10px",
                    fontFamily: "Montserrat",
                },
            },
        },
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "12px",
            fontWeight: 500,
            fontFamily: "Montserrat",
            markers: {
                radius: 4,
                width: 8,
                height: 8,
            },
        },
        grid: {
            show: true,
            borderColor: theme.colors.border.primary,
            strokeDashArray: 2,
        },
        tooltip: {
            theme: "light",
            y: {
                formatter: (value: any) => value + " claims",
            },
        },
        fill: {
            opacity: 0.1,
            type: "solid",
        },
        plotOptions: {
            radar: {
                size: 140,
                polygons: {
                    strokeColors: theme.colors.border.primary,
                    strokeWidth: 1,
                    connectorColors: theme.colors.border.primary,
                    fill: {
                        colors: ["transparent"],
                    },
                },
            },
        },
    }

    return <Chart options={options as any} series={series} type="radar" height={450} />
}

export default RadarChartComponent