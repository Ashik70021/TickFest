const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#090040] via-[#471396] to-[#090040] text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#B13BFF]/20 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#471396]/20 to-transparent rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#B13BFF]/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
            {/* Left section: Logo & Description */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-[#B13BFF] to-[#471396] rounded-2xl shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-[#B13BFF] to-white bg-clip-text text-transparent">
                  TickFest
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                TickFest is a premium event ticketing platform that connects passionate audiences with unforgettable live experiences. Create, discover, and attend events that inspire and enrich your life.
              </p>
              
              {/* Enhanced Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://www.facebook.com/"
                  className="group p-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 hover:from-[#B13BFF] hover:to-[#471396] rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-[#B13BFF]/30"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12.073C22 6.476 17.523 2 12 2S2 6.476 2 12.073c0 5.012 3.657 9.16 8.438 9.88v-6.99h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.774-1.63 1.565v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.233 22 17.085 22 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/"
                  className="group p-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 hover:from-[#B13BFF] hover:to-[#471396] rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-[#B13BFF]/30"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.97-2.48 9.22 9.22 0 01-2.9 1.11 4.48 4.48 0 00-7.64 4.09A12.8 12.8 0 013 4.15a4.48 4.48 0 001.39 5.99 4.48 4.48 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.02.08 4.48 4.48 0 004.18 3.12A9 9 0 013 19.54a12.72 12.72 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.02-.58A9.22 9.22 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/"
                  className="group p-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 hover:from-[#B13BFF] hover:to-[#471396] rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-[#B13BFF]/30"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-1.588-.12-7.997-.12-7.997-.12s-6.408 0-7.997.12c-1.81.137-3.24 1.558-3.377 3.366-.12 1.586-.12 4.894-.12 4.894s0 3.308.12 4.894c.137 1.808 1.567 3.229 3.377 3.366 1.59.12 7.997.12 7.997.12s6.408 0 7.997-.12c1.81-.137 3.24-1.558 3.377-3.366.12-1.586.12-4.894.12-4.894s0-3.308-.12-4.894c-.137-1.808-1.567-3.229-3.377-3.366zM10.065 15.568v-7.136l6.092 3.568-6.092 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="group p-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 hover:from-[#B13BFF] hover:to-[#471396] rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-[#B13BFF]/30"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links sections */}
            <div className="flex flex-col md:flex-row md:space-x-16 lg:w-2/3 gap-8 md:gap-0">
              <nav className="space-y-4 flex-1">
                <h6 className="font-bold text-xl text-[#B13BFF] mb-6">Plan Events</h6>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Create and Set Up
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Sell Tickets
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Online RSVP
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Virtual Events
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Event Analytics
                </a>
              </nav>
              
              <nav className="space-y-4 flex-1">
                <h6 className="font-bold text-xl text-[#B13BFF] mb-6">TickFest</h6>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  About Us
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Press & Media
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Contact Us
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Help Center
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-300 hover:text-[#B13BFF] transition-colors duration-300 hover:translate-x-2 transform">
                  Terms of Service
                </a>
              </nav>
              
              <div className="space-y-6 flex-1">
                <h6 className="font-bold text-xl text-[#B13BFF] mb-6">Stay In The Loop</h6>
                <p className="text-gray-300 leading-relaxed">
                  Subscribe to our newsletter for the latest events, exclusive offers, and exciting updates from the TickFest community.
                </p>
                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-[#B13BFF]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#B13BFF] focus:ring-4 focus:ring-[#B13BFF]/20 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#B13BFF] to-[#471396] hover:from-[#471396] hover:to-[#B13BFF] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#B13BFF]/30"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#B13BFF]/20 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                Copyright © 2025 TickFest. All rights reserved. | Powered by Innovation
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#B13BFF] transition-colors duration-300">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-[#B13BFF] transition-colors duration-300">Terms</a>
                <a href="#" className="text-gray-400 hover:text-[#B13BFF] transition-colors duration-300">Cookies</a>
                <a href="#" className="text-gray-400 hover:text-[#B13BFF] transition-colors duration-300">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
