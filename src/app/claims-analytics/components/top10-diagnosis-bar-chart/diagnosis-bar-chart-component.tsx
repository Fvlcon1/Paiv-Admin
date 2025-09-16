import React from 'react';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import useDiagnosisData from './hooks/useDiagnosisData';
import { ApexOptions } from 'apexcharts';
import BarChartSkeleton from '../skeletons/barchart-skeleton';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <BarChartSkeleton />
});

const barColors = [
    "#149ECE",
    "#A7C636",
    "#9E559C",
    "#FC921F",
    "#FFDE3E",
    "#54994D",
    "#B7814A",
    "#6B6BD6",
    "#B54779",
    "#7F7F7F"
];

const DiagnosisBarChartComponent = () => {
    const { series: dataseries, categories, diagnosisCodes } = useDiagnosisData();

    const series = [
        {
            name: 'Percentage of claims',
            data: dataseries,
        },
    ];

    // Format the categories for y-axis labels with their corresponding diagnosis codes
    const yaxisLabels = diagnosisCodes.map((code, index) => ({
        offsetY: 0,
        style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            minWidth: 120,
            maxWidth: 200
        },
        text: code.length > 15 ? code.substring(0, 15) + '...' : code
    }));

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
                horizontal: true,
                barHeight: '90%',
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
                },
                formatter: function(value) {
                    // return value.length > 15 ? value.substring(0, 15) + '...' : value;
                    return `${value.toLocaleString()}%`;
                }
            },
            position: 'bottom',
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                },
                formatter: (value) => {
                    return `${value.toLocaleString()}`;
                }
            }
        },
        legend: {
            show: false
        },
        grid: {
            borderColor: theme.colors.border.primary,
            strokeDashArray: 4,
            yaxis: { lines: { show: false } },
            xaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            x: {
                formatter: function(_, { dataPointIndex }) {
                    return categories[dataPointIndex] || '';
                }
            },
            y: {
                formatter : function(_, { dataPointIndex }) {
                    return `${dataseries[dataPointIndex]}%` || '0%';
                }
            }
        },
        fill: {
            opacity: 1
        }
    };

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default DiagnosisBarChartComponent;