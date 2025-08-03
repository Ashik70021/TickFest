const partners = [
  {
    name: "Mastercard",
    url: "https://www.mastercard.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png",
    alt: "Mastercard Logo",
  },
    {
    name: "nagad",
    url: "https://nagad.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/bn/9/97/%E0%A6%A8%E0%A6%97%E0%A6%A6%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg",
    alt: "nagad Logo",
  },
  {
    name: "Visa",
    url: "https://www.visa.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png",
    alt: "Visa Logo",
  },
  {
    name: "Bkash",
    url: "https://www.bkash.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/bn/thumb/a/a8/%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg/768px-%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg.png?20211006064327",
    alt: "Bkash Logo",
  },
  {
    name: "Google",
    url: "https://www.google.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google Logo",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png",
    alt: "Stripe Logo",
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    alt: "YouTube Logo",
  },
  {
    name: "Microsoft",
    url: "https://microsoft.com",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/768px-Microsoft_logo_%282012%29.svg.png",
    alt: "Microsoft Logo",
  },

];

const Partner = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#B13BFF]/10 to-transparent rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-tl from-[#471396]/10 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 rounded-full border border-[#B13BFF]/30 mb-8">
            <span className="text-[#B13BFF] mr-2">🤝</span>
            <span className="text-[#090040] font-semibold">Trusted Partners</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-[#090040] mb-6">
            Meet Our <span className="bg-gradient-to-r from-[#471396] to-[#B13BFF] bg-clip-text text-transparent">Amazing Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are proud to collaborate with industry leaders and innovative brands who share our vision of creating exceptional event experiences worldwide.
          </p>
        </div>

        {/* Enhanced Partners Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-[#B13BFF]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {partners.map(({ name, url, imgSrc, alt }, index) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#B13BFF]/30 transition-all duration-300 transform hover:-translate-y-2"
                aria-label={name}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <img
                  src={imgSrc}
                  alt={alt}
                  className="relative z-10 h-8 md:h-12 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Partner name tooltip */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-[#090040] text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                    {name}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B13BFF]/10">
            <div className="text-3xl font-bold text-[#B13BFF] mb-2">500+</div>
            <div className="text-gray-600 font-medium">Global Partners</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B13BFF]/10">
            <div className="text-3xl font-bold text-[#471396] mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Uptime Guarantee</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#B13BFF]/10">
            <div className="text-3xl font-bold text-[#B13BFF] mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Partner Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <p className="text-gray-600 mb-6">Interested in partnering with us?</p>
          <button className="bg-gradient-to-r from-[#471396] to-[#B13BFF] hover:from-[#B13BFF] hover:to-[#471396] text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-[#B13BFF]/30 transform hover:-translate-y-1 transition-all duration-300">
            <span className="flex items-center justify-center gap-2">
              Become a Partner
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partner;
