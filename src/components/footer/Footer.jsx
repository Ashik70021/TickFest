const Footer = () => {
  return (
    <footer className="bg-[#070a48] text-white p-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-10">
        {/* Left section: Logo & Description */}
        <div className="sm:w-1/3 space-y-4">
          <div className="flex items-center space-x-2 font-bold text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.5-2-4.5-2-6 0-1.5 2-1.5 5 0 7 1.5 2 4.5 2 6 0 1.5-2 1.5-5 0-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.5-2 4.5-2 6 0 1.5 2 1.5 5 0 7-1.5 2-4.5 2-6 0-1.5-2-1.5-5 0-7z"
              />
            </svg>
            <span>TickFest</span>
          </div>
          <p className="text-sm leading-relaxed">
            Eventick is a global self-service ticketing platform for live
            experiences that allows anyone to create, share, find and attend
            events that fuel their passions and enrich their lives.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3 mt-4">
            <a
              href="https://www.facebook.com/"
              className="bg-[#3b5998] hover:bg-[#2d4373] p-2 rounded-full"
            >
              {/* facebook icon  */}
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12.073C22 6.476 17.523 2 12 2S2 6.476 2 12.073c0 5.012 3.657 9.16 8.438 9.88v-6.99h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.774-1.63 1.565v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.233 22 17.085 22 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/"
              className="bg-[#1da1f2] hover:bg-[#0d95e8] p-2 rounded-full"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.97-2.48 9.22 9.22 0 01-2.9 1.11 4.48 4.48 0 00-7.64 4.09A12.8 12.8 0 013 4.15a4.48 4.48 0 001.39 5.99 4.48 4.48 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.02.08 4.48 4.48 0 004.18 3.12A9 9 0 013 19.54a12.72 12.72 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.02-.58A9.22 9.22 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-1.588-.12-7.997-.12-7.997-.12s-6.408 0-7.997.12c-1.81.137-3.24 1.558-3.377 3.366-.12 1.586-.12 4.894-.12 4.894s0 3.308.12 4.894c.137 1.808 1.567 3.229 3.377 3.366 1.59.12 7.997.12 7.997.12s6.408 0 7.997-.12c1.81-.137 3.24-1.558 3.377-3.366.12-1.586.12-4.894.12-4.894s0-3.308-.12-4.894c-.137-1.808-1.567-3.229-3.377-3.366zM10.065 15.568v-7.136l6.092 3.568-6.092 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle sections: Links */}
        <div className="flex flex-col sm:flex-row sm:space-x-20 sm:w-2/3">
          <nav className="space-y-2">
            <h6 className="font-semibold mb-3">Plan Events</h6>
            <a href="#" className="text-sm hover:underline block">
              Create and Set Up
            </a>
            <a href="#" className="text-sm hover:underline block">
              Sell Tickets
            </a>
            <a href="#" className="text-sm hover:underline block">
              Online RSVP
            </a>
            <a href="#" className="text-sm hover:underline block">
              Online Events
            </a>
          </nav>
          <nav className="space-y-2">
            <h6 className="font-semibold mb-3">Eventick</h6>
            <a href="#" className="text-sm hover:underline block">
              About Us
            </a>
            <a href="#" className="text-sm hover:underline block">
              Press
            </a>
            <a href="#" className="text-sm hover:underline block">
              Contact Us
            </a>
            <a href="#" className="text-sm hover:underline block">
              Help Center
            </a>
            <a href="#" className="text-sm hover:underline block">
              How it Works
            </a>
            <a href="#" className="text-sm hover:underline block">
              Privacy
            </a>
            <a href="#" className="text-sm hover:underline block">
              Terms
            </a>
          </nav>
          <nav className="space-y-2">
            <h6 className="font-semibold mb-3">Stay In The Loop</h6>
            <p className="text-xs max-w-xs leading-relaxed mb-2">
              Join our mailing list to stay in the loop with our newest for
              Event and concert
            </p>
            <form className="flex flex-col gap-2 lg:flex-row">
              <input
                type="email"
                placeholder="Enter your email address.."
                className="rounded-full py-2 px-4 text-black w-full max-w-xs focus:outline-none"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full px-6 whitespace-nowrap"
              >
                Subscibe Now
              </button>
            </form>
          </nav>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs">
        Copyright © 2025 TickFest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
