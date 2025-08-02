import { useEffect, useState } from "react";

const Analytics = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(true);

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

  // Calculate analytics data
  const calculateAnalytics = () => {
    const analytics = {
      totalEvents: events.length,
      totalTicketsSold: 0,
      totalRevenue: 0,
      averageTicketPrice: 0,
      topEvent: null,
      categoryPerformance: {},
      salesTrend: [],
      audienceInsights: {
        totalAttendees: 0,
        repeatCustomers: 15, // Mock data
        averageAge: 28, // Mock data
        genderSplit: { male: 52, female: 48 }, // Mock data
      },
    };

    // Calculate totals and find top event
    let maxRevenue = 0;
    events.forEach((event) => {
      const eventRevenue =
        event.ticketTypes?.reduce((acc, ticket) => {
          const sold = 1000 - ticket.remaining;
          return acc + sold * ticket.price;
        }, 0) || 0;

      const ticketsSold =
        event.ticketTypes?.reduce((acc, ticket) => {
          return acc + (1000 - ticket.remaining);
        }, 0) || 0;

      analytics.totalRevenue += eventRevenue;
      analytics.totalTicketsSold += ticketsSold;

      if (eventRevenue > maxRevenue) {
        maxRevenue = eventRevenue;
        analytics.topEvent = {
          ...event,
          revenue: eventRevenue,
          ticketsSold,
        };
      }

      // Category performance
      if (!analytics.categoryPerformance[event.category]) {
        analytics.categoryPerformance[event.category] = {
          events: 0,
          revenue: 0,
          ticketsSold: 0,
        };
      }
      analytics.categoryPerformance[event.category].events += 1;
      analytics.categoryPerformance[event.category].revenue += eventRevenue;
      analytics.categoryPerformance[event.category].ticketsSold += ticketsSold;
    });

    analytics.averageTicketPrice =
      analytics.totalTicketsSold > 0
        ? Math.round(analytics.totalRevenue / analytics.totalTicketsSold)
        : 0;

    analytics.audienceInsights.totalAttendees = analytics.totalTicketsSold;

    // Mock sales trend data
    analytics.salesTrend = [
      { date: "2024-11-01", sales: 45 },
      { date: "2024-11-02", sales: 52 },
      { date: "2024-11-03", sales: 38 },
      { date: "2024-11-04", sales: 67 },
      { date: "2024-11-05", sales: 55 },
      { date: "2024-11-06", sales: 72 },
      { date: "2024-11-07", sales: 48 },
      { date: "2024-11-08", sales: 61 },
      { date: "2024-11-09", sales: 56 },
      { date: "2024-11-10", sales: 73 },
      { date: "2024-11-11", sales: 68 },
      { date: "2024-11-12", sales: 84 },
      { date: "2024-11-13", sales: 79 },
      { date: "2024-11-14", sales: 92 },
    ];

    return analytics;
  };

  const analytics = calculateAnalytics();

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
              Analytics 📊
            </h1>
            <p className="text-gray-600">
              Deep insights into your event performance
            </p>
          </div>
          <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg">
            📈 Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">
            {analytics.totalEvents}
          </p>
          <p className="text-sm text-gray-600 font-medium">Total Events</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎫</span>
            </div>
            <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
              Sold
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">
            {analytics.totalTicketsSold.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 font-medium">Tickets Sold</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">
              Revenue
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">
            ৳{analytics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <span className="text-xs text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full">
              Avg
            </span>
          </div>
          <p className="text-3xl font-black text-gray-800">
            ৳{analytics.averageTicketPrice}
          </p>
          <p className="text-sm text-gray-600 font-medium">Avg Ticket Price</p>
        </div>
      </div>

      {/* Filters */}
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
              Time Period
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Event Performance */}
      {analytics.topEvent && (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            🏆 Top Performing Event
          </h3>

          <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-2xl p-6 border border-[#B13BFF]/20">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  {analytics.topEvent.name}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    📅 {analytics.topEvent.date} {analytics.topEvent.month}{" "}
                    {analytics.topEvent.year}
                  </span>
                  <span className="flex items-center gap-1">
                    📍 {analytics.topEvent.venue}
                  </span>
                  <span className="flex items-center gap-1">
                    🎭 {analytics.topEvent.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:w-80">
                <div className="text-center">
                  <p className="text-2xl font-black text-green-600">
                    ৳{analytics.topEvent.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-600">
                    {analytics.topEvent.ticketsSold}
                  </p>
                  <p className="text-xs text-gray-600">Tickets Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-purple-600">
                    ৳
                    {analytics.topEvent.ticketsSold > 0
                      ? Math.round(
                          analytics.topEvent.revenue /
                            analytics.topEvent.ticketsSold
                        )
                      : 0}
                  </p>
                  <p className="text-xs text-gray-600">Avg Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Performance */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Performance by Category
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analytics.categoryPerformance).map(
            ([category, data]) => (
              <div key={category} className="bg-gray-50/50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800">{category}</h4>
                  <span className="text-xs bg-[#B13BFF]/20 text-[#471396] px-2 py-1 rounded-full">
                    {data.events} events
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold text-green-600">
                      ৳{data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tickets Sold</span>
                    <span className="font-semibold text-blue-600">
                      {data.ticketsSold}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg per Event</span>
                    <span className="font-semibold text-purple-600">
                      ৳
                      {data.events > 0
                        ? Math.round(
                            data.revenue / data.events
                          ).toLocaleString()
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Sales Trend */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Daily Sales Trend (Last 14 Days)
        </h3>

        <div className="space-y-3">
          {analytics.salesTrend.map((day, index) => {
            const maxSales = Math.max(
              ...analytics.salesTrend.map((d) => d.sales)
            );
            const percentage = (day.sales / maxSales) * 100;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-xs font-medium text-gray-600">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="bg-gray-200 rounded-full h-2 flex-1 mr-3">
                      <div
                        className="bg-gradient-to-r from-[#B13BFF] to-[#471396] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-12 text-right">
                      {day.sales}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Audience Insights
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600">
                  {analytics.audienceInsights.totalAttendees}
                </p>
                <p className="text-sm text-gray-600">Total Attendees</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-green-600">
                  {analytics.audienceInsights.repeatCustomers}%
                </p>
                <p className="text-sm text-gray-600">Repeat Customers</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-purple-600">
                {analytics.audienceInsights.averageAge}
              </p>
              <p className="text-sm text-gray-600">Average Age</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Gender Distribution
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Male</span>
                  <span className="font-semibold text-blue-600">
                    {analytics.audienceInsights.genderSplit.male}%
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${analytics.audienceInsights.genderSplit.male}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600">Female</span>
                  <span className="font-semibold text-pink-600">
                    {analytics.audienceInsights.genderSplit.female}%
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{
                      width: `${analytics.audienceInsights.genderSplit.female}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Quick Insights
          </h3>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📈</span>
                <h4 className="font-semibold text-green-800">Growing Trend</h4>
              </div>
              <p className="text-sm text-green-700">
                Your ticket sales have increased by 15% compared to last month
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎯</span>
                <h4 className="font-semibold text-blue-800">Best Category</h4>
              </div>
              <p className="text-sm text-blue-700">
                Concert events perform 40% better than other categories
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⭐</span>
                <h4 className="font-semibold text-purple-800">Peak Time</h4>
              </div>
              <p className="text-sm text-purple-700">
                Most tickets are sold between 6 PM - 9 PM on weekdays
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💡</span>
                <h4 className="font-semibold text-yellow-800">
                  Recommendation
                </h4>
              </div>
              <p className="text-sm text-yellow-700">
                Consider adding more VIP tickets - they have 85% sell-through
                rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {analytics.totalEvents === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            No analytics data available
          </h3>
          <p className="text-gray-500">
            Add some events to your dashboard to see detailed analytics and
            insights.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
