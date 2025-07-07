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
    <section className="py-10 bg-white text-center max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-[#242565] mb-2">
        Meet our Partner
      </h2>
      <p className="text-base text-gray-600 max-w-3xl mx-auto mb-8">
        We are proud to collaborate with some of the most innovative and
        influential brands across various industries. Their trust in our
        services drives us to continually deliver excellence and create lasting
        partnerships.
      </p>

      {/* <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map(({ name, url, imgSrc, alt }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-h-12"
            aria-label={name}
          >
            <img
              src={imgSrc}
              alt={alt}
              className="max-h-12 object-contain"
              loading="lazy"
            />
          </a>
        ))}
      </div> */}

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        {partners.map(({ name, url, imgSrc, alt }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label={name}
          >
            <img
              src={imgSrc}
              alt={alt}
              className="h-8 w-full lg:h-16 md:h-12 max-w-[180px] object-contain transition-all duration-200"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Partner;
