import { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const OrganizerHome = () => {
    const { user } = useContext(AuthContext);
    const [revealedCards, setRevealedCards] = useState({});

    // Mock data - replace with real API calls
    const stats = {
        totalEvents: 12,
        activeEvents: 5,
        totalTicketsSold: 1247,
        totalRevenue: '৳89,450',
        thisMonthRevenue: '৳23,600',
        pendingPayouts: '৳615,200'
    };

    const toggleCardReveal = (cardId) => {
        setRevealedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    const recentEvents = [
        {
            id: 1,
            name: 'Tech Conference 2025',
            date: '2025-02-15',
            status: 'Active',
            ticketsSold: 156,
            revenue: '৳23,400',
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            name: 'Music Festival',
            date: '2025-03-20',
            status: 'Planning',
            ticketsSold: 89,
            revenue: '৳12,650',
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            name: 'Art Exhibition',
            date: '2025-01-30',
            status: 'Completed',
            ticketsSold: 234,
            revenue: '৳18,720',
            image: '/api/placeholder/80/80'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            action: 'New ticket purchase',
            event: 'Tech Conference 2025',
            time: '2 minutes ago',
            icon: '🎫',
            color: 'green'
        },
        {
            id: 2,
            action: 'Event updated',
            event: 'Music Festival',
            time: '1 hour ago',
            icon: '✏️',
            color: 'blue'
        },
        {
            id: 3,
            action: 'Payout processed',
            event: 'Art Exhibition',
            time: '3 hours ago',
            icon: '💰',
            color: 'purple'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-3xl p-6 md:p-8 border border-[#B13BFF]/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-2">
                            Welcome back, {user?.displayName?.split(' ')[0] || 'Organizer'}! 👋
                        </h1>
                        <p className="text-gray-600 text-sm md:text-lg">
                            Here's what's happening with your events today
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base">
                            📊 View Analytics
                        </button>
                        <button className="border border-[#B13BFF] text-[#B13BFF] px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-[#B13BFF] hover:text-white transition-all duration-300 text-sm md:text-base">
                            🎭 My Events
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎭</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">{stats.totalEvents}</p>
                    <p className="text-sm text-gray-600 font-medium">Total Events</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎯</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">{stats.activeEvents}</p>
                    <p className="text-sm text-gray-600 font-medium">Active Events</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎫</span>
                        </div>
                        <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">{stats.totalTicketsSold}</p>
                    <p className="text-sm text-gray-600 font-medium">Tickets Sold</p>
                </div>

                <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => toggleCardReveal('totalRevenue')}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">💰</span>
                        </div>
                        <span className="text-xs text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full">+15%</span>
                    </div>
                    <p className={`text-2xl md:text-3xl font-black text-gray-800 transition-all duration-300 ${
                        revealedCards.totalRevenue ? '' : 'filter blur-sm'
                    }`}>
                        {stats.totalRevenue}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                        Total Revenue {!revealedCards.totalRevenue && '(Click to reveal)'}
                    </p>
                </div>

                <div 
                    className="bg-white/80 backdrop-blur-3xl rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => toggleCardReveal('thisMonthRevenue')}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">📈</span>
                        </div>
                        <span className="text-xs text-indigo-600 font-semibold bg-indigo-100 px-2 py-1 rounded-full">This Month</span>
                    </div>
                    <p className={`text-2xl md:text-3xl font-black text-gray-800 transition-all duration-300 ${
                        revealedCards.thisMonthRevenue ? '' : 'filter blur-sm'
                    }`}>
                        {stats.thisMonthRevenue}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                        Month Revenue {!revealedCards.thisMonthRevenue && '(Click to reveal)'}
                    </p>
                </div>

                <div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => toggleCardReveal('pendingPayouts')}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <span className="text-xl">⏳</span>
                        </div>
                        <span className="text-xs text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <p className={`text-2xl md:text-3xl font-black text-gray-800 transition-all duration-300 ${
                        revealedCards.pendingPayouts ? '' : 'filter blur-sm'
                    }`}>
                        {stats.pendingPayouts}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                        Pending Payouts {!revealedCards.pendingPayouts && '(Click to reveal)'}
                    </p>
                </div>
            </div>

            {/* Recent Events & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Events */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-gray-800">Recent Events</h3>
                        <button className="text-[#B13BFF] hover:text-[#471396] font-semibold text-sm transition-colors">
                            View All →
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentEvents.map((event) => (
                            <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-black text-lg">🎭</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-800 truncate">{event.name}</h4>
                                    <p className="text-sm text-gray-600">{event.date}</p>
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                            event.status === 'Active' ? 'bg-green-100 text-green-600' :
                                            event.status === 'Planning' ? 'bg-blue-100 text-blue-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {event.status}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {event.ticketsSold} tickets • {event.revenue}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-gray-800">Recent Activity</h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    activity.color === 'green' ? 'bg-green-100' :
                                    activity.color === 'blue' ? 'bg-blue-100' :
                                    'bg-purple-100'
                                }`}>
                                    <span className="text-lg">{activity.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{activity.action}</h4>
                                    <p className="text-sm text-gray-600">{activity.event}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-black text-gray-800 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <button className="flex flex-col items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-300 transform hover:scale-105">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">📊</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center">Analytics</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-3 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">🎫</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center">Manage Tickets</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-3 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all duration-300 transform hover:scale-105">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">👥</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center">Attendees</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-3 p-4 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">💰</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center">Revenue</span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-3 p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">⚙️</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center">Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrganizerHome;
