'use client'

import React from 'react';
import theme from '@styles/theme';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import LineChartSkeleton from '../skeletons/line-chart-skeleton';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <LineChartSkeleton />
});

const ChartComponent = ({
    isLineChartDataPending,
    lineChartSeries,
}: {
    isLineChartDataPending: boolean
    lineChartSeries: any
}) => {
    if (isLineChartDataPending) {
        return <LineChartSkeleton />
    }

    const series = lineChartSeries

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: false },
            foreColor: '#9CA3AF'
        },
        colors: ['#226161', '#DF448F',],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        markers: {
            size: 5,
            strokeWidth: 0,
            hover: {
                size: 7
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                    fontSize: '10px',
                    fontFamily: 'Montserrat'
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
                    fontSize: '10px',
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

    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={350}
        />
    )
};

export default ChartComponent;
