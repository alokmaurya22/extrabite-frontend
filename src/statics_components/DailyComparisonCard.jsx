import React from 'react';
import { Clock, Users, Utensils, AlertTriangle, CheckCircle } from 'lucide-react';

const DailyComparisonCard = ({ comparison }) => {
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    };

    const coveragePercentage = (comparison.peopleFed / comparison.dailyHungry) * 100;

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                    <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">Daily Impact Analysis</h3>
                    <p className="text-sm text-gray-300">{comparison.region} - {comparison.year}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-red-400" />
                        <span className="text-sm font-medium text-red-300">Daily Hungry People</span>
                    </div>
                    <div className="text-2xl font-bold text-red-200">{formatNumber(comparison.dailyHungry)}</div>
                    <div className="text-xs text-red-300 mt-1">People facing hunger daily</div>
                </div>

                <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <Utensils className="h-5 w-5 text-orange-400" />
                        <span className="text-sm font-medium text-orange-300">Could Be Fed</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-200">{formatNumber(comparison.peopleFed)}</div>
                    <div className="text-xs text-orange-300 mt-1">With current food waste</div>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                    {comparison.enoughFood ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                    <span className="text-sm font-medium text-gray-300">Coverage Analysis</span>
                </div>

                <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Food Waste Coverage</span>
                        <span>{coveragePercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${coveragePercentage >= 100 ? 'bg-green-500' : 'bg-orange-500'
                                }`}
                            style={{ width: `${Math.min(coveragePercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {!comparison.enoughFood && (
                    <div className="flex items-center gap-2 text-sm text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Still short by {formatNumber(comparison.shortBy)} people daily</span>
                    </div>
                )}

                {comparison.enoughFood && (
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>Food waste could potentially feed all hungry people</span>
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-400 leading-relaxed">
                <strong>Assumption:</strong> 0.5 kg of food per day feeds 1 person. This analysis shows the potential impact if food waste could be perfectly redistributed.
            </div>
        </div>
    );
};

export default DailyComparisonCard; 