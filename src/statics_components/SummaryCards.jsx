import React from 'react';
import { Users, Trash2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const SummaryCards = ({ summary }) => {
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const cards = [
        {
            title: 'Hungry People',
            value: summary.hunger,
            unit: 'Million',
            icon: Users,
            color: 'from-red-500 to-red-600',
            trend: summary.cagrHunger,
            description: `${summary.region} hunger statistics for ${summary.year}`
        },
        {
            title: 'Food Waste',
            value: summary.foodWaste,
            unit: summary.foodWasteUnit,
            icon: Trash2,
            color: 'from-orange-500 to-orange-600',
            trend: summary.cagrFoodWaste,
            description: `Total food waste in ${summary.region}`
        },
        {
            title: 'Daily Hungry',
            value: summary.dailyHungry,
            unit: 'People/Day',
            icon: AlertTriangle,
            color: 'from-amber-500 to-amber-600',
            trend: null,
            description: 'People facing hunger daily'
        },
        {
            title: 'People Fed Daily',
            value: summary.peopleFed,
            unit: 'People/Day',
            icon: summary.enoughFood ? CheckCircle : AlertTriangle,
            color: summary.enoughFood ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600',
            trend: null,
            description: 'People that could be fed with wasted food'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                            <card.icon className="h-6 w-6 text-white" />
                        </div>
                        {card.trend !== null && (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${card.trend > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {card.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {Math.abs(card.trend)}% CAGR
                            </div>
                        )}
                    </div>

                    <h3 className="text-sm font-medium text-gray-300 mb-1">{card.title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{formatNumber(card.value)}</span>
                        <span className="text-sm text-gray-400">{card.unit}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{card.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards; 