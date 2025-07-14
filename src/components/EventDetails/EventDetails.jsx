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
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                { id: 'details', label: 'Event Details' },
                { id: 'artists', label: 'Artists' },
                { id: 'venue', label: 'Venue Info' },
                { id: 'rules', label: 'Rules' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition-colors ${activeTab === tab.id
                      ? 'border-b-2 border-[#B13BFF] text-[#B13BFF]'
                      : 'text-gray-600 hover:text-[#B13BFF]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#090040] mb-4">About This Event</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {event.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#090040] mb-4">Event Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(event.highlights || []).map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#B13BFF]/5 to-[#471396]/5 rounded-xl">
                          <svg className="w-5 h-5 text-[#B13BFF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#090040] mb-4">Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(event.amenities || []).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 font-medium">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'artists' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#090040] mb-4">
                    {event.artists && event.artists.length > 0 ? 'Performing Artists' :
                      event.speakers && event.speakers.length > 0 ? 'Featured Speakers' :
                        event.performers && event.performers.length > 0 ? 'Performers' :
                          event.comedians && event.comedians.length > 0 ? 'Comedians' :
                            event.teams && event.teams.length > 0 ? 'Teams' :
                              'Participants'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(event.artists || event.speakers || event.performers || event.comedians || event.teams || []).map((person, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 p-6 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{person.name[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#090040]">{person.name}</h3>
                            <p className="text-[#B13BFF] font-semibold">{person.role || person.captain || person.type}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{person.bio || person.description || person.achievements}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'venue' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#090040] mb-4">Venue Information</h2>

                  {/* Venue Details */}
                  <div className="bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-[#090040] mb-3">{event.venue}</h3>
                    <div className="flex items-start gap-3 mb-4">
                      <svg className="w-5 h-5 text-[#B13BFF] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-gray-700 font-medium">{event.venueAddress}</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>

                    {event.organizer && (
                      <div className="border-t pt-4">
                        <h4 className="font-bold text-[#090040] mb-2">Organizer</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{event.organizer.name ? event.organizer.name[0] : 'O'}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-[#090040]">{event.organizer.name || 'Event Organizer'}</p>
                            <p className="text-gray-600 text-sm">{event.organizer.contact || event.organizer.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Map */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#090040]">Venue Location</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        <span>Interactive Map</span>
                      </div>
                    </div>

                    <VenueMap
                      venue={event.venue}
                      venueAddress={event.venueAddress}
                      coordinates={event.coordinates}
                    />

                    {/* Additional Map Info */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">Click the marker for directions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="text-gray-700">Use mouse wheel to zoom</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#090040] mb-4">Event Rules & Guidelines</h2>
                  <div className="space-y-4">
                    {(event.rules || []).map((rule, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-gray-700 font-medium">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Ticket Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6" id="tickets">
              <h2 className="text-2xl font-bold text-[#090040] mb-6">Select Tickets</h2>

              {/* Ticket Types */}
              <div className="space-y-4 mb-6">
                {(event.ticketTypes || []).map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handleTicketSelection(ticket)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${selectedTicket?.id === ticket.id
                        ? 'bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 border-2 border-[#B13BFF]'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-[#B13BFF]/50'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-[#090040]">{ticket.name}</h3>
                        <p className="text-sm text-gray-600">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#B13BFF]">৳{ticket.price}</p>
                        {ticket.originalPrice > ticket.price && (
                          <p className="text-sm text-gray-500 line-through">৳{ticket.originalPrice}</p>
                        )}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${ticket.availability === 'available' ? 'bg-green-500' :
                            ticket.availability === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        <span className="text-sm font-medium capitalize">{ticket.availability}</span>
                      </div>
                      <span className="text-sm text-gray-600">{ticket.remaining} left</span>
                    </div>

                    {/* Benefits */}
                    {selectedTicket?.id === ticket.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-semibold text-[#090040] mb-2">Includes:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(ticket.benefits || []).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#090040] mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-bold text-[#090040] w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#090040]">Total Amount:</span>
                  <span className="text-2xl font-bold text-[#B13BFF]">
                    ৳{selectedTicket ? selectedTicket.price * quantity : 0}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!selectedTicket || selectedTicket.availability === 'sold-out'}
                className="w-full bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold py-4 px-6 rounded-2xl hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {selectedTicket?.availability === 'sold-out' ? 'Sold Out' : 'Book Now'}
              </button>

              {/* Security Info */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure payment & instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
