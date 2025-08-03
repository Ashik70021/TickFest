import { Navigate } from "react-router-dom";
import TwoPeople from "../../assets/image-6.png";

export default function MakeOwnEvent() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Advanced animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]"></div>

      {/* Animated particles background */}
      <div className="absolute inset-0">
        <div className="particle-bg"></div>
        <div className="stars-bg"></div>
      </div>

      {/* Morphing blob animations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#B13BFF]/30 to-[#471396]/30 rounded-full mix-blend-multiply filter blur-3xl animate-morphing-blob"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-r from-[#471396]/30 to-[#090040]/30 rounded-full mix-blend-multiply filter blur-3xl animate-morphing-blob-delayed"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-[#090040]/30 to-[#B13BFF]/30 rounded-full mix-blend-multiply filter blur-3xl animate-morphing-blob-slow"></div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="animated-grid"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 border-2 border-white/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 border border-white/30 animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-[#B13BFF]/40 rotate-45 animate-float"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[75%] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center min-h-[600px]">
          {/* Left side - Enhanced image with animations */}
          <div className="relative group order-2 lg:order-1">
            {/* Image container with multiple effects */}
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#B13BFF]/40 to-[#471396]/40 rounded-3xl blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>

              {/* Main image container */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform group-hover:rotate-1 group-hover:scale-105 transition-all duration-700">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={TwoPeople}
                    alt="Create your own amazing events"
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Image overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/20 via-transparent to-[#B13BFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating stats/badges around image */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-2xl shadow-xl transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-lg font-bold">1000+</div>
                    <div className="text-xs opacity-90">Events Created</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm text-[#090040] px-4 py-2 rounded-xl shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-sm font-semibold">Easy Setup</div>
                </div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute top-10 -left-6 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 -right-8 w-8 h-8 bg-[#B13BFF]/30 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Right side - Enhanced content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
              <svg
                className="w-4 h-4 text-[#B13BFF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-medium">
                Event Creation Platform
              </span>
            </div>

            {/* Main heading with animation */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                <span className="block transform hover:scale-105 transition-transform duration-300">
                  Make Your Own
                </span>
                <span className="block bg-gradient-to-r from-[#B13BFF] to-white bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 delay-100">
                  Epic Events
                </span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed max-w-md">
                Transform your ideas into unforgettable experiences. Create,
                manage, and promote your events with our powerful platform
                designed for success.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-2 h-2 bg-[#B13BFF] rounded-full animate-pulse"></div>
                <span className="text-sm">
                  Professional event management tools
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div
                  className="w-2 h-2 bg-[#B13BFF] rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-sm">
                  Integrated ticketing & payment system
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div
                  className="w-2 h-2 bg-[#B13BFF] rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-sm">Real-time analytics & insights</span>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => Navigate('/contact')} className="group relative bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] hover:from-[#471396] hover:via-[#B13BFF] hover:to-[#471396] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#B13BFF]/40 overflow-hidden">
                {/* Button animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="relative flex items-center justify-center gap-3">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create Your Event
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <button className="group bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-12 5V7a3 3 0 013-3h6a3 3 0 013 3v12l-3-3-3 3-3 3-3-3z"
                    />
                  </svg>
                  Learn More
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10k+</div>
                <div className="text-xs text-white/70">Events Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-xs text-white/70">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-xs text-white/70">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
