import { useState } from 'react';

const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState('30days');

    // Sample analytics data
    const analyticsData = {
        revenue: {
            total: 2450000,
            growth: 15.3,
            data: [
                { month: 'Jan', value: 320000 },
                { month: 'Feb', value: 380000 },
                { month: 'Mar', value: 450000 },
                { month: 'Apr', value: 520000 },
                { month: 'May', value: 490000 },
                { month: 'Jun', value: 580000 }
            ]
        },
        tickets: {
            sold: 12450,
            growth: 23.7,
            breakdown: [
                { category: 'Concert', sold: 4200, percentage: 33.7 },
                { category: 'Technology', sold: 3100, percentage: 24.9 },
                { category: 'Sports', sold: 2800, percentage: 22.5 },
                { category: 'Business', sold: 1500, percentage: 12.0 },
                { category: 'Other', sold: 850, percentage: 6.8 }
            ]
        },
        users: {
            active: 8934,
            new: 234,
            retention: 78.5
        },
        events: {
            total: 156,
            active: 89,
            upcoming: 45,
            completed: 67
        }
    };

    const topPerformingEvents = [
        { name: "Tech Expo 2025", revenue: 125000, tickets: 500, rating: 4.8 },
        { name: "Rock Festival", revenue: 98000, tickets: 650, rating: 4.9 },
        { name: "Business Summit", revenue: 87000, tickets: 290, rating: 4.7 },
        { name: "Comedy Night", revenue: 65000, tickets: 430, rating: 4.6 }
    ];

    return (
        <div className="relative min-h-screen">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] opacity-5"></div>
            <div className="absolute inset-0">
                <div className="stars-bg opacity-30"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                                Analytics Dashboard
                            </h1>
                            <p className="text-gray-600">Comprehensive insights and performance metrics</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="7days">Last 7 Days</option>
                                <option value="30days">Last 30 Days</option>
                                <option value="90days">Last 3 Months</option>
                                <option value="1year">Last Year</option>
                            </select>
                            <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-all duration-300">
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <span className="text-green-600 text-sm font-semibold">+{analyticsData.revenue.growth}%</span>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">৳{analyticsData.revenue.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <span className="text-green-600 text-sm font-semibold">+{analyticsData.tickets.growth}%</span>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Tickets Sold</p>
                                <p className="text-2xl font-bold text-gray-900">{analyticsData.tickets.sold.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-blue-600 text-sm font-semibold">+{analyticsData.users.new}</span>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Active Users</p>
                                <p className="text-2xl font-bold text-gray-900">{analyticsData.users.active.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-gray-600 text-sm font-semibold">{analyticsData.events.active} active</span>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Total Events</p>
                                <p className="text-2xl font-bold text-gray-900">{analyticsData.events.total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-[#B13BFF] rounded-full"></div>
                                <span className="text-gray-600 text-sm">Monthly Revenue</span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between space-x-2">
                            {analyticsData.revenue.data.map((item, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div 
                                        className="w-full bg-gradient-to-t from-[#B13BFF] to-[#471396] rounded-t-lg mb-2 hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300"
                                        style={{ 
                                            height: `${(item.value / Math.max(...analyticsData.revenue.data.map(d => d.value))) * 100}%`,
                                            minHeight: '20px'
                                        }}
                                    ></div>
                                    <span className="text-gray-600 text-xs">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ticket Sales by Category</h3>
                        <div className="space-y-4">
                            {analyticsData.tickets.breakdown.map((category, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                                            index === 0 ? 'from-[#B13BFF] to-[#471396]' :
                                            index === 1 ? 'from-[#471396] to-[#090040]' :
                                            index === 2 ? 'from-[#090040] to-[#B13BFF]' :
                                            index === 3 ? 'from-green-500 to-green-400' :
                                            'from-yellow-500 to-yellow-400'
                                        }`}></div>
                                        <span className="text-gray-900 text-sm font-medium">{category.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-gray-600 text-sm">{category.sold.toLocaleString()}</span>
                                        <span className="text-gray-900 text-sm font-semibold">{category.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Performance Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Performing Events */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Events</h3>
                        <div className="space-y-4">
                            {topPerformingEvents.map((event, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-lg flex items-center justify-center text-white font-bold">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-semibold">{event.name}</h4>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span>{event.tickets} tickets</span>
                                                <span>•</span>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {event.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-900 font-bold">৳{event.revenue.toLocaleString()}</div>
                                        <div className="text-gray-600 text-sm">Revenue</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Metrics */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-900 font-medium">User Retention Rate</span>
                                    <span className="text-green-600 font-bold">{analyticsData.users.retention}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${analyticsData.users.retention}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-900 font-medium">Event Success Rate</span>
                                    <span className="text-purple-600 font-bold">92.3%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-[#B13BFF] to-[#471396] h-2 rounded-full w-[92%] transition-all duration-1000"></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-900 font-medium">Average Rating</span>
                                    <span className="text-yellow-600 font-bold">4.7/5</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : i === 4 ? 'text-yellow-400/70' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-900 font-medium">Platform Growth</span>
                                    <span className="text-blue-600 font-bold">+28.5%</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>New Users this month</span>
                                        <span>+{analyticsData.users.new}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Events created</span>
                                        <span>+67</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Revenue growth</span>
                                        <span>+{analyticsData.revenue.growth}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
