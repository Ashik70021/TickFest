import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../data/cards";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All Events", "Concert", "Sports", "Theatre", "Conference", "Festival", "Comedy"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getData();
        setEvents(eventData);
        setFilteredEvents(eventData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== "All Events") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/10 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-[#471396]/10 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#B13BFF]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 rounded-full border border-[#B13BFF]/30 mb-8">
            <span className="text-[#B13BFF] mr-2">🎪</span>
            <span className="text-[#090040] font-semibold">All Events</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#471396] via-[#B13BFF] to-[#471396] mb-6 leading-tight">
            Discover Amazing Events
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Browse through our collection of exciting events happening in Dhaka. From concerts to conferences, find your next adventure!
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#B13BFF]/10">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search events, venues, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-2xl border-2 border-[#B13BFF]/20 focus:border-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/20 transition-all duration-300"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#090040] mb-6">Filter by Category</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white border-transparent"
                        : "border-[#B13BFF]/30 text-[#471396] hover:bg-gradient-to-r hover:from-[#B13BFF] hover:to-[#471396] hover:text-white hover:border-transparent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#090040]">
              {selectedCategory === "All Events" ? "All Events" : selectedCategory} 
              <span className="text-[#B13BFF] ml-2">({filteredEvents.length})</span>
            </h2>
            <div className="text-sm text-gray-600">
              {searchTerm && (
                <span>Search results for "<strong>{searchTerm}</strong>"</span>
              )}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="group block transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-[#B13BFF]/20 overflow-hidden border border-gray-100 transition-all duration-300">
                    {/* Event Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={`/src/assets/${event.cover}`} 
                        alt={event.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {event.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 text-center">
                        <div className="text-2xl font-bold text-[#471396]">{event.date}</div>
                        <div className="text-sm text-gray-600">{event.month}</div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#090040] mb-3 group-hover:text-[#B13BFF] transition-colors duration-300">
                        {event.name}
                      </h3>
                      
                      <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{event.venue}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-[#B13BFF] font-bold">
                          From ৳{event.ticketTypes?.[0]?.price || 'TBD'}
                        </div>
                        <div className="flex items-center gap-2 text-[#471396] font-semibold">
                          <span>View Details</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
