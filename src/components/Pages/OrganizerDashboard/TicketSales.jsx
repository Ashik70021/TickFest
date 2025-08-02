import { useState, useEffect } from 'react';

const TicketSales = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('all');
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('all');

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

    // Calculate sales data
    const calculateSalesData = () => {
        let totalSales = 0;
        let totalRevenue = 0;
        let totalTickets = 0;

        const salesByEvent = events.map(event => {
            const eventSales = event.ticketTypes?.reduce((acc, ticket) => {
                const sold = 1000 - ticket.remaining; // Simulated sold tickets
                const revenue = sold * ticket.price;
                return {
                    sold: acc.sold + sold,
                    revenue: acc.revenue + revenue
                };
            }, { sold: 0, revenue: 0 }) || { sold: 0, revenue: 0 };

            totalSales += eventSales.sold;
            totalRevenue += eventSales.revenue;
            totalTickets += event.ticketTypes?.reduce((acc, ticket) => acc + 1000, 0) || 0;

            return {
                ...event,
                soldTickets: eventSales.sold,
                revenue: eventSales.revenue,
                totalCapacity: event.ticketTypes?.reduce((acc, ticket) => acc + 1000, 0) || 0
            };
        });

        return {
            totalSales,
            totalRevenue,
            totalTickets,
            salesByEvent
        };
    };

    const salesData = calculateSalesData();

    // Filter events based on selection
    const filteredSalesData = selectedEvent === 'all' 
        ? salesData.salesByEvent 
        : salesData.salesByEvent.filter(event => event.id === selectedEvent);

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
                <h1 className="text-3xl font-black bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-2">
                    Ticket Sales 🎫
                </h1>
                <p className="text-gray-600">
                    Track your ticket sales performance and revenue
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🎫</span>
                        </div>
                        <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">{salesData.totalSales.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Tickets Sold</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">Revenue</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">৳{salesData.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                        </div>
                        <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">Rate</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">
                        {salesData.totalTickets > 0 ? Math.round((salesData.totalSales / salesData.totalTickets) * 100) : 0}%
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Conversion Rate</p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💳</span>
                        </div>
                        <span className="text-xs text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full">Avg</span>
                    </div>
                    <p className="text-3xl font-black text-gray-800">
                        ৳{salesData.totalSales > 0 ? Math.round(salesData.totalRevenue / salesData.totalSales) : 0}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">Avg Ticket Price</p>
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
                        </select>
                    </div>
                </div>
            </div>

            {/* Sales by Event */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Sales by Event</h3>
                
                <div className="space-y-4">
                    {filteredSalesData.map(event => (
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
                                            🎭 {event.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-96">
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-gray-800">{event.soldTickets}</p>
                                        <p className="text-xs text-gray-600">Sold</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-gray-800">{event.totalCapacity - event.soldTickets}</p>
                                        <p className="text-xs text-gray-600">Remaining</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-green-600">৳{event.revenue.toLocaleString()}</p>
                                        <p className="text-xs text-gray-600">Revenue</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-blue-600">
                                            {Math.round((event.soldTickets / event.totalCapacity) * 100)}%
                                        </p>
                                        <p className="text-xs text-gray-600">Sold</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-[#B13BFF] to-[#471396] h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(event.soldTickets / event.totalCapacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Ticket Types Breakdown */}
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {event.ticketTypes?.map((ticket, index) => {
                                    const sold = 1000 - ticket.remaining;
                                    return (
                                        <div key={index} className="bg-white p-3 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-sm text-gray-700">{ticket.name}</span>
                                                <span className="text-xs text-gray-500">৳{ticket.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-600">{sold} sold / 1000 total</span>
                                                <span className="text-xs font-semibold text-green-600">
                                                    ৳{(sold * ticket.price).toLocaleString()}
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

            {filteredSalesData.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎫</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No sales data found</h3>
                    <p className="text-gray-500">
                        {selectedEvent === 'all' 
                            ? "No events with sales data found."
                            : "No sales data found for the selected event."
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default TicketSales;
