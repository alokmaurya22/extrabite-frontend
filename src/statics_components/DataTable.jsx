import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Download } from 'lucide-react';

const DataTable = ({ data, region }) => {
    const [sortColumn, setSortColumn] = useState('year');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return sortDirection === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
    });

    const exportData = () => {
        const csvContent = [
            ['Year', 'Hunger (Million People)', `Food Waste (${data[0]?.foodWasteUnit})`, 'Households', 'Food Services', 'Retail', 'Post-Harvest & Agriculture'],
            ...sortedData.map(item => [
                item.year,
                item.hunger,
                item.foodWaste,
                item.foodWasteBreakdown.Households.toFixed(1),
                item.foodWasteBreakdown['Food Services'].toFixed(1),
                item.foodWasteBreakdown.Retail.toFixed(1),
                item.foodWasteBreakdown['Post-Harvest & Agriculture'].toFixed(1)
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${region}_hunger_food_waste_data.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const SortIcon = ({ column }) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{region} Data Table</h3>
                <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => handleSort('year')}
                            >
                                <div className="flex items-center gap-2">
                                    Year
                                    <SortIcon column="year" />
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => handleSort('hunger')}
                            >
                                <div className="flex items-center gap-2">
                                    Hunger (Million People)
                                    <SortIcon column="hunger" />
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => handleSort('foodWaste')}
                            >
                                <div className="flex items-center gap-2">
                                    Food Waste ({data[0]?.foodWasteUnit})
                                    <SortIcon column="foodWaste" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Households
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Food Services
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Retail
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Post-Harvest & Agriculture
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gray-700">
                        {sortedData.map((item, index) => (
                            <tr key={item.year} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.hunger.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.foodWaste.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.foodWasteBreakdown.Households.toFixed(1)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.foodWasteBreakdown['Food Services'].toFixed(1)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.foodWasteBreakdown.Retail.toFixed(1)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{item.foodWasteBreakdown['Post-Harvest & Agriculture'].toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable; 