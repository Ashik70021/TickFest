import { useEffect, useState } from "react";

const Attendees = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock attendees data
  const mockAttendees = [
    {
      id: 1,
      name: "Ahmed Rahman",
      email: "ahmed@email.com",
      phone: "+880 1234567890",
      ticketType: "VIP",
      purchaseDate: "2024-12-01",
      eventId: "concert-1",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima@email.com",
      phone: "+880 1987654321",
      ticketType: "General Admission",
      purchaseDate: "2024-12-02",
      eventId: "concert-1",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Mohammad Ali",
      email: "ali@email.com",
      phone: "+880 1122334455",
      ticketType: "Premium",
      purchaseDate: "2024-11-15",
      eventId: "concert-2",
      status: "confirmed",
    },
    {
      id: 4,
      name: "Rashida Begum",
      email: "rashida@email.com",
      phone: "+880 1555666777",
      ticketType: "General Admission",
      purchaseDate: "2024-11-16",
      eventId: "concert-2",
      status: "pending",
    },
    {
      id: 5,
      name: "Karim Hassan",
      email: "karim@email.com",
      phone: "+880 1333444555",
      ticketType: "VIP",
      purchaseDate: "2024-12-10",
      eventId: "sports-1",
      status: "confirmed",
    },
    {
      id: 6,
      name: "Nasir Ahmed",
      email: "nasir@email.com",
      phone: "+880 1777888999",
      ticketType: "General Admission",
      purchaseDate: "2024-12-11",
      eventId: "sports-1",
      status: "confirmed",
    },
    {
      id: 7,
      name: "Salma Khatun",
      email: "salma@email.com",
      phone: "+880 1666777888",
      ticketType: "Premium",
      purchaseDate: "2024-12-05",
      eventId: "concert-1",
      status: "confirmed",
    },
    {
      id: 8,
      name: "Habib Rahman",
      email: "habib@email.com",
      phone: "+880 1444555666",
      ticketType: "General Admission",
      purchaseDate: "2024-11-20",
      eventId: "concert-2",
      status: "cancelled",
    },
  ];

  const [attendees, setAttendees] = useState(mockAttendees);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/events/all-events.json");
        const data = await response.json();

        // Simulate user's events
        const userEvents = data.events.filter(
          (event) =>
            event.organizer.name === "Dhaka Broadcast" ||
            event.organizer.name === "Rock Nation BD" ||
            event.organizer.name === "Bangladesh Cricket Board"
        );

        setEvents(userEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter attendees based on selected event and search term
  const filteredAttendees = attendees.filter((attendee) => {
    const matchesEvent =
      selectedEvent === "all" || attendee.eventId === selectedEvent;
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.phone.includes(searchTerm);
    return matchesEvent && matchesSearch;
  });

  // Get event name by ID
  const getEventName = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.name : "Unknown Event";
  };

  // Calculate attendee statistics
  const calculateStats = () => {
    const totalAttendees = filteredAttendees.length;
    const confirmedAttendees = filteredAttendees.filter(
      (a) => a.status === "confirmed"
    ).length;
    const pendingAttendees = filteredAttendees.filter(
      (a) => a.status === "pending"
    ).length;
    const cancelledAttendees = filteredAttendees.filter(
      (a) => a.status === "cancelled"
    ).length;

    return {
      total: totalAttendees,
      confirmed: confirmedAttendees,
      pending: pendingAttendees,
      cancelled: cancelledAttendees,
    };
  };

  const stats = calculateStats();

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleExportData = () => {
    // Simple CSV export
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Event",
        "Ticket Type",
        "Purchase Date",
        "Status",
      ],
      ...filteredAttendees.map((attendee) => [
        attendee.name,
        attendee.email,
        attendee.phone,
        getEventName(attendee.eventId),
        attendee.ticketType,
        attendee.purchaseDate,
        attendee.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendees.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
              Attendees 👥
            </h1>
            <p className="text-gray-600">Manage and track event attendees</p>
          </div>
          <button
            onClick={handleExportData}
            className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">{stats.total}</p>
          <p className="text-sm text-gray-600 font-medium">Total Attendees</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
              Confirmed
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">{stats.confirmed}</p>
          <p className="text-sm text-gray-600 font-medium">Confirmed</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
            <span className="text-xs text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">{stats.pending}</p>
          <p className="text-sm text-gray-600 font-medium">Pending</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <span className="text-xs text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">
              Cancelled
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">{stats.cancelled}</p>
          <p className="text-sm text-gray-600 font-medium">Cancelled</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Attendees
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Attendees List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Attendee List</h3>

        {filteredAttendees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Attendee
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Event
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Ticket Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Purchase Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {attendee.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="text-gray-800">{attendee.email}</p>
                        <p className="text-gray-600">{attendee.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-800">
                        {getEventName(attendee.eventId)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">
                        {attendee.purchaseDate}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          attendee.status
                        )}`}
                      >
                        {attendee.status.charAt(0).toUpperCase() +
                          attendee.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="text-[#B13BFF] hover:text-[#471396] font-semibold text-xs bg-[#B13BFF]/10 hover:bg-[#B13BFF]/20 px-3 py-1 rounded-lg transition-all duration-300">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 font-semibold text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-all duration-300">
                          Contact
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No attendees found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No attendees match your search criteria."
                : "No attendees found for the selected filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendees;
