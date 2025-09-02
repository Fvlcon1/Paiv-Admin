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
            name: 'Number of claims',
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
            title: {
                text: 'Diagnosis Codes',
                style: {
                    color: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat',
                    fontWeight: 500
                }
            },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                },
                formatter: function(value) {
                    // Truncate long diagnosis codes if needed
                    return value.length > 15 ? value.substring(0, 15) + '...' : value;
                }
            }
        },
        yaxis: {
            title: {
                text: 'Number of Claims',
                style: {
                    color: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat',
                    fontWeight: 500
                }
            },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                    fontFamily: 'Montserrat'
                },
                formatter: (value) => {
                    return value.toLocaleString();
                }
            }
        },
        legend: {
            show: false
        },
        grid: {
            borderColor: theme.colors.border.primary,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            x: {
                formatter: function(_, { dataPointIndex }) {
                    return categories[dataPointIndex] || '';
                }
            },
        },
        fill: {
            opacity: 1
        }
    };

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default DiagnosisBarChartComponent;