import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaUser, FaTicketAlt, FaHeart, FaCog, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { getUserTypeFromAPI } from "../../utils/userUtils";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();
    const [userType, setUserType] = useState('user');

    // Fetch user type when user changes
    useEffect(() => {
        if (user?.email) {
            getUserTypeFromAPI(user.email).then(type => {
                setUserType(type);
            });
        } else {
            setUserType('user');
        }
    }, [user]);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                // Handle successful logout
            })
            .catch(error => console.log(error));
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const link = <>
        <li className='text-xl font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/" className={`relative group ${isActiveLink('/') ? 'text-[#B13BFF]' : ''}`}>
                Home
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] transition-all duration-300 ${isActiveLink('/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        </li>
        <li className='text-xl font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/events" className={`relative group ${isActiveLink('/events') ? 'text-[#B13BFF]' : ''}`}>
                Events
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] transition-all duration-300 ${isActiveLink('/events') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        </li>
        <li className='text-xl font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/about-us" className={`relative group ${isActiveLink('/about-us') ? 'text-[#B13BFF]' : ''}`}>
                About Us
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] transition-all duration-300 ${isActiveLink('/about-us') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        </li>
        <li className='text-xl font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/contact" className={`relative group ${isActiveLink('/contact') ? 'text-[#B13BFF]' : ''}`}>
                Contact us
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] transition-all duration-300 ${isActiveLink('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
        </li>
    </>
    const userDrawerContent = (
        <ul className="p-4 w-80 min-h-full bg-gradient-to-br from-[#090040] to-[#471396] text-white">
            {/* User Profile Section */}
            <div className="flex items-center gap-4 p-4 border-b border-[#B13BFF]/30">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B13BFF]">
                    <img 
                        src={user?.photoURL || "/default-avatar.png"} 
                        alt="user" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{user?.displayName || "User"}</h3>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                    <span className="text-xs px-2 py-1 bg-[#B13BFF] rounded-full capitalize">
                        {userType}
                    </span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="mt-4 space-y-2">
                {/* Dynamic Dashboard/Profile Link */}
                {userType === 'user' ? (
                    <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                        <FaUser className="text-[#B13BFF]" />
                        <span>Profile</span>
                    </Link>
                ) : userType === 'organizer' ? (
                    <Link to="/organizerdashboard" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                        <FaTachometerAlt className="text-[#B13BFF]" />
                        <span>Organizer Dashboard</span>
                    </Link>
                ) : userType === 'admin' ? (
                    <Link to="/admindashboard" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                        <FaTachometerAlt className="text-[#B13BFF]" />
                        <span>Admin Dashboard</span>
                    </Link>
                ) : null}
                
                {/* Common Menu Items */}
                <Link to="/my-tickets" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                    <FaTicketAlt className="text-[#B13BFF]" />
                    <span>My Tickets</span>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                    <FaHeart className="text-[#B13BFF]" />
                    <span>Wishlist</span>
                </Link>
                <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300">
                    <FaCog className="text-[#B13BFF]" />
                    <span>Settings</span>
                </Link>
                
                <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 p-3 w-full hover:bg-[#B13BFF]/20 rounded-lg transition-all duration-300 text-left"
                >
                    <FaSignOutAlt className="text-[#B13BFF]" />
                    <span>Sign Out</span>
                </button>
            </div>
        </ul>
    );

    return (
        <div className="text-white bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] backdrop-blur-lg relative z-50 shadow-2xl shadow-[#471396]/20">
            <nav className='navbar pl-4 md:pl-8 pr-4 md:pr-8 py-4 justify-between'>
                <div className="navbar-start w-1/4">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-[#B13BFF]/20 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-gradient-to-br from-[#090040] to-[#471396] rounded-2xl w-60 border border-[#B13BFF]/30">
                            {link}
                        </ul>
                    </div>
                    <a className="text-3xl md:text-5xl font-black pl-2 md:pl-4 bg-gradient-to-r from-[#B13BFF] via-white to-[#B13BFF] bg-clip-text text-transparent hover:from-white hover:to-[#B13BFF] transition-all duration-500 cursor-pointer" href="/">
                        tick<span className="text-[#B13BFF]">Fest</span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex text-white flex-1 justify-center">
                    <ul className="menu-horizontal gap-12">
                        {link}
                    </ul>
                </div>
                <div className="navbar-end w-1/4 justify-end">
                    {user ? (
                        <div className="drawer drawer-end">
                            <input id="user-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content flex justify-end">
                                <label htmlFor="user-drawer" className="btn btn-circle btn-ghost avatar hover:bg-[#B13BFF]/20">
                                    <div className="w-10 rounded-full ring-2 ring-[#B13BFF] ring-offset-2 ring-offset-[#090040]">
                                        <img src={user?.photoURL || "/default-avatar.png"} alt="user" />
                                    </div>
                                </label>
                            </div> 
                            <div className="drawer-side z-[100]">
                                <label htmlFor="user-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                {userDrawerContent}
                            </div>
                        </div>
                    ) : (
                        <Link to="/signin">
                            <button type="button" className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg hover:shadow-[#B13BFF]/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative">Sign In</span>
                            </button>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;