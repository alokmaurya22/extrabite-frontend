import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';
import { Users, Package, Heart, Star, BarChart3, UserCog } from 'lucide-react';
import { useState } from 'react';
import { PieChart, LineChart, BarChart } from '@mui/x-charts';

function AdminDashboard() {
    // Section definitions
    const sections = [
        { id: 'summary', label: 'Summary', icon: BarChart3 },
        { id: 'donations', label: 'Donations Analytics', icon: Package },
        { id: 'requests', label: 'Requests Analytics', icon: Heart },
        { id: 'users', label: 'User Management', icon: UserCog },
        { id: 'all', label: 'All Donations & Requests', icon: Star },
    ];
    const [activeSection, setActiveSection] = useState('summary');

    // Nav click handler
    const scrollToSection = (id) => {
        setActiveSection(id);
    };

    // Demo data
    const summaryData = [
        { label: 'Total Donations', value: 35, icon: Package, color: 'text-[#E87730]' },
        { label: 'Completed Donations', value: 23, icon: Heart, color: 'text-green-600' },
        { label: 'Total Requests', value: 27, icon: Star, color: 'text-blue-600' },
        { label: 'Total Users', value: 38, icon: Users, color: 'text-purple-600' },
    ];
    const topContributors = [
        { name: 'Amit', donations: 20 },
        { name: 'Priya', donations: 15 },
        { name: 'Rahul', donations: 10 },
        { name: 'Sneha', donations: 8 },
        { name: 'Vikram', donations: 7 },
    ];
    const topRequesters = [
        { name: 'Sunita', requests: 12 },
        { name: 'Ramesh', requests: 10 },
        { name: 'Anjali', requests: 9 },
        { name: 'Manoj', requests: 8 },
        { name: 'Pooja', requests: 7 },
    ];
    const users = [
        { name: 'Amit', email: 'amit@example.com', role: 'USER', status: 'Active' },
        { name: 'Priya', email: 'priya@example.com', role: 'ADMIN', status: 'Blocked' },
        { name: 'Rahul', email: 'rahul@example.com', role: 'USER', status: 'Active' },
        { name: 'Sneha', email: 'sneha@example.com', role: 'USER', status: 'Active' },
        { name: 'Vikram', email: 'vikram@example.com', role: 'USER', status: 'Blocked' },
    ];
    const donationsRequests = [
        { food: 'Dal', donor: 'Amit', receiver: 'Priya', status: 'COMPLETED', date: '2024-06-01' },
        { food: 'Roti', donor: 'Rahul', receiver: 'Sneha', status: 'PENDING', date: '2024-06-02' },
        { food: 'Rice', donor: 'Vikram', receiver: 'Sunita', status: 'COMPLETED', date: '2024-06-03' },
        { food: 'Sabzi', donor: 'Manoj', receiver: 'Pooja', status: 'PENDING', date: '2024-06-04' },
        { food: 'Idli', donor: 'Anjali', receiver: 'Ramesh', status: 'COMPLETED', date: '2024-06-05' },
    ];

    // Chart demo data
    const pieChartData = [
        { id: 0, value: 35, label: 'Donations', color: '#E87730' },
        { id: 1, value: 27, label: 'Requests', color: '#2563eb' },
        { id: 2, value: 23, label: 'Completed', color: '#16a34a' },
    ];
    const lineChartData = [
        { month: 'Jan', donations: 20 },
        { month: 'Feb', donations: 30 },
        { month: 'Mar', donations: 40 },
        { month: 'Apr', donations: 50 },
        { month: 'May', donations: 60 },
        { month: 'Jun', donations: 70 },
    ];
    const barChartData = [
        { month: 'Jan', donations: 20, requests: 10 },
        { month: 'Feb', donations: 30, requests: 15 },
        { month: 'Mar', donations: 40, requests: 20 },
        { month: 'Apr', donations: 50, requests: 25 },
        { month: 'May', donations: 60, requests: 30 },
        { month: 'Jun', donations: 70, requests: 35 },
    ];

    return (
        <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen">
            <Nav2 />
            <div className="px-6 sm:px-10 md:px-20 pt-10">
                <h1 className="text-white text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-300 mb-8">Platform-wide analytics, user management, and more</p>
                {/* Slick Navigation Bar */}
                <nav className="flex gap-2 overflow-x-auto bg-gray-100 rounded-2xl shadow-xl p-3 mb-10 sticky top-0 z-20">
                    {sections.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-colors duration-200 focus:outline-none whitespace-nowrap text-base shadow-sm ${activeSection === id
                                ? 'bg-[#E87730] text-white shadow-lg'
                                : 'text-gray-700 hover:text-white hover:bg-gray-700'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>
                <div className="space-y-12">
                    {/* Summary Section */}
                    {activeSection === 'summary' && (
                        <section id="summary" className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {summaryData.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-6 shadow flex items-center justify-between border border-gray-100">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                                            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                                        </div>
                                        <item.icon className={`w-8 h-8 ${item.color}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[16rem] w-full">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-270">Activity Distribution</h3>
                                    <PieChart
                                        series={[{
                                            data: pieChartData,
                                            innerRadius: 60,
                                            outerRadius: 100,
                                            paddingAngle: 2,
                                            cornerRadius: 5,
                                            cx: 150,
                                            color: pieChartData.map((item) => item.color),
                                        }]}
                                        width={300}
                                        height={250}
                                        slotProps={{ legend: { hidden: true } }}
                                    />
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        {pieChartData.map((item) => (
                                            <div key={item.label} className="flex items-center space-x-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-sm text-gray-600">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[16rem] w-full">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-270">Donations Trend</h3>
                                    <LineChart
                                        xAxis={[{
                                            data: lineChartData.map((d) => d.month),
                                            scaleType: 'band',
                                        }]}
                                        series={[{
                                            data: lineChartData.map((d) => d.donations),
                                            area: true,
                                            color: '#E87730',
                                        }]}
                                        width={300}
                                        height={250}
                                    />
                                </div>
                            </div>
                        </section>
                    )}
                    {/* Donations Analytics Section */}
                    {activeSection === 'donations' && (
                        <section id="donations" className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">Donations Analytics</h2>
                            <div className="bg-gray-50 rounded-xl p-6 shadow mb-6 flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-4 text-gray-270">Monthly Donations</h3>
                                <BarChart
                                    xAxis={[{ data: barChartData.map((d) => d.month), scaleType: 'band' }]}
                                    series={[{ data: barChartData.map((d) => d.donations), color: '#E87730', label: 'Donations' }]}
                                    width={400}
                                    height={250}
                                />
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow">
                                <h3 className="text-lg font-semibold mb-4 text-gray-270">Top Contributors</h3>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Name</th>
                                            <th className="text-left py-2">Donations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topContributors.map((c, idx) => (
                                            <tr key={idx} className="border-b">
                                                <td className="py-2 font-medium">{idx + 1}. {c.name}</td>
                                                <td className="py-2">{c.donations}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {/* Requests Analytics Section */}
                    {activeSection === 'requests' && (
                        <section id="requests" className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">Requests Analytics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="bg-white rounded-xl p-6 shadow flex items-center justify-between border border-gray-100">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Total Requests</p>
                                        <p className="text-2xl font-bold text-[#E87730]">27</p>
                                    </div>
                                    <Heart className="w-8 h-8 text-[#E87730]" />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow mb-6 flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-4 text-gray-270">Monthly Requests</h3>
                                <BarChart
                                    xAxis={[{ data: barChartData.map((d) => d.month), scaleType: 'band' }]}
                                    series={[{ data: barChartData.map((d) => d.requests), color: '#2563eb', label: 'Requests' }]}
                                    width={400}
                                    height={250}
                                />
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow">
                                <h3 className="text-lg font-semibold mb-4 text-gray-270">Top Requesters</h3>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Name</th>
                                            <th className="text-left py-2">Requests</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topRequesters.map((r, idx) => (
                                            <tr key={idx} className="border-b">
                                                <td className="py-2 font-medium">{idx + 1}. {r.name}</td>
                                                <td className="py-2">{r.requests}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {/* User Management Section */}
                    {activeSection === 'users' && (
                        <section id="users" className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">User Management</h2>
                            <div className="bg-gray-50 rounded-xl p-6 shadow mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-270">Create New Admin</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" className="border p-2 rounded" placeholder="Full Name" required />
                                        <input type="email" className="border p-2 rounded" placeholder="Email" required />
                                        <input type="password" className="border p-2 rounded" placeholder="Password" required />
                                        <input type="text" className="border p-2 rounded" placeholder="Contact Number" />
                                        <input type="text" className="border p-2 rounded" placeholder="Location" />
                                    </div>
                                    <button type="submit" className="px-4 py-2 bg-[#E87730] text-white rounded">Create Admin</button>
                                </form>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                                <input
                                    type="text"
                                    className="border p-2 rounded w-full md:w-64"
                                    placeholder="Enter user email or ID to block/unblock"
                                />
                                <button className="px-4 py-2 bg-red-500 text-white rounded mt-2 md:mt-0">Block</button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded mt-2 md:mt-0">Unblock</button>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow">
                                <div className="flex items-center mb-4">
                                    <h3 className="text-lg font-semibold mr-4 text-gray-270">All Users</h3>
                                    <select className="border p-2 rounded">
                                        <option value="all">All</option>
                                        <option value="active">Unblocked</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Name</th>
                                            <th className="text-left py-2">Email</th>
                                            <th className="text-left py-2">Role</th>
                                            <th className="text-left py-2">Status</th>
                                            <th className="text-left py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, idx) => (
                                            <tr key={idx} className="border-b">
                                                <td className="py-2">{u.name}</td>
                                                <td className="py-2">{u.email}</td>
                                                <td className="py-2">{u.role}</td>
                                                <td className="py-2">
                                                    <span className={u.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{u.status}</span>
                                                </td>
                                                <td className="py-2">
                                                    {u.status === 'Active' ? (
                                                        <button className="px-2 py-1 bg-red-500 text-white rounded">Block</button>
                                                    ) : (
                                                        <button className="px-2 py-1 bg-green-500 text-white rounded">Unblock</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {/* All Donations/Requests Section */}
                    {activeSection === 'all' && (
                        <section id="all" className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">All Donations & Requests</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                                <div className="bg-white rounded-2xl shadow-md flex items-center justify-between p-6 border border-gray-100">
                                    <div>
                                        <p className="text-gray-500 text-base font-medium mb-1">Total Donations</p>
                                        <p className="text-3xl font-bold text-[#E87730]">35</p>
                                    </div>
                                    <Package className="w-10 h-10 text-[#E87730]" />
                                </div>
                                <div className="bg-white rounded-2xl shadow-md flex items-center justify-between p-6 border border-gray-100">
                                    <div>
                                        <p className="text-gray-500 text-base font-medium mb-1">Total Requests</p>
                                        <p className="text-3xl font-bold text-blue-600">27</p>
                                    </div>
                                    <Star className="w-10 h-10 text-blue-600" />
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <select className="border p-2 rounded mr-4">
                                    <option value="donation">Donations</option>
                                    <option value="request">Requests</option>
                                </select>
                                <span className="text-gray-500">Showing all donations</span>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-6 shadow">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-gradient-to-r from-[#E87730] to-orange-400">
                                            <th className="text-left py-2 px-2 text-white">Food Name</th>
                                            <th className="text-left py-2 px-2 text-white">Donor</th>
                                            <th className="text-left py-2 px-2 text-white">Receiver</th>
                                            <th className="text-left py-2 px-2 text-white">Status</th>
                                            <th className="text-left py-2 px-2 text-white">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donationsRequests.map((row, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'border-b bg-gray-50' : 'border-b bg-white'}>
                                                <td className="py-2 px-2 font-medium">{row.food}</td>
                                                <td className="py-2 px-2">{row.donor}</td>
                                                <td className="py-2 px-2">{row.receiver}</td>
                                                <td className="py-2 px-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-270'}`}>{row.status}</span>
                                                </td>
                                                <td className="py-2 px-2">{row.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <button className="flex items-center gap-2 px-5 py-2 rounded-full shadow font-semibold text-[#E87730] bg-white border border-[#E87730] hover:bg-[#E87730] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                        <span className="text-lg">&#8592;</span> Prev
                                    </button>
                                    <span className="text-gray-600 font-medium">Page 1 of 1</span>
                                    <button className="flex items-center gap-2 px-5 py-2 rounded-full shadow font-semibold text-[#E87730] bg-white border border-[#E87730] hover:bg-[#E87730] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                        Next <span className="text-lg">&#8594;</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminDashboard; 