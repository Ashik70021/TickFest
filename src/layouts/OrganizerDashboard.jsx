
import { useState, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FaBars, FaTimes } from "react-icons/fa";

const OrganizerDashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        {
            path: '/organizerdashboard/home',
            icon: '🏠',
            label: 'Dashboard',
            description: 'Overview & Analytics'
        },
        {
            path: '/organizerdashboard/myevents',
            icon: '🎭',
            label: 'My Events',
            description: 'Manage Your Events'
        },
        {
            path: '/organizerdashboard/tickets',
            icon: '🎫',
            label: 'Ticket Sales',
            description: 'Sales & Analytics'
        },
        {
            path: '/organizerdashboard/attendees',
            icon: '👥',
            label: 'Attendees',
            description: 'Manage Participants'
        },
        {
            path: '/organizerdashboard/revenue',
            icon: '💰',
            label: 'Revenue',
            description: 'Financial Overview'
        },
        {
            path: '/organizerdashboard/analytics',
            icon: '📊',
            label: 'Analytics',
            description: 'Detailed Reports'
        },
        {
            path: '/organizerdashboard/profile',
            icon: '⚙️',
            label: 'Settings',
            description: 'Profile & Preferences'
        }
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const isActivePath = (path) => {
        return location.pathname === path || (path === '/organizerdashboard/home' && location.pathname === '/organizerdashboard');
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Enhanced Sidebar */}
            <div className={`fixed md:static z-40 top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#090040] via-[#471396] to-[#B13BFF] text-white shadow-2xl transition-transform transform flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
                    <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Logo/Brand Section */}
                <div className="relative z-10 p-6 border-b border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#B13BFF] to-white rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-black text-[#090040]">🎭</span>
                        </div>
                        <Link to="/">
                            <div>
                                <h2 className="text-xl font-black">TickFest</h2>
                                <p className="text-xs text-white/70">Organizer Panel</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="relative z-10 p-6 border-b border-white/20">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center border-2 border-white/30 overflow-hidden">
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.displayName} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-black text-lg">
                                        {user?.displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'O'}
                                    </span>
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{user?.displayName || 'Organizer'}</h3>
                            <p className="text-sm text-white/70">{user?.email}</p>
                            <p className="text-xs text-white/50">Event Organizer</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Navigation Menu */}
                <nav className="relative z-10 p-4 space-y-2 flex-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = isActivePath(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                                    isActive
                                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                                        : 'hover:bg-white/10 text-white/80 hover:text-white'
                                }`}
                            >
                                <div className={`text-2xl transition-transform duration-300 group-hover:scale-110 ${
                                    isActive ? 'animate-bounce' : ''
                                }`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm tracking-wide">{item.label}</p>
                                    <p className="text-xs text-white/60">{item.description}</p>
                                </div>
                                {isActive && (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Section */}
                <div className="relative z-10 p-6 border-t border-white/20 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-4 p-4 rounded-2xl text-red-300 hover:bg-red-500/20 transition-all duration-300 w-full hover:text-red-200"
                    >
                        <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                            🚪
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Logout</p>
                            <p className="text-xs text-red-400">Sign out safely</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Enhanced Top Navigation */}
                <header className="bg-white/70 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-20 flex-shrink-0">
                    <div className="flex items-center justify-between p-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-3 bg-gradient-to-r from-[#090040] to-[#471396] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>

                        {/* Page Title */}
                        <div className="hidden md:block">
                            <h1 className="text-2xl font-black bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent">
                                {menuItems.find(item => isActivePath(item.path))?.label || 'Dashboard'}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {menuItems.find(item => isActivePath(item.path))?.description || 'Manage your events and track performance'}
                            </p>
                        </div>

                        {/* Top Actions */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c0 .621.504 1.125 1.125 1.125H15M9 19V7a4 4 0 014-4 4 4 0 014 4v12c0 .621-.504 1.125-1.125 1.125M9 19c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v0c0 .621.504 1.125 1.125 1.125H9V19z" />
                                    </svg>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">3</span>
                                    </div>
                                </button>
                            </div>

                            {/* Quick Create Event Button */}
                            <Link
                                to="/organizerdashboard/create-event"
                                className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-4 md:px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <span className="text-lg">✨</span>
                                <span className="hidden sm:inline">Create Event</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrganizerDashboard;