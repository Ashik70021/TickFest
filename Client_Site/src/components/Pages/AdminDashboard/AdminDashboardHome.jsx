const AdminDashboardHome = () => {
    return (
        <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-full p-6">
            {/* Welcome Section with Animation */}
            <div className="relative bg-gradient-to-r from-[#090040] via-[#471396] to-[#B13BFF] p-8 rounded-3xl shadow-2xl overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
                </div>
                
                <div className="relative z-10 text-white">
                    <h1 className="text-4xl font-black mb-3">Welcome Back, Admin! 👋</h1>
                    <p className="text-xl text-white/90 mb-4">Here's your platform's performance overview</p>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>All systems operational</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Events Card */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#B13BFF]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-semibold">+12%</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#090040] mb-1">125</h3>
                        <p className="text-gray-600 text-sm">Total Events</p>
                        
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>15 new this month</span>
                        </div>
                    </div>
                </div>

                {/* Total Users Card */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#471396]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#471396]/5 to-[#090040]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-r from-[#471396] to-[#090040] rounded-xl text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-semibold">+8%</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#090040] mb-1">2,340</h3>
                        <p className="text-gray-600 text-sm">Total Users</p>
                        
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span>187 active today</span>
                        </div>
                    </div>
                </div>

                {/* Tickets Sold Card */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#B13BFF]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-semibold">+23%</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#090040] mb-1">4,980</h3>
                        <p className="text-gray-600 text-sm">Tickets Sold</p>
                        
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>৳2.4M revenue</span>
                        </div>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#090040]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#090040]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-r from-[#090040] to-[#471396] rounded-xl text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-semibold">+15%</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#090040] mb-1">৳3.2M</h3>
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                        
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>Best month yet!</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-[#090040]">Recent Activity</h3>
                        <button className="text-[#B13BFF] hover:text-[#471396] text-sm font-medium">View All</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center text-white text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">New event created</p>
                                <p className="text-sm text-gray-500">Tech Conference 2025 • 2 hours ago</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#471396] to-[#090040] rounded-full flex items-center justify-center text-white text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">New user registered</p>
                                <p className="text-sm text-gray-500">john.doe@example.com • 4 hours ago</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center text-white text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">Bulk ticket sale</p>
                                <p className="text-sm text-gray-500">50 tickets for Music Festival • 6 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-[#090040] mb-6">Quick Actions</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button className="group p-4 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <svg className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm font-medium">Create Event</span>
                        </button>
                        
                        <button className="group p-4 bg-gradient-to-r from-[#471396] to-[#090040] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <svg className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-sm font-medium">View Reports</span>
                        </button>
                        
                        <button className="group p-4 bg-gradient-to-r from-[#090040] to-[#471396] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <svg className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <span className="text-sm font-medium">Manage Users</span>
                        </button>
                        
                        <button className="group p-4 bg-gradient-to-r from-[#B13BFF] to-[#090040] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <svg className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm font-medium">Settings</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-[#090040] mb-6">System Status</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div>
                            <p className="font-medium text-gray-900">Database</p>
                            <p className="text-sm text-gray-500">Operational</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div>
                            <p className="font-medium text-gray-900">Payment Gateway</p>
                            <p className="text-sm text-gray-500">Operational</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div>
                            <p className="font-medium text-gray-900">Email Service</p>
                            <p className="text-sm text-gray-500">Operational</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
