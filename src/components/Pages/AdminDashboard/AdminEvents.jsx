import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState('table'); // table or grid
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API Base URL from environment
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Helper function to get image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === 'placeholder.jpg') {
            return '/api/placeholder/400/200';
        }
        
        // If imagePath is already a full URL, return it as is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            console.log('Using full URL from backend:', imagePath);
            return imagePath;
        }
        
        // Clean any duplicate paths and ensure proper structure
        let cleanPath = imagePath;
        
        // Remove any leading slashes or duplicate uploads paths
        cleanPath = cleanPath.replace(/^\/+/, ''); // Remove leading slashes
        cleanPath = cleanPath.replace(/^uploads\//, ''); // Remove leading uploads/ if present
        
        // Construct the proper URL
        const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${cleanPath}`;
        console.log('Generated image URL:', imageUrl);
        return imageUrl;
    };

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api.php/api/events`);
                
                // Transform the API data to match our component structure
                const transformedEvents = response.data.map(event => ({
                    ...event,
                    // Ensure we have the required fields
                    status: event.status || 'Active',
                    featured: event.featured || false,
                    // Transform ticketTypes if needed
                    ticketTypes: event.ticketTypes || event.ticket_types || [],
                    // Ensure cover image path
                    cover: event.cover || event.image || 'placeholder.jpg'
                }));

                console.log('Transformed events sample:', transformedEvents[0]);
                console.log('Cover image sample:', transformedEvents[0]?.cover);
                setEvents(transformedEvents);
                setError(null);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to fetch events. Please try again.');
                setEvents([]); // Set empty array as fallback
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [API_BASE_URL]);

    // Filter and search logic
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.venue.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesFilter = true;
        if (filterStatus === 'featured') {
            matchesFilter = event.featured;
        } else if (filterStatus !== 'all') {
            matchesFilter = event.status.toLowerCase() === filterStatus.toLowerCase();
        }
        
        return matchesSearch && matchesFilter;
    });

    // Helper functions for calculations
    const getTotalTickets = (event) => {
        if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
        return event.ticketTypes.reduce((sum, ticket) => sum + (ticket.remaining || 0), 0);
    };

    const getTicketsSold = (event) => {
        if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
        // Assuming initial capacity minus remaining gives sold tickets
        const totalCapacity = event.ticketTypes.reduce((sum, ticket) => {
            // Estimate initial capacity (remaining + sold)
            const estimatedInitial = (ticket.remaining || 0) * 1.5; // Rough estimate
            return sum + estimatedInitial;
        }, 0);
        return Math.floor(totalCapacity - getTotalTickets(event));
    };

    const getEventRevenue = (event) => {
        if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
        return event.ticketTypes.reduce((sum, ticket) => {
            const sold = Math.floor((ticket.remaining || 0) * 0.5); // Rough estimate of sold tickets
            return sum + (sold * (ticket.price || 0));
        }, 0);
    };

    // Stats calculation
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'Active').length;
    const totalRevenue = events.reduce((sum, event) => sum + getEventRevenue(event), 0);
    const totalTicketsSold = events.reduce((sum, event) => sum + getTicketsSold(event), 0);
    const featuredEvents = events.filter(e => e.featured).length;

    return (
        <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading events...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-700">{error}</span>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="ml-auto bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content - Only show when not loading */}
            {!loading && (
                <>
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
                                <p className="text-gray-600 text-sm">Featured Events</p>
                                <p className="text-3xl font-bold text-[#090040]">{featuredEvents}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#471396] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
                                <option value="featured">Featured Only</option>
                            </select>

                            {/* Sort By */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="name">Sort by Name</option>
                                <option value="category">Sort by Category</option>
                                <option value="revenue">Sort by Revenue</option>
                                <option value="featured">Featured First</option>
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
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Venue</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Tickets</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img 
                                                        className="h-12 w-12 rounded-lg object-cover border border-gray-200" 
                                                        src={getImageUrl(event.cover)} 
                                                        alt={event.name}
                                                        onError={(e) => {
                                                            console.log('Table image load error for:', event.cover);
                                                            console.log('Full image URL:', `${import.meta.env.VITE_API_URL}/uploads/${event.cover}`);
                                                            e.target.src = '/api/placeholder/48/48';
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{event.name}</div>
                                                    <div className="text-sm text-gray-500">{event.id}</div>
                                                    {event.featured && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                                            </svg>
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#471396]/10 text-[#471396] border border-[#471396]/20">
                                                {event.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div>{event.date} {event.month} {event.year}</div>
                                            <div className="text-gray-500">{event.time} - {event.endTime}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="font-medium">{event.venue}</div>
                                            <div className="text-gray-500">{event.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="space-y-1">
                                                {event.ticketTypes && event.ticketTypes.length > 0 ? (
                                                    event.ticketTypes.map((ticket, idx) => (
                                                        <div key={idx} className="flex justify-between">
                                                            <span className="text-xs text-gray-600">{ticket.name}:</span>
                                                            <span className="text-xs font-medium">{ticket.remaining || 0} left</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400">No ticket info</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                                                <div className={`w-2 h-2 rounded-full mr-2 ${event.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-blue-200">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
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
                                <img 
                                    src={getImageUrl(event.cover)} 
                                    alt={event.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.log('Grid image load error for:', event.cover);
                                        console.log('Full image URL:', `${import.meta.env.VITE_API_URL}/uploads/${event.cover}`);
                                        e.target.src = '/api/placeholder/400/200';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'} backdrop-blur-sm`}>
                                        {event.status}
                                    </span>
                                    {event.featured && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 backdrop-blur-sm">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                            </svg>
                                            Featured
                                        </span>
                                    )}
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
                                        {event.date} {event.month} {event.year} at {event.time}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-[#471396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {event.venue}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">
                                            {event.ticketTypes && event.ticketTypes.length > 0 ? (
                                                `৳${Math.min(...event.ticketTypes.map(t => t.price || 0))} - ৳${Math.max(...event.ticketTypes.map(t => t.price || 0))}`
                                            ) : (
                                                'Price TBA'
                                            )}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {getTotalTickets(event)} tickets left
                                        </span>
                                    </div>
                                    
                                    {/* Ticket Types */}
                                    <div className="space-y-1">
                                        {event.ticketTypes && event.ticketTypes.length > 0 ? (
                                            event.ticketTypes.map((ticket, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-600">{ticket.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">৳{ticket.price || 0}</span>
                                                        <span className={`px-2 py-0.5 rounded-full ${ticket.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {ticket.remaining || 0} left
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-400 text-center py-2">
                                                No ticket information available
                                            </div>
                                        )}
                                    </div>

                                    {/* Organizer Info */}
                                    <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Organized by {event.organizer?.name || 'Unknown Organizer'}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm font-semibold border border-blue-200">
                                        View Details
                                    </button>
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

            {/* Summary Section */}
            {filteredEvents.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-[#090040]">{filteredEvents.length}</div>
                            <div className="text-sm text-gray-600">Displayed Events</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-green-600">
                                {filteredEvents.filter(e => e.status === 'Active').length}
                            </div>
                            <div className="text-sm text-gray-600">Active Events</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-yellow-600">
                                {filteredEvents.filter(e => e.featured).length}
                            </div>
                            <div className="text-sm text-gray-600">Featured Events</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-[#471396]">
                                ৳{filteredEvents.reduce((sum, event) => sum + getEventRevenue(event), 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Total Revenue</div>
                        </div>
                    </div>
                </div>
            )}
                </>
            )}
        </div>
    );
};

export default AdminEvents;
