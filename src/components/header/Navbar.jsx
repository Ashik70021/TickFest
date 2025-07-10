import { Link } from "react-router-dom";

const Navbar = () => {

    const link = <>
        <li className='text-lg font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/" className="relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] group-hover:w-full transition-all duration-300"></span>
            </Link>
        </li>
        <li className='text-lg font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/events" className="relative group">
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] group-hover:w-full transition-all duration-300"></span>
            </Link>
        </li>
        <li className='text-lg font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/activities" className="relative group">
                Activities
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] group-hover:w-full transition-all duration-300"></span>
            </Link>
        </li>
        <li className='text-lg font-medium hover:text-[#B13BFF] transition-all duration-300 transform hover:scale-105'>
            <Link to="/contact us" className="relative group">
                Contact us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B13BFF] to-[#471396] group-hover:w-full transition-all duration-300"></span>
            </Link>
        </li>
    </>
    return (
        <div className="text-white bg-gradient-to-r from-[#090040] via-[#471396] to-[#090040] backdrop-blur-lg relative z-50 shadow-2xl shadow-[#471396]/20">
            <nav className='navbar pl-4 md:pl-8 pr-4 md:pr-8 py-4'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-[#B13BFF]/20 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-gradient-to-br from-[#090040] to-[#471396] rounded-2xl w-60 border border-[#B13BFF]/30">
                            {link}
                        </ul>
                    </div>
                    <a className="text-3xl md:text-5xl font-black pl-2 md:pl-4 bg-gradient-to-r from-[#B13BFF] via-white to-[#B13BFF] bg-clip-text text-transparent hover:from-white hover:to-[#B13BFF] transition-all duration-500 cursor-pointer">
                        tick<span className="text-[#B13BFF]">Fest</span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex text-white">
                    <ul className="menu menu-horizontal px-4 gap-6">
                        {link}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <Link to="/signin">
                        <button type="button" className="group relative px-8 py-3 font-bold rounded-2xl bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg hover:shadow-[#B13BFF]/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative">Sign In</span>
                        </button>
                    </Link>
                    <Link to="/admindashboard/adminhome">
                        <button type="button" className="group relative px-8 py-3 font-bold rounded-2xl bg-gradient-to-r from-[#090040] to-[#471396] text-white border-2 border-[#B13BFF]/50 hover:border-[#B13BFF] shadow-lg hover:shadow-[#471396]/40 transform hover:-translate-y-1 transition-all duration-300">
                            <span className="relative">Dashboard</span>
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;