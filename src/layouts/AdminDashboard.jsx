import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: "/admindashboard/adminhome", icon: "🏠", label: "Dashboard" },
        { path: "/admindashboard/manageevents", icon: "➕", label: "Create Event" },
        { path: "/admindashboard/events", icon: "🎫", label: "All Events" },
        { path: "/admindashboard/users", icon: "👥", label: "Users" },
        { path: "/admindashboard/analytics", icon: "📊", label: "Analytics" },
        { path: "/admindashboard/tickets", icon: "🎟️", label: "Tickets" },
        { path: "/admindashboard/reports", icon: "📋", label: "Reports" },
        { path: "/admindashboard/profile", icon: "👤", label: "Profile" },
    ];

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Enhanced Sidebar */}
            <div className={`fixed md:static z-40 top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#090040] via-[#471396] to-[#B13BFF] text-white shadow-2xl transition-transform transform flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
                    <div className="absolute top-1/2 left-5 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Logo/Brand Section */}
                <div className="relative z-10 p-6 border-b border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#B13BFF] to-white rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-black text-[#090040]">T</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-black">TickFest</h2>
                            <p className="text-xs text-white/70">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Admin Profile Section */}
                <div className="relative z-10 p-6 border-b border-white/20">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center border-2 border-white/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Admin</h3>
                            <p className="text-sm text-white/70">admin@tickfest.com</p>
                            <p className="text-xs text-white/50">Super Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Navigation Menu */}
                <nav className="relative z-10 p-4 space-y-2 flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                                isActive(item.path)
                                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                                    : "hover:bg-white/10 text-white/80 hover:text-white"
                            }`}
                        >
                            <div className={`text-2xl transition-transform duration-300 group-hover:scale-110 ${
                                isActive(item.path) ? "animate-bounce" : ""
                            }`}>
                                {item.icon}
                            </div>
                            <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                            {isActive(item.path) && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* System Status */}
                <div className="relative z-10 p-6 border-t border-white/20 mt-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <h4 className="text-sm font-bold text-white/90 mb-3">System Status</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Server</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-300">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">Database</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-300">Connected</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/70">API</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-yellow-300">Slow</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-gray-500">Manage your events and platform</p>
                        </div>

                        {/* Top Actions */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 relative">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM3 12h12a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v3a2 2 0 002 2z" />
                                    </svg>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">3</span>
                                    </div>
                                </button>
                            </div>

                            {/* Quick Settings */}
                            <button className="p-3 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white rounded-xl hover:shadow-lg transition-all duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
