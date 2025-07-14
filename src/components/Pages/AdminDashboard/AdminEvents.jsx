import { useState } from 'react';

const AdminEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState('table'); // table or grid

    // Enhanced dummy data with more events
    const events = [
        {
            id: "EVT001",
            name: "Tech Expo 2025",
            category: "Technology",
            description: "A grand exhibition of new tech startups and products showcasing innovation.",
            location: "Dhaka Convention Center",
            date: "2025-07-15",
            time: "10:00 AM",
            price: "500 BDT",
            status: "Active",
            bannerUrl: "/api/placeholder/300/200",
            createdAt: "2025-06-10 14:30",
            updatedAt: "2025-06-12 10:20",
            attendees: 250,
            capacity: 500,
            ticketsSold: 125,
            revenue: "62,500 BDT"
        },
        {
            id: "EVT002",
            name: "Comedy Fiesta",
            category: "Entertainment",
            description: "Stand-up night with Bangladesh's top comedians bringing laughter to your evening.",
            location: "Chittagong Club",
            date: "2025-08-01",
            time: "07:30 PM",
            price: "300 BDT",
            status: "Inactive",
            bannerUrl: "/api/placeholder/300/200",
            createdAt: "2025-06-11 11:45",
            updatedAt: "2025-06-15 09:10",
            attendees: 150,
            capacity: 300,
            ticketsSold: 89,
            revenue: "26,700 BDT"
        },
        {
            id: "EVT003",
            name: "Business Summit",
            category: "Business",
            description: "Annual business summit featuring industry leaders and networking opportunities.",
            location: "Sylhet International Convention Center",
            date: "2025-09-20",
            time: "09:00 AM",
            price: "800 BDT",
            status: "Active",
            bannerUrl: "/api/placeholder/300/200",
            createdAt: "2025-06-20 16:15",
            updatedAt: "2025-06-22 14:30",
            attendees: 400,
            capacity: 600,
            ticketsSold: 234,
            revenue: "187,200 BDT"
        }
    ];

    // Filter and search logic
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || event.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Stats calculation
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'Active').length;
    const totalRevenue = events.reduce((sum, event) => sum + parseInt(event.revenue.replace(/[^\d]/g, '')), 0);
    const totalTicketsSold = events.reduce((sum, event) => sum + event.ticketsSold, 0);

    return (
        <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-[#090040] mb-2">
                            Event Management
                        </h1>
                        <p className="text-gray-600">Manage and monitor all your events</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                        <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Event
                            </span>
                        </button>
                        <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#B13BFF]/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Events</p>
                                <p className="text-3xl font-bold text-[#090040]">{totalEvents}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-green-400/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Active Events</p>
                                <p className="text-3xl font-bold text-[#090040]">{activeEvents}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#471396]/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Tickets Sold</p>
                                <p className="text-3xl font-bold text-[#090040]">{totalTicketsSold.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#471396] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-yellow-400/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Revenue</p>
                                <p className="text-3xl font-bold text-[#090040]">৳{totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search events, categories, locations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            {/* Sort By */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="name">Sort by Name</option>
                                <option value="revenue">Sort by Revenue</option>
                                <option value="tickets">Sort by Tickets</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'table' ? 'bg-[#B13BFF] text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-[#B13BFF] text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Events Display */}
            {viewMode === 'table' ? (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Sales</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEvents.map((event, index) => (
                                    <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img className="h-12 w-12 rounded-lg object-cover border border-gray-200" src={event.bannerUrl} alt={event.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{event.name}</div>
                                                    <div className="text-sm text-gray-500">{event.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#471396]/10 text-[#471396] border border-[#471396]/20">
                                                {event.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div>{event.date}</div>
                                            <div className="text-gray-500">{event.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{event.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div>{event.ticketsSold}/{event.capacity}</div>
                                            <div className="text-xs text-gray-500">{event.revenue}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                                                <div className={`w-2 h-2 rounded-full mr-2 ${event.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="bg-[#471396] hover:bg-[#B13BFF] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="bg-red-100 hover:bg-red-500 text-red-600 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-red-200">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="relative h-48">
                                <img src={event.bannerUrl} alt={event.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 right-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'} backdrop-blur-sm`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-lg font-bold text-white mb-1">{event.name}</h3>
                                    <p className="text-sm text-white/80">{event.category}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {event.date} at {event.time}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-[#471396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {event.location}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">{event.price}</span>
                                        <span className="text-sm text-gray-500">{event.ticketsSold}/{event.capacity} sold</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white py-2 px-4 rounded-lg hover:from-[#B13BFF] hover:to-[#471396] transition-all duration-300 transform hover:scale-105 text-sm font-semibold">
                                        Edit Event
                                    </button>
                                    <button className="bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No results message */}
            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or add a new event.</p>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
