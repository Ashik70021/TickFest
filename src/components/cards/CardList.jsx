import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedEvents } from "../../utils/eventsAPI";
import Cards from "./Cards";

export default function CardList() {
  const [cardItems, setCardItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getFeaturedEvents();
        // Show only the latest 6 events for the landing page
        const latestEvents = cards.slice(0, 6);
        setCardItems(latestEvents);
      } catch (error) {
        console.error('Error loading cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/10 to-transparent rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-[#471396]/10 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#B13BFF]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center px-6 md:px-12 py-16">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 max-w-4xl">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 rounded-full border border-[#B13BFF]/30 mb-8">
            <span className="text-[#B13BFF] mr-2">🎪</span>
            <span className="text-[#090040] font-semibold">Featured Events</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-[#090040] mb-6 leading-tight">
            <span className="block">Discover</span>
            <span className="block bg-gradient-to-r from-[#471396] to-[#B13BFF] bg-clip-text text-transparent">
              Amazing Events
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From electrifying concerts to inspiring conferences, find the perfect events that match your interests and create unforgettable memories.
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {cardItems.map((card, index) => (
              <div
                key={card.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <Cards card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Load More Section */}
        <div className="mt-20 text-center">
          <div className="space-y-6">
            <p className="text-gray-600 font-medium">
              Showing {cardItems.length} of 12+ amazing events
            </p>
            <Link 
              to="/events"
              className="group relative inline-block bg-gradient-to-r from-[#471396] to-[#B13BFF] hover:from-[#B13BFF] hover:to-[#471396] text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-[#B13BFF]/30 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                Load More Events
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Categories Filter Section */}
        {/* <div className="mt-16 w-full max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#B13BFF]/10">
            <h3 className="text-2xl font-bold text-[#090040] text-center mb-8">Browse by Category</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["All Events", "Concerts", "Sports", "Theater", "Conferences", "Festivals", "Comedy"].map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 rounded-full border-2 border-[#B13BFF]/30 text-[#471396] hover:bg-gradient-to-r hover:from-[#B13BFF] hover:to-[#471396] hover:text-white hover:border-transparent transition-all duration-300 font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
