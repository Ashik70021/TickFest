const Banner = () => {
    return (
        <div className="relative w-full h-screen mb-24">
            {/* Background Image with Blur */}
            <div className="absolute inset-0">
                <img
                    src="/../src/assets/Images/banner2.png"
                    alt="Banner Background"
                    className="w-full h-full object-cover blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70"></div>
            </div>

            {/* Centered Text and Buttons */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 h-full">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Your Event. Your Audience. Your Platform.
                    </h1>
                    <p className="text-lg md:text-xl ">
                        From concerts to conferences, we make event ticketing <br /> fast, flexible, and stress-free.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
                        <button className="bg-[#F5167E] text-white hover:text-[#F5167E] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
                            Get Ticket
                        </button>
                        <button className="bg-[#F5167E] text-white hover:text-[#F5167E] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
                            Create Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Search Box */}
            <div className="absolute bottom-0 w-full px-4 md:px-10 -mb-20 z-20">
                <div className="bg-[#242565] p-6 md:p-8 rounded-lg shadow-xl max-w-6xl mx-auto w-full">
                    <form className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <div>
                            <label className="block text-white">Search Event</label>
                            <select className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring bg-[#ECF5FF] focus:ring-blue-200 focus:border-blue-500">
                                <option value="">Select Event</option>
                                <option value="new-york">Concert</option>
                                <option value="los-angeles">Sports</option>
                                <option value="chicago">Olympiad</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white">Place</label>
                            <select className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring bg-[#ECF5FF] focus:ring-blue-200 focus:border-blue-500">
                                <option value="">Select place</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chittagong">Chittagong</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barisal">Barisal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-white">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring bg-[#ECF5FF] focus:ring-blue-200 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <button className="w-full flex justify-center gap-2 items-center bg-[#005EAE] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-white">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                                </svg>
                                <span>Find Event</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;
