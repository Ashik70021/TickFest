import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar for desktop and mobile */}
            <div className={`fixed md:static z-40 top-0 left-0 md:h-screen h-full w-64 bg-gradient-to-r from-[#f5167e]/90 to-[#242565] text-white shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}>

                {/* Admin Info */}
                <div className="flex items-center gap-3 p-4 border-b border-white/30">
                    <img src="/admin-avatar.png" alt="Admin" className="w-12 h-12 rounded-full border border-white" />
                    <div>
                        <h2 className="text-lg font-semibold">Admin</h2>
                        <p className="text-xs">admin@tickify.com</p>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="p-4 space-y-2 text-sm font-medium">
                    <Link to="/admindashboard/adminhome" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-home w-5"></i>
                        Dashboard
                    </Link>

                    <Link to="/admindashboard/manageevents" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-calendar-plus w-5"></i>
                        Manage Events
                    </Link>

                    <Link to="/admindashboard/events" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-receipt w-5"></i>
                        Events
                    </Link>

                    <Link to="/admindashboard/users" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-users w-5"></i>
                        Users
                    </Link>

                    <Link to="/admindashboard/tickets" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-ticket-alt w-5"></i>
                        Tickets
                    </Link>

                    <Link to="/admindashboard/reports" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-chart-line w-5"></i>
                        Reports
                    </Link>

                    <Link to="/admindashboard/profile" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-user-circle w-5"></i>
                        My Profile
                    </Link>

                    <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-white hover:text-[#5522CC] transition">
                        <i className="fas fa-sign-out-alt w-5"></i>
                        Logout
                    </Link>
                </nav>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar for mobile */}
                <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
                    <button onClick={toggleSidebar} className="text-[#242565] text-xl">
                        <FaBars />
                    </button>
                    <h1 className="text-lg font-semibold text-[#242565]">Admin Panel</h1>
                </div>

                {/* Outlet for child routes */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
