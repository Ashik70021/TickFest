import { useNavigate } from 'react-router-dom';
import getImage from "../../utills/grtImage";

export default function Cards({ card }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (card.id) {
      navigate(`/events/${card.id}`);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (card.id) {
      navigate(`/events/${card.id}`);
    }
  };
  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#B13BFF]/30 flex flex-col transform hover:-translate-y-3 border border-gray-100 hover:border-[#B13BFF]/20 w-full cursor-pointer"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image container with enhanced styling */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <img
          src={getImage(card.cover)}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/20 via-transparent to-[#B13BFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Enhanced price badge */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            {card.price || "25"}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#090040] px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
          {card.category || "Concert"}
        </div>

        {/* Floating date indicator on image */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <p className="text-xs font-bold text-[#B13BFF] uppercase tracking-wider">
              {card.month?.toUpperCase() || "DEC"}
            </p>
            <p className="text-2xl font-black text-[#090040] leading-none">
              {card.date || "25"}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced content section */}
      <div className="relative z-10 p-6 flex-1 flex flex-col min-h-0 transition-all duration-700 group-hover:pb-8">
        {/* Event title and description */}
        <div className="space-y-3 mb-4 flex-shrink-0">
          <h3 className="text-lg font-bold text-[#090040] group-hover:text-[#471396] transition-colors duration-300 line-clamp-2 leading-snug overflow-hidden">
            {card.name}
          </h3>
          
          {/* Description with hover expansion - Desktop only, hidden by default */}
          <div className="relative min-h-0">
            {/* Description for desktop - hidden by default, shown on hover */}
            <div className="hidden md:block">
              <p className="text-gray-600 leading-relaxed text-sm opacity-0 invisible max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:max-h-96 group-hover:bg-gradient-to-b group-hover:from-gray-50/90 group-hover:to-white/95 group-hover:p-4 group-hover:rounded-xl group-hover:shadow-lg group-hover:border group-hover:border-[#B13BFF]/20 group-hover:backdrop-blur-sm group-hover:relative group-hover:z-10 group-hover:mb-2">
                {card.description}
              </p>
            </div>
            
            {/* Mobile - no description shown at all */}
            <div className="md:hidden">
              {/* Intentionally empty - no description on mobile */}
            </div>
          </div>
        </div>
        
        {/* Enhanced location and time info */}
        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-2 group-hover:bg-[#B13BFF]/5 transition-colors duration-300">
            <div className="p-1.5 bg-[#B13BFF]/10 rounded-lg flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium text-xs truncate">{card.location || "Dhaka, Bangladesh"}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-2 group-hover:bg-[#471396]/5 transition-colors duration-300">
            <div className="p-1.5 bg-[#471396]/10 rounded-lg flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-[#471396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-xs">{card.time || "7:00 PM"}</span>
          </div>
        </div>

        {/* Availability indicator */}
        <div className="flex items-center justify-between mb-4 p-2 bg-green-50 rounded-xl border border-green-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Available Now</span>
          </div>
          <span className="text-xs text-green-600 font-semibold">{card.tickets || "150+"} tickets left</span>
        </div>

        {/* Full-width enhanced action button */}
        <button 
          onClick={handleButtonClick}
          className="group/btn relative w-full bg-gradient-to-r from-[#471396] via-[#B13BFF] to-[#471396] hover:from-[#B13BFF] hover:via-[#471396] hover:to-[#B13BFF] text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-[#B13BFF]/40 overflow-hidden flex-shrink-0"
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
          
          {/* Button content */}
          <span className="relative flex items-center justify-center gap-2 text-base">
            <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Get Tickets Now
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          
          {/* Button border glow effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Additional info footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instant confirmation
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment
          </span>
        </div>
      </div>
    </div>
  );
}
