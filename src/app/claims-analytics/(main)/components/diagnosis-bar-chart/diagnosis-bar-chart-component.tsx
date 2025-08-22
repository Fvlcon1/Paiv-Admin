import React from 'react';
import theme from '@styles/theme';
import { useDashboardContext } from '../../context/context';
import BarChartSkeleton from './chart-skeleton';
import dynamic from 'next/dynamic';
import useDiagnosisData from './hooks/useDiagnosisData';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <BarChartSkeleton />
});

const barColors = [
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#84CC16', // Lime
    '#06B6D4', // Cyan
    '#A855F7', // Purple
    '#EAB308'  // Yellow
];

const DiagnosisBarChartComponent = () => {
    const { isDashboardDataPending } = useDashboardContext();
    const { series: dataseries, categories, diagnosisCodes } = useDiagnosisData();

    const series = [
        {
            name: 'Diagnosis',
            data: dataseries,
        },
    ];

    const options : ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: { show: false },
            foreColor: '#9CA3AF'
        },
        colors: barColors,
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4,
                distributed: true,
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
            categories: diagnosisCodes,
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
            customLegendItems: categories
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

    return <Chart options={options} series={series} type="bar" height={450} />;
};

export default DiagnosisBarChartComponent;