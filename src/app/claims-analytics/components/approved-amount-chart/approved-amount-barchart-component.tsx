import React from 'react';
import BarChartSkeleton from '../skeletons/barchart-skeleton';
import dynamic from 'next/dynamic';
import useApprovedAmountData from './hooks/use-approved-amount';
import { ApexOptions } from 'apexcharts';
import theme from '../../../styles/theme';

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
    "7F7F7F"
];

const ApprovedAmountBarChartComponent = () => {
    const { series: dataseries, categories, diagnosisCodes } = useApprovedAmountData();

    const series = [
        {
            name: 'Amount',
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
                text: 'Months',
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
                }
            }
        },
        yaxis: {
            title: {
                text: 'Amount (GHS)',
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
                    return `${value.toLocaleString()}`;
                }
            }
        },
        legend: {
            // position: 'bottom',
            // horizontalAlign: 'center',
            // fontSize: '12px',
            // fontWeight: 500,
            // fontFamily: 'Montserrat',
            // customLegendItems: categories,
            show: false
        },
        grid: {
            borderColor: theme.colors.border.primary,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function(value) {
                    return `GHS ${value.toLocaleString()}`;
                }
            }
        },
        fill: {
            opacity: 1
        }
    };

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default ApprovedAmountBarChartComponent;