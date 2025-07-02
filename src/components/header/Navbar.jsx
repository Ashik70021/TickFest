import { Link } from "react-router-dom";

const Navbar = () => {

    const link = <>
        <li className='text-lg hover:text-[#f5167e] '> <Link to="/">Home</Link> </li>
        <li className='text-xl hover:text-[#f5167e] '> <Link to="/events">Events</Link> </li>
        <li className='text-xl hover:text-[#f5167e] '> <Link to="/activities">Activities</Link> </li>
        <li className='text-xl hover:text-[#f5167e] '> <Link to="/contact us">Contact us</Link> </li>
    </>
    return (
        <div className=" text-white bg-[#242565] relative z-10">
            <nav className=' navbar pl-0 md:pl-8 pr-2 md:pr-8'>
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm !dark:text-white dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {link}
                        </ul>
                    </div>
                    <a className="text-2xl md:text-5xl font-bold pl-2 md:pl-4">tickFest</a>
                </div>
                <div className="navbar-center hidden lg:flex text-white">
                    <ul className="menu menu-horizontal px-1">
                        {link}
                    </ul>

                </div>
                <div className="navbar-end">
                    <Link to="/admindashboardhome"><a><button type="button" className="px-8 py-3 font-semibold rounded-full bg-[#f5167e] text-white">Signin</button></a></Link>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;