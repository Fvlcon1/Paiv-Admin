import SlideIn from '@styles/components/slidein';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StatusDistributionChart = () => {
    const chartOptions = {
        series: [942, 200, 40],
        labels: ['Approved', 'Flagged', 'Declined'],
        colors: ['#10B981', '#F59E0B', '#EF4444'],
        chart: {
            type: 'donut',
            width: 800,
            height: 300,
        },
        stroke: {
            width: 2,
            colors: theme.colors.bg.primaryLight
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                // offsetY: 10,
                donut: {
                    size: '75%',
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
            // markers: {
            //     width: 12,
            //     height: 12,
            //     radius: 3,
            // },
            // itemMargin: {
            //     horizontal: 4,
            //     vertical: 4
            // }
        },
    };

    const legends = [
        {
            name: 'Approved',
            color: '#10B981',
        },
        {
            name: 'Flagged',
            color: '#F59E0B',
        },
        {
            name: 'Declined',
            color: '#EF4444',
        },
    ]

    return (
        <SlideIn
            delay={0.3}
            direction="bottom"
            className="w-[300px] relative  h-[205px] flex-col rounded-xl border-[1px] border-border-secondary bg-bg-primary-light px-4 items-center flex py-4"
        >
            <Text
                textColor={theme.colors.main.primary}
                bold={theme.typography.bold.md2}
            >
                Status Distribution
            </Text>
            <ReactApexChart
                options={chartOptions as any}
                series={chartOptions.series}
                type="donut"
                height={200}
            />
            <div className="absolute bottom-[60px] flex flex-col gap-1 items-center">
                <Text
                    textColor={theme.colors.main.primary}
                    bold={theme.typography.bold.md2}
                    size='30px'
                    lineHeight={1}
                >
                    1,248
                </Text>
                <Text
                    textColor={theme.colors.main.primary}
                    bold={theme.typography.bold.md}
                >
                    Claims
                </Text>
            </div>
            <div className="absolute bottom-4 flex items-center gap-2">
                {
                    legends.map((legend, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2"
                        >
                            <div
                                className="rounded-[3px] w-[12px] h-[12px]"
                                style={{
                                    backgroundColor: legend.color
                                }}
                            />
                            <Text
                                textColor={theme.colors.text.secondary}
                            >
                                {legend.name}
                            </Text>
                        </div>
                    ))
                }
            </div>
        </SlideIn>
    );
};

export default StatusDistributionChart;
