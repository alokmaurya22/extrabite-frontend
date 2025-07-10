import { useState, useEffect } from 'react';
import Nav from '../components/Header/Nav';
import Nav2 from '../components/Header/Nav2';
import Footer from '../components/Footer/Footer';
import SummaryCards from '../statics_components/SummaryCards';
import DailyComparisonCard from '../statics_components/DailyComparisonCard';
import DataTable from '../statics_components/DataTable';
import FilterPanel from '../statics_components/FilterPanel';
import BarChart from '../statics_components/BarChart';
import LineChart from '../statics_components/LineChart';
import PieChart from '../statics_components/PieChart';
import StatisticsInsights from '../statics_components/StatisticsInsights';
import {
    getYearlyStatistics,
    getStatisticsSummary,
    getDailyComparisonStatistics,
    getFoodWasteSourcesStatistics
} from '../util/api';
import { isLoggedIn } from '../util/auth';

const StaticsDisplay = () => {
    // State for filters
    const [region, setRegion] = useState('India');
    const [startYear, setStartYear] = useState(2020);
    const [endYear, setEndYear] = useState(2025);
    const [dataType, setDataType] = useState('both');

    // State for data
    const [yearlyData, setYearlyData] = useState([]);
    const [summary, setSummary] = useState(null);
    const [dailyComparison, setDailyComparison] = useState(null);
    const [foodWasteSources, setFoodWasteSources] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [yearlyRes, summaryRes, dailyRes, sourcesRes] = await Promise.all([
                    getYearlyStatistics({
                        dataType,
                        region,
                        startYear,
                        endYear
                    }),
                    getStatisticsSummary({
                        region,
                        year: endYear
                    }),
                    getDailyComparisonStatistics({
                        region,
                        year: endYear
                    }),
                    getFoodWasteSourcesStatistics({
                        region,
                        year: endYear
                    })
                ]);

                setYearlyData(yearlyRes);
                setSummary(summaryRes);
                setDailyComparison(dailyRes);
                setFoodWasteSources(sourcesRes);
            } catch (err) {
                console.error('Error fetching statistics:', err);
                setError('Failed to load statistics data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [region, startYear, endYear, dataType]);

    if (loading) {
        return (
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
                {isLoggedIn() ? <Nav2 /> : <Nav />}
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-300 text-lg">Loading statistics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        console.error('Error fetching statistics:', error);
        return (
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
                {isLoggedIn() ? <Nav2 /> : <Nav />}
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <p className="text-red-400 text-lg mb-2">Error Loading Data</p>
                        <p className="text-gray-400">{error}</p>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <>
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
                {isLoggedIn() ? <Nav2 /> : <Nav />}

                <div className="flex-grow px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                                Hunger & Food Waste Statistics
                            </h1>
                            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                                Comprehensive analysis of global and Indian hunger and food waste data to drive awareness and action
                            </p>
                        </div>

                        {/* Filter Panel */}
                        <FilterPanel
                            region={region}
                            setRegion={setRegion}
                            startYear={startYear}
                            setStartYear={setStartYear}
                            endYear={endYear}
                            setEndYear={setEndYear}
                            dataType={dataType}
                            setDataType={setDataType}
                        />

                        {/* Summary Cards */}
                        {summary && <SummaryCards summary={summary} />}

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Bar Chart */}
                            {yearlyData.length > 0 && <BarChart data={yearlyData} region={region} />}

                            {/* Line Chart */}
                            {yearlyData.length > 0 && <LineChart data={yearlyData} dataType={dataType} region={region} />}
                        </div>

                        {/* Pie Chart */}
                        {foodWasteSources && (
                            <div className="mb-8">
                                <PieChart data={foodWasteSources} region={region} />
                            </div>
                        )}

                        {/* Daily Comparison Card */}
                        {dailyComparison && (
                            <div className="mb-8">
                                <DailyComparisonCard comparison={dailyComparison} />
                            </div>
                        )}

                        {/* Statistics Insights */}
                        {summary && yearlyData.length > 0 && (
                            <StatisticsInsights summary={summary} yearlyData={yearlyData} region={region} />
                        )}

                        {/* Data Table */}
                        {yearlyData.length > 0 && <DataTable data={yearlyData} region={region} />}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default StaticsDisplay; 