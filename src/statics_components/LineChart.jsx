import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ data, dataType, region }) => {
    const labels = data.map(item => item.year.toString());

    const datasets = [];

    if (dataType === 'hunger' || dataType === 'both') {
        datasets.push({
            label: 'Hunger (Million People)',
            data: data.map(item => item.hunger),
            borderColor: '#E74C3C',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#E74C3C',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
        });
    }

    if (dataType === 'foodWaste' || dataType === 'both') {
        datasets.push({
            label: `Food Waste (${data[0]?.foodWasteUnit || 'Tonnes'})`,
            data: data.map(item => item.foodWaste),
            borderColor: '#FF7401',
            backgroundColor: 'rgba(255, 116, 1, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#FF7401',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            yAxisID: dataType === 'both' ? 'y1' : 'y'
        });
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: `${region} ${dataType === 'both' ? 'Hunger & Food Waste' : dataType === 'hunger' ? 'Hunger' : 'Food Waste'} Trends`,
                font: {
                    size: 16,
                    weight: 'bold'
                },
                color: '#FFFFFF'
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${value.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Year',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#FFFFFF'
                },
                grid: {
                    display: false
                },
                ticks: {
                    color: '#D1D5DB'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: dataType === 'hunger' ? 'Million People' : dataType === 'foodWaste' ? data[0]?.foodWasteUnit || 'Tonnes' : 'Million People',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#FFFFFF'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#D1D5DB'
                }
            },
            ...(dataType === 'both' && {
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: data[0]?.foodWasteUnit || 'Tonnes',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#FFFFFF'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        color: '#D1D5DB'
                    }
                }
            })
        },
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="h-96">
                <Line data={{ labels, datasets }} options={options} />
            </div>
        </div>
    );
};

export default LineChart; 