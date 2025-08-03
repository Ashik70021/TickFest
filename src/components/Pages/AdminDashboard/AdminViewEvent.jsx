import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminViewEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  // API Base URL from environment
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Helper function to get image URL
  const getImageUrl = useCallback(
    (imagePath) => {
      if (!imagePath || imagePath === "placeholder.jpg" || imagePath === "") {
        return "/api/placeholder/400/200";
      }

      if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
      }

      // Handle different path formats that might come from the API
      let cleanPath = imagePath.replace(/^\/+/, "").replace(/^uploads\//, "");

      // Remove any double slashes or normalize path
      cleanPath = cleanPath.replace(/\/+/g, "/");

      const finalUrl = `${API_BASE_URL}/uploads/${cleanPath}`;
      console.log("Generated image URL:", finalUrl, "from path:", imagePath);

      return finalUrl;
    },
    [API_BASE_URL]
  );

  // Fetch event data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api.php/api/events/${id}`
        );
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Failed to fetch event data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id, API_BASE_URL]);

  // Helper functions for calculations
  const getTotalTickets = (event) => {
    if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
    return event.ticketTypes.reduce(
      (sum, ticket) => sum + (ticket.remaining || 0),
      0
    );
  };

  const getTicketsSold = (event) => {
    if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
    const totalCapacity = event.ticketTypes.reduce((sum, ticket) => {
      const estimatedInitial = (ticket.remaining || 0) * 1.5;
      return sum + estimatedInitial;
    }, 0);
    return Math.floor(totalCapacity - getTotalTickets(event));
  };

  const getEventRevenue = (event) => {
    if (!event.ticketTypes || !Array.isArray(event.ticketTypes)) return 0;
    return event.ticketTypes.reduce((sum, ticket) => {
      const sold = Math.floor((ticket.remaining || 0) * 0.5);
      return sum + sold * (ticket.price || 0);
    }, 0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700">{error}</span>
              <button
                onClick={() => navigate("/admindashboard/events")}
                className="ml-auto bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Event not found
            </h3>
            <p className="text-gray-500 mb-4">
              The event you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => navigate("/admindashboard/events")}
              className="bg-[#B13BFF] hover:bg-[#471396] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#090040] mb-2">
                Event Details
              </h1>
              <p className="text-gray-600">
                Comprehensive view of event information
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admindashboard/events")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                ← Back to Events
              </button>
              <button
                onClick={() => navigate(`/admindashboard/events/edit/${id}`)}
                className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300"
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Cover & Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="relative h-64 lg:h-80">
                <img
                  src={getImageUrl(event.cover)}
                  alt={event.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/800/400";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "Active"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    } backdrop-blur-sm`}
                  >
                    {event.status}
                  </span>
                  {event.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 backdrop-blur-sm">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {event.name}
                  </h1>
                  <div className="flex items-center text-white/90 gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#471396]/20 backdrop-blur-sm border border-white/20">
                      {event.category}
                    </span>
                    <span className="text-sm">ID: {event.id}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-[#B13BFF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Date & Time
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Date:</span> {event.date}{" "}
                        {event.month} {event.year}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Start Time:</span>{" "}
                        {event.time}
                      </p>
                      {event.endTime && (
                        <p className="text-gray-700">
                          <span className="font-medium">End Time:</span>{" "}
                          {event.endTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-[#471396]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      Location
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Venue:</span>{" "}
                        {event.venue}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Location:</span>{" "}
                        {event.location}
                      </p>
                      {event.coordinates && (
                        <p className="text-gray-700">
                          <span className="font-medium">Coordinates:</span>{" "}
                          {event.coordinates.latitude},{" "}
                          {event.coordinates.longitude}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {event.description && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Organizer Information */}
            {event.organizer && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#090040] mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-[#B13BFF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Organizer Information
                </h2>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Organizer Logo - Left Side */}
                  {event.organizer.logo && (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img
                          src={getImageUrl(event.organizer.logo)}
                          alt={`${event.organizer.name} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/100/100";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Organizer Details - Right Side */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-gray-700">
                          <span className="font-medium">Name:</span>{" "}
                          {event.organizer.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Email:</span>{" "}
                          {event.organizer.email}
                        </p>
                        {event.organizer.phone && (
                          <p className="text-gray-700">
                            <span className="font-medium">Phone:</span>{" "}
                            {event.organizer.phone}
                          </p>
                        )}
                      </div>
                      {event.organizer.bio && (
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Bio:</p>
                          <p className="text-gray-700 leading-relaxed">
                            {event.organizer.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Artist Information */}
            {event.artists && event.artists.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#090040] mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-[#B13BFF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  Artist Information
                </h2>
                {event.artists.map((artist, index) => (
                  <div
                    key={index}
                    className={`${
                      index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700">
                          <span className="font-medium">Name:</span>{" "}
                          {artist.name}
                        </p>
                        {artist.genre && (
                          <p className="text-gray-700">
                            <span className="font-medium">Genre:</span>{" "}
                            {artist.genre}
                          </p>
                        )}
                      </div>
                      {artist.bio && (
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Bio:</p>
                          <p className="text-gray-700">{artist.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#090040] mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-[#B13BFF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Event Gallery ({event.gallery.length} images)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.gallery.map((image, index) => {
                    // Handle different possible image path properties
                    const imagePath =
                      image.image_path ||
                      image.path ||
                      image.url ||
                      image.src ||
                      image;
                    const imageUrl =
                      typeof imagePath === "string"
                        ? getImageUrl(imagePath)
                        : "/api/placeholder/200/200";

                    return (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg border border-gray-200 group relative"
                      >
                        <img
                          src={imageUrl}
                          alt={`Event gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onError={(e) => {
                            console.log(
                              `Failed to load gallery image ${index}:`,
                              imagePath
                            );
                            e.target.src = "/api/placeholder/200/200";
                          }}
                          onClick={() => {
                            // Optional: Add lightbox or modal functionality
                            window.open(imageUrl, "_blank");
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Tickets */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Tickets</span>
                  <span className="font-semibold text-gray-900">
                    {getTotalTickets(event)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tickets Sold</span>
                  <span className="font-semibold text-green-600">
                    {getTicketsSold(event)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-semibold text-[#471396]">
                    ৳{getEventRevenue(event).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            {event.ticketTypes && event.ticketTypes.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-[#B13BFF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 100 2H4a1 1 0 00-1 1v3a2 2 0 002 2h14a2 2 0 002-2v-3a1 1 0 00-1-1h-1a1 1 0 100-2h1a1 1 0 001-1V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  Ticket Types
                </h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {ticket.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ticket.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">
                            ৳{ticket.price || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Remaining:</span>
                          <span className="font-medium">
                            {ticket.remaining || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewEvent;
