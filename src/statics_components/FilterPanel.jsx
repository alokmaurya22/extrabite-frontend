import React from 'react';
import { Calendar, Globe, Filter } from 'lucide-react';

const FilterPanel = ({
    region,
    setRegion,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
    dataType,
    setDataType
}) => {
    const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-white">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Region Filter */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Globe className="h-4 w-4" />
                        Region
                    </label>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-800 text-white"
                    >
                        <option value="India">India</option>
                        <option value="Global">Global</option>
                    </select>
                </div>

                {/* Start Year Filter */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="h-4 w-4" />
                        Start Year
                    </label>
                    <select
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-800 text-white"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* End Year Filter */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="h-4 w-4" />
                        End Year
                    </label>
                    <select
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-800 text-white"
                    >
                        {years.filter(year => year >= startYear).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Data Type Filter */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Filter className="h-4 w-4" />
                        Data Type
                    </label>
                    <select
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                        className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-800 text-white"
                    >
                        <option value="both">Both</option>
                        <option value="hunger">Hunger Only</option>
                        <option value="foodWaste">Food Waste Only</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel; 