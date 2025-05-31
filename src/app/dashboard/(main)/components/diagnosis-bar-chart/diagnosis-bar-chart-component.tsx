import React from 'react';
import theme from '@styles/theme';
import { useDashboardContext } from '../../context/context';
import BarChartSkeleton from './chart-skeleton';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <BarChartSkeleton />
});

const DiagnosisBarChartComponent = () => {
    const { isDashboardDataPending } = useDashboardContext();

    const series = [
        {
            name: 'Diagnosis',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: { show: false },
            foreColor: '#9CA3AF'
        },
        colors: ['#6366F1', '#10B981', '#EF4444', '#FF9500'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                borderRadius: 4,
            },
        },
        dataLabels: { 
            enabled: false 
        },
        stroke: { 
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Paracetamol', 'Aspirin', 'Ibuprofen', 'Cetirizine', 'Amoxicillin', 'Lisinopril', 'Simvastatin', 'Metformin', 'Omeprazole', 'Warfarin'],
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
            markers: { radius: 0 }
        },
        grid: {
            borderColor: theme.colors.border.primary,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
        },
        fill: {
            opacity: 1
        }
    };

    return <Chart options={options as any} series={series} type="bar" height={450} />;
};

export default DiagnosisBarChartComponent;