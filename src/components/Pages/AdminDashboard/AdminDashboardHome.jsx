const AdminDashboardHome = () => {
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-[#242565]">Welcome, Admin 👋</h1>
                <p className="text-gray-600 mt-2">Heres a quick overview of your platforms performance.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Events */}
                <div className="bg-gradient-to-r from-[#f5167e] to-[#ff8a9a] text-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm">Total Events</p>
                            <h2 className="text-2xl font-bold">125</h2>
                        </div>
                        <i className="fas fa-calendar-alt text-3xl"></i>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-gradient-to-r from-[#242565] to-[#4751b5] text-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm">Total Users</p>
                            <h2 className="text-2xl font-bold">340</h2>
                        </div>
                        <i className="fas fa-users text-3xl"></i>
                    </div>
                </div>

                {/* Total Tickets */}
                <div className="bg-gradient-to-r from-[#00c9ff] to-[#92fe9d] text-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm">Tickets Sold</p>
                            <h2 className="text-2xl font-bold">980</h2>
                        </div>
                        <i className="fas fa-ticket-alt text-3xl"></i>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm">Orders Completed</p>
                            <h2 className="text-2xl font-bold">430</h2>
                        </div>
                        <i className="fas fa-receipt text-3xl"></i>
                    </div>
                </div>
            </div>

            {/* Placeholder for future analytics */}
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-600 text-center">
                📊 Analytics or charts coming soon!
            </div>
        </div>
    );
};

export default AdminDashboardHome;
