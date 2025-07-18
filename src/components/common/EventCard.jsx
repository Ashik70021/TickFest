import { Link } from "react-router-dom";
import getImage from "../../utils/grtImage";

const EventCard = ({ event }) => {
  const formatPrice = (price) => {
    if (!price || price === 0) return 'Free';
    return `৳${price}`;
  };

  const getLowestPrice = () => {
    if (!event.ticketTypes || event.ticketTypes.length === 0) return 'TBD';
    const prices = event.ticketTypes.map(ticket => ticket.price).filter(price => price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block transform hover:scale-105 transition-all duration-300"
    >
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-[#B13BFF]/20 overflow-hidden border border-gray-100 transition-all duration-300">
        {/* Event Image */}
        <div className="relative overflow-hidden">
          <img 
            src={getImage(event.cover)} 
            alt={event.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-4 py-2 rounded-full text-sm font-semibold">
            {event.category}
          </div>
          {event.featured && (
            <div className="absolute top-4 left-4 mt-12 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-[#471396]">{event.date}</div>
            <div className="text-sm text-gray-600">{event.month}</div>
          </div>
        </div>

        {/* Event Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#090040] mb-3 group-hover:text-[#B13BFF] transition-colors duration-300 line-clamp-2">
            {event.name}
          </h3>
          
          <div className="space-y-2 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#B13BFF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#B13BFF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm truncate">{event.venue}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-[#B13BFF] font-bold">
              From {formatPrice(getLowestPrice())}
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
  );
};

export default EventCard;
