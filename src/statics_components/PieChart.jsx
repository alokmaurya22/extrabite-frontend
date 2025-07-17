
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, region }) => {
    const breakdown = data.sourceBreakdown || data.foodWasteBreakdown;

    // Check if breakdown is a valid object before proceeding
    if (!breakdown || typeof breakdown !== 'object' || Object.keys(breakdown).length === 0) {
        return null;
    }

    const chartData = {
        labels: Object.keys(breakdown),
        datasets: [
            {
                data: Object.values(breakdown),
                backgroundColor: [
                    '#FFFFFF',
                    '#2ECC71',
                    '#F4D03F',
                    '#E67E22',
                ],
                borderColor: [
                    '#FFFFFF',
                    '#2ECC71',
                    '#F4D03F',
                    '#E67E22',
                ],
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: {
                        size: 12
                    },
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: `${region} Food Waste Sources (${data.year || 'Current Year'})`,
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
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value.toFixed(1)} (${percentage}%)`;
                    }
                }
            }
        },
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="h-96">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PieChart; 