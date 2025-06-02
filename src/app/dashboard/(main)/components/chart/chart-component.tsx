import React from 'react';
import theme from '@styles/theme';
import ChartSkeleton from './chart-skeleton';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import useLineChart from './hooks/useLineChart';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <ChartSkeleton />
});

const ClaimsTimelineChart = () => {
    const { lineChartSeries, isLineChartDataPending } = useLineChart()

    if (isLineChartDataPending) {
        return <ChartSkeleton />
    }

    const series = lineChartSeries ?? [
        {
            name: 'Submitted',
            data: [31, 40, 28, 51, 42, 109, 100, 120, 82, 91, 110, 95]
        },
        {
            name: 'Approved',
            data: [11, 32, 45, 32, 34, 52, 41, 80, 62, 71, 90, 65]
        },
        {
            name: 'Flagged',
            data: [5, 8, 3, 9, 8, 17, 10, 20, 12, 11, 10, 15]
        },
        {
            name: 'Declined',
            data: [2, 4, 2, 6, 4, 10, 6, 12, 8, 10, 12, 18]
        },
    ];

    const options : ApexOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: false },
            foreColor: '#9CA3AF'
        },
        colors: ['#6366F1', '#10B981', '#EF4444', '#FF9500'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                }
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Montserrat',
            markers: { shape: 'square' }
        },
        grid: {
            borderColor: theme.colors.border.primary,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (value: any) {
                    return value + ' claims';
                }
            }
        }
    };

    return <Chart options={options as any} series={series} type="area" height={450} />;
};

export default ClaimsTimelineChart;
