export const DashboardChartOptions = (data, convertCurrency) => {
    return {
        series: [
            {
                name: 'Revenue',
                data: data?.revenues || [],
                color: '#0da487',
            },
            {
                name: 'Comission',
                data: data?.commissions || [],
                color: '#FFA53B',
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    top: 10,
                    left: 0,
                    blur: 3,
                    color: '#720f1e',
                    opacity: 0.1,
                },
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                strokeWidth: 4,
                strokeColors: '#ffffff',
                hover: {
                    size: 9,
                },
            },
            stroke: {
                curve: 'smooth',
                lineCap: 'butt',
                width: 4,
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            legend: {
                show: false,
            },
            responsive: [
                {
                    breakpoint: 1200,
                    options: {
                        grid: {
                            padding: {
                                right: -95,
                            },
                        },
                    },
                },
                {
                    breakpoint: 992,
                    options: {
                        grid: {
                            padding: {
                                right: -69,
                            },
                        },
                    },
                },
                {
                    breakpoint: 767,
                    options: {
                        chart: {
                            height: 200,
                        },
                    },
                },
                {
                    breakpoint: 576,
                    options: {
                        yaxis: {
                            labels: {
                                show: false,
                            },
                        },
                    },
                },
            ],
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return convertCurrency(value);
                    },
                },
            },
            xaxis: {
                categories: data?.months || [],
                range: undefined,
                axisBorder: {
                    offsetX: 0,
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
        },
    }
}