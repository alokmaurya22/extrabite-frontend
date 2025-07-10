import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data, region }) => {
    const labels = data.map(item => item.year.toString());

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Hunger (Million People)',
                data: data.map(item => item.hunger),
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderColor: '#E74C3C',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: `Food Waste (${data[0]?.foodWasteUnit || 'Tonnes'})`,
                data: data.map(item => item.foodWaste),
                backgroundColor: 'rgba(255, 116, 1, 0.8)',
                borderColor: '#FF7401',
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
                yAxisID: 'y1'
            }
        ]
    };

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
                    pointStyle: 'rect',
                    padding: 20,
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: `${region} Hunger vs Food Waste Comparison`,
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
                    text: 'Million People',
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
        },
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="h-96">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart; 