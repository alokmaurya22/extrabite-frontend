import { TrendingUp, TrendingDown, Target, AlertCircle, Lightbulb, BarChart3 } from 'lucide-react';

const StatisticsInsights = ({ summary, yearlyData, region }) => {
    if (!summary || !yearlyData || yearlyData.length === 0) return null;



    // Calculate additional insights
    const currentYear = summary.year;
    const previousYear = currentYear - 1;
    const previousYearData = yearlyData.find(item => item.year === previousYear);

    const hungerChange = previousYearData
        ? ((summary.hunger - previousYearData.hunger) / previousYearData.hunger * 100).toFixed(1)
        : 0;

    const foodWasteChange = previousYearData
        ? ((summary.foodWaste - previousYearData.foodWaste) / previousYearData.foodWaste * 100).toFixed(1)
        : 0;

    const efficiencyRatio = summary.foodWaste > 0 ? (summary.hunger / summary.foodWaste).toFixed(2) : 0;

    const potentialImpact = summary.foodWaste * 2000; // 1 tonne feeds 2000 people per day
    const impactPercentage = summary.dailyHungry > 0 ? (potentialImpact / summary.dailyHungry * 100).toFixed(1) : 0;

    const insights = [
        {
            title: 'Hunger Trend',
            value: `${hungerChange > 0 ? '+' : ''}${hungerChange}%`,
            description: `vs ${previousYear}`,
            icon: hungerChange > 0 ? TrendingUp : TrendingDown,
            color: hungerChange > 0 ? 'text-red-400' : 'text-green-400',
            bgColor: hungerChange > 0 ? 'bg-red-500/10' : 'bg-green-500/10',
            borderColor: hungerChange > 0 ? 'border-red-500/20' : 'border-green-500/20'
        },
        {
            title: 'Food Waste Trend',
            value: `${foodWasteChange > 0 ? '+' : ''}${foodWasteChange}%`,
            description: `vs ${previousYear}`,
            icon: foodWasteChange > 0 ? TrendingUp : TrendingDown,
            color: foodWasteChange > 0 ? 'text-orange-400' : 'text-green-400',
            bgColor: foodWasteChange > 0 ? 'bg-orange-500/10' : 'bg-green-500/10',
            borderColor: foodWasteChange > 0 ? 'border-orange-500/20' : 'border-green-500/20'
        },
        {
            title: 'Efficiency Ratio',
            value: efficiencyRatio,
            description: 'Hunger per unit of waste',
            icon: Target,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            title: 'Potential Impact',
            value: `${impactPercentage}%`,
            description: 'Could feed hungry people',
            icon: Lightbulb,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20'
        }
    ];

    const recommendations = [
        {
            title: 'Immediate Action',
            description: summary.enoughFood
                ? 'Food waste could potentially feed all hungry people if properly redistributed.'
                : 'Food waste alone cannot meet current hunger needs. Additional food production or redistribution strategies needed.',
            icon: AlertCircle,
            color: summary.enoughFood ? 'text-green-400' : 'text-red-400'
        },
        {
            title: 'Long-term Strategy',
            description: `Focus on reducing food waste by ${Math.abs(foodWasteChange).toFixed(1)}% annually to improve efficiency.`,
            icon: BarChart3,
            color: 'text-blue-400'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Key Insights */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                    Key Insights for {region} ({currentYear})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {insights.map((insight, index) => (
                        <div key={index} className={`${insight.bgColor} rounded-lg p-4 border ${insight.borderColor}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                                <span className="text-sm font-medium text-gray-300">{insight.title}</span>
                            </div>
                            <div className={`text-2xl font-bold ${insight.color}`}>{insight.value}</div>
                            <div className="text-xs text-gray-400 mt-1">{insight.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Strategic Recommendations</h3>

                <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <rec.icon className={`h-5 w-5 ${rec.color} mt-0.5`} />
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">{rec.title}</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">{rec.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Data Context */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Data Context & Assumptions</h3>
                <div className="text-sm text-gray-300 space-y-2">
                    <p>• <strong>Hunger Data:</strong> Based on FAO SOFI Reports and Global Hunger Index</p>
                    <p>• <strong>Food Waste Data:</strong> From UNEP Food Waste Index and national reports</p>
                    <p>• <strong>Efficiency Assumption:</strong> 0.5 kg of food per day feeds 1 person</p>
                    <p>• <strong>Waste Distribution:</strong> Households (61%), Food Services (26%), Retail (10%), Post-Harvest (3%)</p>
                    <p>• <strong>CAGR Calculation:</strong> Compound Annual Growth Rate from 2015-2025</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsInsights; 