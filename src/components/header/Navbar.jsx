import { useContext } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navLinks = (
        <>
            <li><Link to="/" className='text-lg hover:text-[#f5167e]'>Home</Link></li>
            <li><Link to="/events" className='text-lg hover:text-[#f5167e]'>Events</Link></li>
            <li><Link to="/activities" className='text-lg hover:text-[#f5167e]'>Activities</Link></li>
            <li><Link to="/contact us" className='text-lg hover:text-[#f5167e]'>Contact Us</Link></li>
        </>
    );

    return (
        <div className="text-white bg-[#242565] relative z-50">
            <nav className='navbar px-4 md:px-8'>
                {/* Start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 text-black rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl md:text-4xl font-bold pl-2">TickFest</Link>
                </div>

                {/* Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                {/* End */}
                <div className="navbar-end space-x-3">
                    <Link><IoIosNotifications className="text-2xl" /></Link>
                    <NavLink to="/admindashboard/adminhome" className="text-2xl"><MdOutlineDashboardCustomize /></NavLink>

                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL || "/default-avatar.png"} alt="user" />
                                    </div>
                                </button>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow bg-white text-black rounded-box w-64">
                                    <li className="flex border-b border-gray-200 mb-2">
                                        <div>
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                                                <img src={user?.photoURL || "/default-avatar.png"} alt="user" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-base">{user?.displayName || "User"}</span>
                                                <span className="text-xs text-gray-500">{user?.email || "No email"}</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link to="/profile" className="hover:bg-gray-100 rounded-md">Profile</Link></li>
                                    <li><Link to="/admindashboard/adminhome" className="hover:bg-gray-100 rounded-md">Dashboard</Link></li>
                                    <li><button onClick={handleSignOut} className="hover:bg-gray-100 rounded-md">Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">
                                <button className="px-6 py-2 font-semibold rounded-full bg-[#f5167e] hover:bg-pink-600 transition text-white">
                                    Sign In
                                </button>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
