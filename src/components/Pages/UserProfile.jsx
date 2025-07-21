import { useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FiEdit3, FiCalendar, FiCreditCard, FiSettings, FiUser, FiMail, FiPhone, FiMapPin, FiDownload, FiEye, FiStar } from 'react-icons/fi';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        displayName: user?.displayName || 'John Doe',
        email: user?.email || 'john@example.com',
        phone: '+880 1234 567890',
        location: 'Dhaka, Bangladesh',
        bio: 'Event enthusiast and music lover. Always looking for the next amazing experience.',
        joinDate: 'January 2024'
    });

    const [userStats] = useState({
        totalTickets: 24,
        upcomingEvents: 5,
        pastEvents: 19,
        totalSpent: 45650,
        favoriteGenre: 'Concert'
    });

    const [ticketHistory] = useState([
        {
            id: 1,
            eventName: 'Summer Music Festival 2024',
            date: '2024-08-15',
            venue: 'Bangladesh Army Stadium',
            ticketType: 'VIP',
            quantity: 2,
            price: 5000,
            status: 'upcoming',
            image: '/api/placeholder/80/80'
        },
        {
            id: 2,
            eventName: 'Tech Conference Dhaka',
            date: '2024-07-20',
            venue: 'International Convention Center',
            ticketType: 'Premium',
            quantity: 1,
            price: 3500,
            status: 'completed',
            image: '/api/placeholder/80/80'
        },
        {
            id: 3,
            eventName: 'Comedy Night Special',
            date: '2024-06-10',
            venue: 'Russian Cultural Center',
            ticketType: 'Standard',
            quantity: 3,
            price: 2400,
            status: 'completed',
            image: '/api/placeholder/80/80'
        },
        {
            id: 4,
            eventName: 'Art Exhibition Opening',
            date: '2024-09-05',
            venue: 'National Museum',
            ticketType: 'General',
            quantity: 1,
            price: 800,
            status: 'upcoming',
            image: '/api/placeholder/80/80'
        }
    ]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FiUser },
        { id: 'tickets', label: 'My Tickets', icon: FiCreditCard },
        { id: 'history', label: 'Event History', icon: FiCalendar },
        { id: 'settings', label: 'Settings', icon: FiSettings }
    ];

    const handleSaveProfile = () => {
        setIsEditing(false);
        // Here you would typically save to backend
        console.log('Saving profile:', userInfo);
    };

    const upcomingTickets = ticketHistory.filter(ticket => ticket.status === 'upcoming');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/10 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-[#471396]/10 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#B13BFF]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#B13BFF] rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                                <img
                                    src={user?.photoURL || '/api/placeholder/128/128'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white text-[#471396] p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                <FiEdit3 size={16} />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{userInfo.displayName}</h1>
                            <p className="text-white/90 text-lg mb-4">{userInfo.bio}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-2">
                                    <FiCalendar size={16} />
                                    Joined {userInfo.joinDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiMapPin size={16} />
                                    {userInfo.location}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                    <div className="text-2xl font-bold">{userStats.totalTickets}</div>
                                    <div className="text-sm text-white/80">Total Tickets</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                    <div className="text-2xl font-bold">{userStats.upcomingEvents}</div>
                                    <div className="text-sm text-white/80">Upcoming</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-[#471396] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                <FiEdit3 size={16} />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 min-w-max flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white shadow-lg'
                                        : 'text-gray-600 hover:text-[#471396] hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Stats Cards */}
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <FiCreditCard className="text-green-600" size={20} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">৳{userStats.totalSpent.toLocaleString()}</div>
                                    <p className="text-sm text-gray-500">Lifetime purchases</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Past Events</h3>
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FiCalendar className="text-blue-600" size={20} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.pastEvents}</div>
                                    <p className="text-sm text-gray-500">Events attended</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <FiCalendar className="text-purple-600" size={20} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.upcomingEvents}</div>
                                    <p className="text-sm text-gray-500">Events planned</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Favorite Genre</h3>
                                        <div className="bg-pink-100 p-2 rounded-lg">
                                            <FiStar className="text-pink-600" size={20} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-pink-600 mb-2">{userStats.favoriteGenre}</div>
                                    <p className="text-sm text-gray-500">Most attended</p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {upcomingTickets.slice(0, 3).map((ticket) => (
                                        <div key={ticket.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <img src={ticket.image} alt={ticket.eventName} className="w-12 h-12 rounded-lg object-cover" />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm">{ticket.eventName}</h4>
                                                <p className="text-xs text-gray-500">{new Date(ticket.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                {ticket.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tickets Tab */}
                    {activeTab === 'tickets' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Tickets</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {upcomingTickets.map((ticket) => (
                                        <div key={ticket.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
                                            <div className="flex items-start gap-4 mb-4">
                                                <img src={ticket.image} alt={ticket.eventName} className="w-16 h-16 rounded-lg object-cover" />
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 mb-1">{ticket.eventName}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{ticket.venue}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <FiCalendar size={14} />
                                                        {new Date(ticket.date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-dashed border-gray-300 pt-4">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-sm text-gray-600">Ticket Type</span>
                                                    <span className="font-semibold text-[#471396]">{ticket.ticketType}</span>
                                                </div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-sm text-gray-600">Quantity</span>
                                                    <span className="font-semibold">{ticket.quantity}</span>
                                                </div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-sm text-gray-600">Total Price</span>
                                                    <span className="font-bold text-lg text-green-600">৳{ticket.price}</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button className="flex-1 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                                                        <FiEye size={16} />
                                                        View Ticket
                                                    </button>
                                                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                                                        <FiDownload size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Event</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Venue</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Tickets</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ticketHistory.map((ticket) => (
                                            <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={ticket.image} alt={ticket.eventName} className="w-10 h-10 rounded-lg object-cover" />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{ticket.eventName}</div>
                                                            <div className="text-sm text-gray-500">{ticket.ticketType}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-gray-600">
                                                    {new Date(ticket.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-4 text-gray-600">{ticket.venue}</td>
                                                <td className="py-4 px-4 text-gray-600">{ticket.quantity}</td>
                                                <td className="py-4 px-4 font-semibold text-green-600">৳{ticket.price}</td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.status === 'upcoming'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>

                                {isEditing ? (
                                    <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <FiUser className="inline mr-2" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userInfo.displayName}
                                                    onChange={(e) => setUserInfo({ ...userInfo, displayName: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#471396] focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <FiMail className="inline mr-2" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userInfo.email}
                                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#471396] focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <FiPhone className="inline mr-2" />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={userInfo.phone}
                                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#471396] focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <FiMapPin className="inline mr-2" />
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userInfo.location}
                                                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#471396] focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                            <textarea
                                                value={userInfo.bio}
                                                onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#471396] focus:border-transparent"
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                    <FiUser />
                                                    Full Name
                                                </div>
                                                <div className="text-gray-900">{userInfo.displayName}</div>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                    <FiMail />
                                                    Email Address
                                                </div>
                                                <div className="text-gray-900">{userInfo.email}</div>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                    <FiPhone />
                                                    Phone Number
                                                </div>
                                                <div className="text-gray-900">{userInfo.phone}</div>
                                            </div>

                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                    <FiMapPin />
                                                    Location
                                                </div>
                                                <div className="text-gray-900">{userInfo.location}</div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="text-sm font-medium text-gray-700 mb-2">Bio</div>
                                            <div className="text-gray-900">{userInfo.bio}</div>
                                        </div>

                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
                                        >
                                            <FiEdit3 />
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;