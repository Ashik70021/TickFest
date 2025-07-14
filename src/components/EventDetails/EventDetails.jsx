import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getImage from '../../utills/grtImage';
import VenueMap from '../common/VenueMap';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('/events/all-events.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const eventData = data.events.find(event => event.id === eventId);
        
        if (!eventData) {
          throw new Error('Event not found');
        }
        
        setEvent(eventData);
        if (eventData.ticketTypes && eventData.ticketTypes.length > 0) {
          setSelectedTicket(eventData.ticketTypes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleBookNow = () => {
    if (!selectedTicket) return;
    
    const bookingData = {
      event: event,
      ticket: selectedTicket,
      quantity: quantity,
      total: selectedTicket.price * quantity
    };
    
    // Store booking data in localStorage for checkout
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to checkout page (you'll need to create this)
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#B13BFF] text-white px-6 py-3 rounded-lg hover:bg-[#471396] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={getImage(event.cover)}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#090040]/60 to-[#B13BFF]/40"></div>
        
        {/* Event Header Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#B13BFF] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {event.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">{event.date} {event.month} {event.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{event.time} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold">{event.venue}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Action Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Book Tickets Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
