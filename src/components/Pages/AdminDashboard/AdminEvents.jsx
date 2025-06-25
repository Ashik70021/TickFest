const AdminEvents = () => {
    // Dummy data
    const events = [
        {
            id: "EVT001",
            name: "Tech Expo 2025",
            category: "Technology",
            description: "A grand exhibition of new tech startups and products.",
            location: "Dhaka Convention Center",
            date: "2025-07-15",
            time: "10:00 AM",
            price: "500 BDT",
            status: "Active",
            bannerUrl: "/uploads/tech-expo-banner.jpg",
            createdAt: "2025-06-10 14:30",
            updatedAt: "2025-06-12 10:20",
        },
        {
            id: "EVT002",
            name: "Comedy Fiesta",
            category: "Entertainment",
            description: "Stand-up night with Bangladesh’s top comedians.",
            location: "Chittagong Club",
            date: "2025-08-01",
            time: "07:30 PM",
            price: "300 BDT",
            status: "Inactive",
            bannerUrl: "/uploads/comedy-fiesta.jpg",
            createdAt: "2025-06-11 11:45",
            updatedAt: "2025-06-15 09:10",
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#242565] mb-4">All Events</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-[#f5167e]/90 text-white">
                        <tr>
                            <th className="px-4 py-2">Event ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Banner</th>
                            <th className="px-4 py-2">Created</th>
                            <th className="px-4 py-2">Updated</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{event.id}</td>
                                <td className="px-4 py-2">{event.name}</td>
                                <td className="px-4 py-2">{event.category}</td>
                                <td className="px-4 py-2">{event.location}</td>
                                <td className="px-4 py-2">{event.date}</td>
                                <td className="px-4 py-2">{event.time}</td>
                                <td className="px-4 py-2">{event.price}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${event.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <img src={event.bannerUrl} alt="Banner" className="w-16 h-10 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">{event.createdAt}</td>
                                <td className="px-4 py-2">{event.updatedAt}</td>
                                <td className="px-4 py-2 space-x-2 flex items:center mt-3">
                                    <button className="bg-[#242565] text-white px-3 py-1 rounded hover:bg-[#3b3d7a] transition text-xs">
                                        Edit
                                    </button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEvents;
