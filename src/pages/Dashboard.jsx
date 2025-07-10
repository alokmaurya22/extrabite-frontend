import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';
import { isLoggedIn } from '../util/auth';
import {
    getUserProfile,
    getUserAnalyticsSummary,
    getUserDonationsAnalytics,
    getMyDonations,
    getMyReceivedRequests
} from '../util/api';
import {
    LineChart,
    PieChart
} from '@mui/x-charts';
import {
    Users,
    Package,
    Star,
    Clock,
    MapPin,
    Activity,
    Award,
    Heart,
    Target
} from 'lucide-react';

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const [analyticsSummary, setAnalyticsSummary] = useState({
        myDonations: 0,
        myFoodRequests: 0,
        myRatingsGiven: 0,
        myRatingsReceived: 0
    });
    const [donationsData, setDonationsData] = useState([]);
    const [recentDonations, setRecentDonations] = useState([]);
    const [recentRequests, setRecentRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        // Check if user is logged in
        if (!isLoggedIn()) {
            navigate('/signin');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch all dashboard data in parallel
                const [
                    profileData,
                    summaryData,
                    donationsAnalytics,
                    myDonations,
                    myRequests
                ] = await Promise.all([
                    getUserProfile(),
                    getUserAnalyticsSummary(),
                    getUserDonationsAnalytics(),
                    getMyDonations(),
                    getMyReceivedRequests()
                ]);

                setUserProfile(profileData);
                setAnalyticsSummary(summaryData);
                setDonationsData(donationsAnalytics);
                setRecentDonations(myDonations.slice(0, 5)); // Show last 5 donations
                setRecentRequests(myRequests.slice(0, 5)); // Show last 5 requests

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                alert('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (loading) {
        return (
            <>
                <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex items-center justify-center">
                    <div className="text-white text-xl">Loading your dashboard...</div>
                </div>
            </>
        );
    }

    // Prepare chart data
    const donationsChartData = donationsData.map(item => ({
        month: item.month,
        donations: item.donations
    }));

    const pieChartData = [
        { label: 'Donations', value: analyticsSummary?.myDonations || 8, color: '#E87730' },
        { label: 'Requests', value: analyticsSummary?.myFoodRequests || 2, color: '#2ECC71' },
        { label: 'Ratings Given', value: analyticsSummary?.myRatingsGiven || 3, color: '#F4D03F' },
        { label: 'Ratings Received', value: analyticsSummary?.myRatingsReceived || 1, color: '#3498DB' }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'text-green-500';
            case 'PENDING': return 'text-yellow-500';
            case 'COMPLETED': return 'text-blue-500';
            case 'REJECTED': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <>
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen">
                <Nav2 />

                {/* Dashboard Header */}
                <div className="px-6 sm:px-10 md:px-20 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-white text-2xl sm:text-3xl font-bold">
                                Welcome back, {userProfile?.fullName || 'User'}! 👋
                            </h1>
                            <p className="text-gray-300 mt-2">
                                Here's your activity overview and important insights
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{userProfile?.location || 'Location not set'}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 sm:px-10 md:px-20 mb-6 flex justify-center">
                    <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 max-w-xl w-full md:w-[400px]">
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'activities', label: 'Activities', icon: Clock },
                            { id: 'achievements', label: 'Achievements', icon: Award }
                        ].map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                                        ? 'bg-[#E87730] text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="px-6 sm:px-10 md:px-20 pb-20">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Total Donations</p>
                                            <p className="text-2xl font-bold text-[#E87730]">
                                                {analyticsSummary?.myDonations || 8}
                                            </p>
                                        </div>
                                        <Package className="w-8 h-8 text-[#E87730]" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Food Requests</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {analyticsSummary?.myFoodRequests || 2}
                                            </p>
                                        </div>
                                        <Heart className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Ratings Given</p>
                                            <p className="text-2xl font-bold text-yellow-600">
                                                {analyticsSummary?.myRatingsGiven || 3}
                                            </p>
                                        </div>
                                        <Star className="w-8 h-8 text-yellow-600" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Ratings Received</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {analyticsSummary?.myRatingsReceived || 1}
                                            </p>
                                        </div>
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Activity Distribution */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
                                    <div className="h-64">
                                        <PieChart
                                            series={[
                                                {
                                                    data: pieChartData,
                                                    innerRadius: 60,
                                                    outerRadius: 100,
                                                    paddingAngle: 2,
                                                    cornerRadius: 5,
                                                    cx: 150,
                                                    color: pieChartData.map((item) => item.color),
                                                },
                                            ]}
                                            width={300}
                                            height={250}
                                            slotProps={{
                                                legend: { hidden: true },
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        {pieChartData.map((item) => (
                                            <div key={item.label} className="flex items-center space-x-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <span className="text-sm text-gray-600">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Donations Trend */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Donations Trend</h3>
                                    <div className="h-64">
                                        {donationsChartData.length > 0 ? (
                                            <LineChart
                                                xAxis={[
                                                    {
                                                        data: donationsChartData.map((_, index) => index),
                                                        valueFormatter: (index) => donationsChartData[index]?.month || '',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        data: donationsChartData.map(item => item.donations),
                                                        area: true,
                                                        color: '#E87730',
                                                    },
                                                ]}
                                                width={300}
                                                height={250}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                No donation data available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Donations */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
                                    <div className="space-y-3">
                                        {recentDonations.length > 0 ? (
                                            recentDonations.map((donation) => (
                                                <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{donation.foodName}</p>
                                                        <p className="text-sm text-gray-500">{donation.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-medium ${getStatusColor(donation.status)}`}>
                                                            {donation.status}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(donation.createdDateTime)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No donations yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Requests */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
                                    <div className="space-y-3">
                                        {recentRequests.length > 0 ? (
                                            recentRequests.map((request) => (
                                                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{request.foodName}</p>
                                                        <p className="text-sm text-gray-500">Requested from {request.donorName}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                                                            {request.status}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(request.requestDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No requests yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activities' && (
                        <div className="space-y-6">
                            {/* All Donations */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">All My Donations</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Food Name</th>
                                                <th className="text-left py-2">Quantity</th>
                                                <th className="text-left py-2">Status</th>
                                                <th className="text-left py-2">Created</th>
                                                <th className="text-left py-2">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentDonations.map((donation) => (
                                                <tr key={donation.id} className="border-b">
                                                    <td className="py-2">{donation.foodName}</td>
                                                    <td className="py-2">{donation.quantity}</td>
                                                    <td className="py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(donation.status)}`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">{formatDate(donation.createdDateTime)}</td>
                                                    <td className="py-2">{donation.location}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* All Requests */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">All My Requests</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Food Name</th>
                                                <th className="text-left py-2">Donor</th>
                                                <th className="text-left py-2">Status</th>
                                                <th className="text-left py-2">Requested</th>
                                                <th className="text-left py-2">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentRequests.map((request) => (
                                                <tr key={request.id} className="border-b">
                                                    <td className="py-2">{request.foodName}</td>
                                                    <td className="py-2">{request.donorName}</td>
                                                    <td className="py-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">{formatDate(request.requestDate)}</td>
                                                    <td className="py-2">{request.paymentMethod}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="space-y-6">
                            {/* Achievement Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* First Donation */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations > 0 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Target className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations > 0 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">First Donation</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations > 0 ? 'Achieved!' : 'Donate your first food item'}
                                        </p>
                                    </div>
                                </div>

                                {/* Helping Hand */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 5 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Heart className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 5 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Helping Hand</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 5 ? 'Achieved!' : 'Donate 5 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Community Builder */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 10 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Users className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 10 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Community Builder</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 10 ? 'Achieved!' : 'Donate 10 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Rater */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myRatingsGiven >= 3 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Star className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myRatingsGiven >= 3 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Active Rater</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myRatingsGiven >= 3 ? 'Achieved!' : 'Give 3 ratings'}
                                        </p>
                                    </div>
                                </div>

                                {/* Food Explorer */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myFoodRequests >= 2 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Package className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myFoodRequests >= 2 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Food Explorer</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myFoodRequests >= 2 ? 'Achieved!' : 'Request 2 food items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Consistent Helper */}
                                <div className={`bg-white rounded-xl p-6 shadow-lg border-2 ${analyticsSummary?.myDonations >= 20 ? 'border-green-500' : 'border-gray-300'
                                    }`}>
                                    <div className="text-center">
                                        <Award className={`w-12 h-12 mx-auto mb-3 ${analyticsSummary?.myDonations >= 20 ? 'text-green-500' : 'text-gray-400'
                                            }`} />
                                        <h4 className="font-semibold">Consistent Helper</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations >= 20 ? 'Achieved!' : 'Donate 20 food items'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Summary */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Donations Progress</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-1">
                                            <div
                                                className="bg-[#E87730] h-1 rounded-full"
                                                style={{ width: `${Math.min((analyticsSummary?.myDonations || 0) * 5, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myDonations || 0} donations made
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Community Engagement</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-1">
                                            <div
                                                className="bg-green-500 h-1 rounded-full"
                                                style={{ width: `${Math.min(((analyticsSummary?.myRatingsGiven || 0) + (analyticsSummary?.myFoodRequests || 0)) * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {analyticsSummary?.myRatingsGiven || 0} ratings + {analyticsSummary?.myFoodRequests || 0} requests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard; 