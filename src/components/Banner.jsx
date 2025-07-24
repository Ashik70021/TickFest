import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Create search parameters
        const searchParams = new URLSearchParams();
        
        if (searchTerm) searchParams.set('search', searchTerm);
        if (selectedCategory) searchParams.set('category', selectedCategory);
        if (selectedLocation) searchParams.set('location', selectedLocation);
        if (selectedDate) searchParams.set('date', selectedDate);
        
        // Navigate to events page with search parameters
        const queryString = searchParams.toString();
        navigate(`/events${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Modern Background with New Color Scheme */}
            <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, #090040 0%, #471396 50%, #B13BFF 100%)`
            }}>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-black/20"></div>
                    {/* Animated geometric pattern overlay */}
                    <div className="absolute inset-0 animate-pulse" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B13BFF' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                        animation: 'patternMove 20s linear infinite'
                    }}></div>
                </div>
                {/* Enhanced gradient overlay for depth */}
                <div className="absolute inset-0" style={{
                    background: `radial-gradient(circle at 20% 80%, rgba(177, 59, 255, 0.3) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 20%, rgba(71, 19, 150, 0.4) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 40%, rgba(9, 0, 64, 0.2) 0%, transparent 70%)`,
                    animation: 'gradientShift 15s ease-in-out infinite'
                }}></div>
            </div>

            {/* Animated Morphing Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#B13BFF]/15 to-[#471396]/15 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-[#471396]/15 to-[#090040]/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-[#090040]/15 to-[#B13BFF]/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Particles System */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-[#B13BFF]/40 rounded-full animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            {/* Twinkling Stars Effect */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Flowing Lines Animation */}
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#B13BFF" stopOpacity="0.6"/>
                            <stop offset="50%" stopColor="#471396" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#090040" stopOpacity="0.6"/>
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#471396" stopOpacity="0.4"/>
                            <stop offset="50%" stopColor="#B13BFF" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#471396" stopOpacity="0.4"/>
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,400 Q300,200 600,400 T1200,400"
                        stroke="url(#lineGradient1)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-wave"
                    />
                    <path
                        d="M0,450 Q300,250 600,450 T1200,450"
                        stroke="url(#lineGradient2)"
                        strokeWidth="1.5"
                        fill="none"
                        className="animate-wave-reverse"
                    />
                    <path
                        d="M0,350 Q300,150 600,350 T1200,350"
                        stroke="url(#lineGradient1)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-wave-slow"
                    />
                </svg>
            </div>

            {/* Enhanced Floating Elements with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Slow floating */}
                <div className="absolute inset-0 animate-float-slow">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-[#B13BFF] rounded-full opacity-25 shadow-lg shadow-[#B13BFF]/30 animate-pulse"></div>
                    <div className="absolute bottom-40 right-20 w-16 h-16 bg-[#471396] rounded-full opacity-35 shadow-lg shadow-[#471396]/30"></div>
                </div>
                
                {/* Layer 2 - Medium floating */}
                <div className="absolute inset-0 animate-float-medium">
                    <div className="absolute top-40 right-20 w-16 h-16 bg-[#471396] rounded-full opacity-35 animate-bounce shadow-lg shadow-[#471396]/30"></div>
                    <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-gradient-to-r from-[#471396] to-[#B13BFF] rounded-full opacity-20 shadow-xl"></div>
                </div>
                
                {/* Layer 3 - Fast floating */}
                <div className="absolute inset-0 animate-float-fast">
                    <div className="absolute bottom-40 left-20 w-12 h-12 bg-[#B13BFF] rounded-full opacity-30 animate-pulse shadow-lg shadow-[#B13BFF]/40"></div>
                    <div className="absolute top-60 left-1/3 w-8 h-8 bg-[#471396] rounded-full opacity-25 shadow-lg shadow-[#471396]/25"></div>
                    <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-gradient-to-br from-[#B13BFF] to-[#471396] rounded-full opacity-30 animate-spin-slow shadow-lg"></div>
                </div>
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {[...Array(144)].map((_, i) => (
                        <div
                            key={`grid-${i}`}
                            className="bg-[#B13BFF] rounded-sm animate-pulse"
                            style={{
                                animationDelay: `${i * 0.05}s`,
                                animationDuration: '4s'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Rotating Gradient Rings */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute w-96 h-96 rounded-full border border-[#B13BFF]/20 animate-spin-slow"></div>
                <div className="absolute w-80 h-80 rounded-full border border-[#471396]/20 animate-spin-reverse"></div>
                <div className="absolute w-64 h-64 rounded-full border border-[#090040]/20 animate-spin-slow"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Hero Section */}
                    <div className="text-center mb-16 pt-20">
                        {/* Highlight Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#471396]/30 to-[#B13BFF]/30 backdrop-blur-sm rounded-full border border-[#B13BFF]/40 mb-8 shadow-lg shadow-[#B13BFF]/20">
                            <span className="text-[#B13BFF] mr-2 text-lg">✨</span>
                            <span className="text-white text-sm font-semibold tracking-wide">Trusted by 1M+ event organizers worldwide</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                            <span className="block">Discover Amazing</span>
                            <span className="block bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] bg-clip-text text-transparent animate-pulse">
                                Events Near You
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                            From intimate concerts to massive festivals, find and book tickets for the events that matter to you
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                            <button 
                                onClick={() => navigate('/events')}
                                className="group relative bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-[#B13BFF]/40 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center justify-center gap-3 text-lg">
                                    🎫 Browse Events
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                            <button className="group relative bg-gradient-to-r from-[#090040] to-[#471396] backdrop-blur-sm text-white font-bold px-10 py-5 rounded-2xl border-2 border-[#B13BFF]/50 hover:border-[#B13BFF] hover:bg-gradient-to-r hover:from-[#471396] hover:to-[#B13BFF] transform hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-[#471396]/40">
                                <span className="relative flex items-center justify-center gap-3 text-lg">
                                    🚀 Create Event
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced Search Card - Hidden on Mobile */}
                    <div className="max-w-6xl mx-auto hidden md:block">
                        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#B13BFF]/20 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#471396]/10 to-[#B13BFF]/10 rounded-full translate-y-12 -translate-x-12"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-8 text-center">Find Your Perfect Event</h3>
                                
                                <form className="space-y-8" onSubmit={handleSearch}>
                                    {/* Search Input */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <svg className="h-6 w-6 text-[#471396] group-focus-within:text-[#B13BFF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search for events, artists, venues..."
                                            className="w-full pl-14 pr-6 py-5 text-[#090040] rounded-2xl border-3 border-gray-200 focus:border-[#B13BFF] focus:ring-6 focus:ring-[#B13BFF]/20 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl"
                                        />
                                    </div>

                                    {/* Filter Options */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-[#090040] uppercase tracking-wide">Category</label>
                                            <select 
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full px-5 py-4 rounded-2xl border-3 border-gray-200 focus:border-[#B13BFF] focus:ring-6 focus:ring-[#B13BFF]/20 transition-all duration-300 text-[#090040] font-medium shadow-lg hover:shadow-xl"
                                            >
                                                <option value="">All Categories</option>
                                                <option value="concert">🎵 Concerts</option>
                                                <option value="sports">⚽ Sports</option>
                                                <option value="theater">🎭 Theater</option>
                                                <option value="conference">📊 Conferences</option>
                                                <option value="festival">🎪 Festivals</option>
                                                <option value="comedy">😂 Comedy</option>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-[#090040] uppercase tracking-wide">Location</label>
                                            <select 
                                                value={selectedLocation}
                                                onChange={(e) => setSelectedLocation(e.target.value)}
                                                className="w-full px-5 py-4 rounded-2xl border-3 border-gray-200 focus:border-[#B13BFF] focus:ring-6 focus:ring-[#B13BFF]/20 transition-all duration-300 text-[#090040] font-medium shadow-lg hover:shadow-xl"
                                            >
                                                <option value="">Select Location</option>
                                                <option value="dhaka">📍 Dhaka</option>
                                                <option value="chittagong">📍 Chittagong</option>
                                                <option value="rajshahi">📍 Rajshahi</option>
                                                <option value="sylhet">📍 Sylhet</option>
                                                <option value="khulna">📍 Khulna</option>
                                                <option value="barisal">📍 Barisal</option>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-[#090040] uppercase tracking-wide">Date</label>
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full px-5 py-4 rounded-2xl border-3 border-gray-200 focus:border-[#B13BFF] focus:ring-6 focus:ring-[#B13BFF]/20 transition-all duration-300 text-[#090040] font-medium shadow-lg hover:shadow-xl"
                                            />
                                        </div>
                                    </div>

                                    {/* Search Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#471396] via-[#B13BFF] to-[#471396] text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-[#B13BFF]/30 transform hover:-translate-y-1 transition-all duration-500 text-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center justify-center gap-4">
                                            <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Find Amazing Events
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 mb-20">
                        <div className="text-center group cursor-pointer">
                            <div className="bg-gradient-to-br from-[#B13BFF]/20 to-[#471396]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#B13BFF]/30 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#B13BFF]/20">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#B13BFF] to-white bg-clip-text text-transparent">1M+</div>
                                <div className="text-gray-200 font-medium">Events Listed</div>
                            </div>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="bg-gradient-to-br from-[#471396]/20 to-[#B13BFF]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#471396]/30 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#471396]/20">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#471396] to-white bg-clip-text text-transparent">500K+</div>
                                <div className="text-gray-200 font-medium">Happy Customers</div>
                            </div>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="bg-gradient-to-br from-[#B13BFF]/20 to-[#090040]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#B13BFF]/30 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#B13BFF]/20">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#B13BFF] to-white bg-clip-text text-transparent">50+</div>
                                <div className="text-gray-200 font-medium">Cities Covered</div>
                            </div>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="bg-gradient-to-br from-[#471396]/20 to-[#090040]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#471396]/30 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#471396]/20">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#471396] to-white bg-clip-text text-transparent">24/7</div>
                                <div className="text-gray-200 font-medium">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
