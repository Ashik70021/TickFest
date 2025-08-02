import { useState, useEffect } from 'react';

const Revenue = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/events/all-events.json');
                const data = await response.json();
                
                // Simulate user's events
                const userEvents = data.events.filter(event => 
                    event.organizer.name === "Dhaka Broadcast" || 
                    event.organizer.name === "Rock Nation BD" ||
                    event.organizer.name === "Bangladesh Cricket Board"
                );
                
                setEvents(userEvents);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Calculate revenue data
    const calculateRevenueData = () => {
        let totalRevenue = 0;
        let totalTicketsSold = 0;
        let totalProcessingFees = 0;
        let totalPayouts = 0;

        const revenueByEvent = events.map(event => {
            const eventRevenue = event.ticketTypes?.reduce((acc, ticket) => {
                const sold = 1000 - ticket.remaining; // Simulated sold tickets
                const revenue = sold * ticket.price;
                const processingFee = revenue * 0.05; // 5% processing fee
                const payout = revenue - processingFee;
                
                return {
                    revenue: acc.revenue + revenue,
                    sold: acc.sold + sold,
                    processingFee: acc.processingFee + processingFee,
                    payout: acc.payout + payout
                };
            }, { revenue: 0, sold: 0, processingFee: 0, payout: 0 }) || { revenue: 0, sold: 0, processingFee: 0, payout: 0 };

            totalRevenue += eventRevenue.revenue;
            totalTicketsSold += eventRevenue.sold;
            totalProcessingFees += eventRevenue.processingFee;
            totalPayouts += eventRevenue.payout;

            return {
                ...event,
                revenue: eventRevenue.revenue,
                soldTickets: eventRevenue.sold,
                processingFee: eventRevenue.processingFee,
                payout: eventRevenue.payout
            };
        });

        return {
            totalRevenue,
            totalTicketsSold,
            totalProcessingFees,
            totalPayouts,
            netIncome: totalPayouts,
            revenueByEvent
        };
    };

    const revenueData = calculateRevenueData();

    // Mock monthly revenue data for chart
    const monthlyRevenue = [
        { month: 'Jan', revenue: 45000, events: 3 },
        { month: 'Feb', revenue: 52000, events: 4 },
        { month: 'Mar', revenue: 38000, events: 2 },
        { month: 'Apr', revenue: 67000, events: 5 },
        { month: 'May', revenue: 55000, events: 4 },
        { month: 'Jun', revenue: 72000, events: 6 },
        { month: 'Jul', revenue: 48000, events: 3 },
        { month: 'Aug', revenue: 61000, events: 4 },
        { month: 'Sep', revenue: 56000, events: 4 },
        { month: 'Oct', revenue: 73000, events: 5 },
        { month: 'Nov', revenue: 68000, events: 4 },
        { month: 'Dec', revenue: 84000, events: 6 }
    ];

    // Filter events based on selection
    const filteredRevenueData = selectedEvent === 'all' 
        ? revenueData.revenueByEvent 
        : revenueData.revenueByEvent.filter(event => event.id === selectedEvent);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B13BFF]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-3xl p-6 border border-[#B13BFF]/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-2">
                            Revenue 💰
                        </h1>
                        <p className="text-gray-600">
                            Track your earnings and financial performance
                        </p>
                    </div>
                    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        💳 Request Payout
                    </button>
                </div>
            </div>

            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">৳{revenueData.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Gross Revenue</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💳</span>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">Net</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">৳{revenueData.netIncome.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Net Income</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                        </div>
                        <span className="text-xs text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">Fees</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">৳{revenueData.totalProcessingFees.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Processing Fees</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📈</span>
                        </div>
                        <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">Avg</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">
                        ৳{revenueData.totalTicketsSold > 0 ? Math.round(revenueData.totalRevenue / revenueData.totalTicketsSold) : 0}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Avg Per Ticket</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Event</label>
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                        >
                            <option value="all">All Events</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time Period</label>
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Revenue Trend</h3>
                
                <div className="space-y-4">
                    {monthlyRevenue.map((month, index) => {
                        const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
                        const percentage = (month.revenue / maxRevenue) * 100;
                        
                        return (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-semibold text-gray-600">
                                    {month.month}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">
                                            {month.events} events
                                        </span>
                                        <span className="text-sm font-bold text-green-600">
                                            ৳{month.revenue.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-gradient-to-r from-[#B13BFF] to-[#471396] h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Revenue by Event */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue by Event</h3>
                
                <div className="space-y-4">
                    {filteredRevenueData.map(event => (
                        <div key={event.id} className="bg-gray-50/50 rounded-2xl p-6 hover:bg-gray-100/50 transition-colors">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-800 mb-2">{event.name}</h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            📅 {event.date} {event.month} {event.year}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            📍 {event.venue}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            🎫 {event.soldTickets} tickets sold
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-96">
                                    <div className="text-center">
                                        <p className="text-lg font-black text-green-600">৳{event.revenue.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Gross Revenue</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-black text-red-600">৳{event.processingFee.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Processing Fee</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-black text-blue-600">৳{event.payout.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Your Payout</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-black text-purple-600">
                                            {event.soldTickets > 0 ? Math.round(event.revenue / event.soldTickets) : 0}৳
                                        </p>
                                        <p className="text-xs text-gray-600">Avg/Ticket</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Ticket Type Revenue Breakdown */}
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {event.ticketTypes?.map((ticket, index) => {
                                    const sold = 1000 - ticket.remaining;
                                    const revenue = sold * ticket.price;
                                    return (
                                        <div key={index} className="bg-white p-3 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-sm text-gray-700">{ticket.name}</span>
                                                <span className="text-xs text-gray-500">{sold} sold</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-600">৳{ticket.price} each</span>
                                                <span className="text-sm font-bold text-green-600">
                                                    ৳{revenue.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payout Information */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Payout Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-2xl">
                            <h4 className="font-semibold text-green-800 mb-2">✅ Available for Payout</h4>
                            <p className="text-2xl font-black text-green-600">৳{Math.round(revenueData.netIncome * 0.8).toLocaleString()}</p>
                            <p className="text-sm text-green-600">From completed events</p>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-2xl">
                            <h4 className="font-semibold text-yellow-800 mb-2">⏳ Pending</h4>
                            <p className="text-2xl font-black text-yellow-600">৳{Math.round(revenueData.netIncome * 0.2).toLocaleString()}</p>
                            <p className="text-sm text-yellow-600">From upcoming events</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-2xl">
                            <h4 className="font-semibold text-blue-800 mb-2">📊 Payout Schedule</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Payouts processed weekly</li>
                                <li>• Minimum payout: ৳5,000</li>
                                <li>• Processing time: 2-3 business days</li>
                                <li>• Next payout: Friday, Dec 15</li>
                            </ul>
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            💳 Request Immediate Payout
                        </button>
                    </div>
                </div>
            </div>

            {filteredRevenueData.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No revenue data found</h3>
                    <p className="text-gray-500">
                        {selectedEvent === 'all' 
                            ? "No events with revenue data found."
                            : "No revenue data found for the selected event."
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default Revenue;
