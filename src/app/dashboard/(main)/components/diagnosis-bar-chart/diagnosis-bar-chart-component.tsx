import React from 'react';
import theme from '@styles/theme';
import { useDashboardContext } from '../../context/context';
import BarChartSkeleton from './chart-skeleton';
import dynamic from 'next/dynamic';
import useDiagnosisData from './hooks/useDiagnosisData';
import { hexOpacity } from '@/utils/hexOpacity';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <BarChartSkeleton />
});

const getShade = (opacity : number) => "#004f9e" + hexOpacity(opacity)

const DiagnosisBarChartComponent = () => {
    const { isDashboardDataPending } = useDashboardContext();
    const { series : dataseries, categories } = useDiagnosisData()

    const series = [
        {
            name: 'Diagnosis',
            data: dataseries,
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
            colors: [getShade(10), getShade(20), getShade(30), getShade(40), getShade(50), getShade(60), getShade(70), getShade(80), getShade(90), getShade(100)],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
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
                categories: categories,
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