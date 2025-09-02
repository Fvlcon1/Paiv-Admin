'use client'

import SlideIn from '@styles/components/slidein';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import React, { useCallback, useEffect, useState } from 'react';
import StatusDistributionSkeleton from './status-distribution-skeleton';
import dynamic from 'next/dynamic';
import { useAnalyticsContext } from '../../context/context';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <StatusDistributionSkeleton />
});

const StatusDistributionChart = () => {
    const [chartOptions, setChartOptions] = useState<any>()
    const {isKpiSummaryPending, kpiSummary} = useAnalyticsContext()
    const {approved, partially_approved : partiallyApproved, flagged, rejected : declined} = kpiSummary?.status_breakdown || {}

    const inititializeChartOptions = useCallback(() => {
        setChartOptions({
            series: [approved || 0, partiallyApproved || 0, flagged || 0, declined || 0],
            labels: ['Approved', 'Partially Approved', 'Flagged', 'Declined',],
            colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444',],
            chart: {
                type: 'donut',
                width: 800,
                height: 300,
            },
            stroke: {
                width: 2,
                colors: theme.colors.bg.primaryLighter
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    donut: {
                        size: '50%',
                    },
                    customScale: 1,
                    offsetX: 0,
                    offsetY: 0,
                    expandOnClick: false,
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 2,
                        lineCap: 'round',
                        colors: [theme.colors.bg.primaryLighter]
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: undefined,
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                fontFamily: 'Montserrat',
                fontWeight: 500,
                show: false,
                color: theme.colors.text.tetiary,
            },
        })
    }, [approved, partiallyApproved, flagged, declined])

    useEffect(() => {
        console.log({ chartOptions })
    }, [chartOptions])

    useEffect(() => {
        inititializeChartOptions()
    }, [approved, partiallyApproved, flagged, declined])

    const legends = [
        {
            name: 'Approved',
            color: '#10B981',
            value: approved || 0
        },
        {
            name : "Partially Approved",
            color: '#3B82F6',
            value: partiallyApproved || 0
        },
        {
            name: 'Flagged',
            color: '#F59E0B',
            value: flagged || 0
        },
        {
            name: 'Declined',
            color: '#EF4444',
            value: declined || 0
        },
    ]

    if(isKpiSummaryPending) {
        return (
            <StatusDistributionSkeleton />
        )
    }

    return (
        <SlideIn
            delay={0.3}
            direction="bottom"
            className="w-[300px] relative  h-full flex-col rounded-xl bg-bg-primary-light px-4 items-center flex py-4"
        >
            {
                chartOptions && (
                    <>
                        <Text
                            textColor={theme.colors.text.primary}
                            bold={theme.typography.bold.md2}
                            size={theme.typography.size.HM}
                            
                        >
                            Status Distribution
                        </Text>

                        <div className='flex flex-col mt-[20px] items-center'>
                            <ReactApexChart
                                options={chartOptions as any}
                                series={(chartOptions as any).series}
                                type="donut"
                                height={300}
                            />
                            <div className="absolute bottom-[190px] flex flex-col gap-1 items-center">
                                <Text
                                    textColor={theme.colors.text.tetiary}
                                    // bold={theme.typography.bold.md}
                                >
                                    Total
                                </Text>
                                <Text
                                    textColor={theme.colors.main.primary}
                                    bold={theme.typography.bold.md2}
                                    size='30px'
                                    lineHeight={1}
                                >
                                    {(approved || 0) + (partiallyApproved || 0) + (flagged || 0) + (declined || 0)}
                                </Text>
                            </div>
                        </div>
                        <div className="absolute bottom-[20px] flex w-full flex-col gap-2">
                            {
                                legends.map((legend, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center w-full justify-between gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div 
                                                className="rounded-md py-1 px-2 flex"
                                                style={{ backgroundColor: legend.color }}
                                            >
                                                {/* <Text
                                                    textColor={theme.colors.bg.primary}
                                                    bold={theme.typography.bold.md}
                                                >
                                                    ↗ +3.2%
                                                </Text> */}
                                            </div>
                                            <Text
                                                textColor={legend.color}
                                                bold={theme.typography.bold.md}
                                            >
                                                {legend.name}
                                            </Text>
                                        </div>
                                        <Text
                                            textColor={legend.color}
                                            bold={theme.typography.bold.md}
                                        >
                                            {legend.value}
                                        </Text>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </SlideIn>
    );
};

export default StatusDistributionChart;
