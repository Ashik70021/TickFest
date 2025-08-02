import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an event on TickFest?",
      answer: "To create an event with TickFest, please contact us through our contact form or call us directly. Our team will assist you in setting up your event, managing ticket sales, and ensuring everything runs smoothly."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including Visa, Mastercard, bKash, Nagad, and digital wallets. All transactions are secure and encrypted for your safety."
    },
    {
      question: "How do attendees receive their tickets?",
      answer: "Tickets are delivered instantly via email after purchase. Attendees can also access their tickets through our mobile app with QR codes for easy entry."
    },
    {
      question: "What support do you offer for event organizers?",
      answer: "We provide comprehensive support including event setup assistance, marketing guidance, technical support, and dedicated account management to ensure your event's success."
    },
    {
      question: "How can I contact TickFest for event inquiries?",
      answer: "You can reach us through our contact form on the website or call us directly. Our team is ready to discuss your event requirements and provide personalized solutions."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Background Watermark Design */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Large Question Mark Icons */}
        <div className="absolute top-20 left-10 text-[#232360] text-9xl font-bold transform rotate-12">?</div>
        <div className="absolute top-40 right-20 text-[#232360] text-7xl font-bold transform -rotate-12">?</div>
        <div className="absolute bottom-32 left-1/4 text-[#232360] text-6xl font-bold transform rotate-45">?</div>
        <div className="absolute bottom-20 right-1/3 text-[#232360] text-8xl font-bold transform -rotate-45">?</div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-1/4 w-24 h-24 border-4 border-[#232360] rounded-full transform rotate-45"></div>
        <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-[#232360] transform rotate-12"></div>
        <div className="absolute top-1/2 left-20 w-20 h-20 border-4 border-[#232360] transform rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-[#232360] rounded-full"></div>
        
        {/* FAQ Text Watermarks */}
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 text-[#232360] text-6xl font-bold opacity-30">FAQ</div>
        <div className="absolute bottom-60 right-1/4 text-[#232360] text-4xl font-light transform rotate-90">HELP</div>
        
        {/* Dotted Pattern */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[#232360] rounded-full"></div>
        <div className="absolute top-1/4 left-1/2 ml-4 w-2 h-2 bg-[#232360] rounded-full"></div>
        <div className="absolute top-1/4 left-1/2 ml-8 w-2 h-2 bg-[#232360] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-[#232360] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/2 mr-4 w-2 h-2 bg-[#232360] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/2 mr-8 w-2 h-2 bg-[#232360] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-4xl font-bold text-[#232360] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about TickFest. Can't find what you're looking for? 
            Contact our support team for personalized assistance.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white/90 backdrop-blur-sm"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#232360] pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg 
                      className="w-5 h-5 text-[#232360]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12 p-6 bg-gray-50/90 backdrop-blur-sm rounded-lg relative z-20">
          <h3 className="text-xl font-semibold text-[#232360] mb-2">
            Ready to create your event?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact us through our contact form or call us directly to get started with your event planning.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#232360] text-white px-6 py-3 rounded-lg hover:bg-[#1a1a4a] transition-colors duration-200 font-semibold"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
