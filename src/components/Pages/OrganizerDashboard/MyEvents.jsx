import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/events/all-events.json');
                const data = await response.json();
                
                // Filter events by organizer (simulating user's events)
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

    const getStatusColor = (event) => {
        const eventDate = new Date(event.fullDate);
        const now = new Date();
        
        if (eventDate < now) return 'bg-gray-100 text-gray-600';
        if (eventDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return 'bg-yellow-100 text-yellow-600';
        return 'bg-green-100 text-green-600';
    };

    const getStatusText = (event) => {
        const eventDate = new Date(event.fullDate);
        const now = new Date();
        
        if (eventDate < now) return 'Completed';
        if (eventDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return 'Upcoming';
        return 'Planning';
    };

    const filteredEvents = events.filter(event => {
        const status = getStatusText(event);
        if (filter === 'all') return true;
        return status.toLowerCase() === filter;
    });

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
                            My Events 🎭
                        </h1>
                        <p className="text-gray-600">
                            Manage and track all your events in one place
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-wrap gap-2">
                    {['all', 'planning', 'upcoming', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                                filter === status
                                    ? 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)} 
                            <span className="ml-1 text-xs">
                                ({status === 'all' ? events.length : filteredEvents.length})
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative mb-4">
                            <img 
                                src={`/src/assets/${event.cover}`} 
                                alt={event.name}
                                className="w-full h-48 object-cover rounded-2xl"
                                onError={(e) => {
                                    e.target.src = '/src/assets/image-1.jpg';
                                }}
                            />
                            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event)}`}>
                                {getStatusText(event)}
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{event.name}</h3>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-lg">📅</span>
                                <span className="text-sm">{event.date} {event.month} {event.year} • {event.time}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-lg">📍</span>
                                <span className="text-sm line-clamp-1">{event.venue}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-lg">🎫</span>
                                <span className="text-sm">
                                    {event.ticketTypes?.reduce((total, ticket) => total + (1000 - ticket.remaining), 0) || 0} sold
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-lg">💰</span>
                                <span className="text-sm font-semibold text-green-600">
                                    ৳{(event.ticketTypes?.reduce((total, ticket) => 
                                        total + ((1000 - ticket.remaining) * ticket.price), 0
                                    ) || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 text-[#471396] py-2 px-4 rounded-xl font-semibold hover:from-[#B13BFF]/30 hover:to-[#471396]/30 transition-all duration-300 text-sm">
                                📊 Analytics
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white py-2 px-4 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 text-sm">
                                ✏️ Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎭</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No events found</h3>
                    <p className="text-gray-500">
                        {filter === 'all' 
                            ? "You don't have any events yet. Check back later for your upcoming events!"
                            : `No ${filter} events found. Try a different filter.`
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyEvents;
