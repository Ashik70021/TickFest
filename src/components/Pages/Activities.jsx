import { useState } from 'react';
import { FaChevronDown, FaQuestion, FaUsers, FaShieldAlt } from 'react-icons/fa';

const Activities = () => {
    const [openFAQ, setOpenFAQ] = useState({});

    // FAQ data organized by categories
    const faqCategories = [
        {
            id: 'general',
            title: 'General Questions',
            icon: '❓',
            color: 'from-[#B13BFF] to-[#471396]',
            questions: [
                {
                    id: 1,
                    question: "What is TickFest and how does it work?",
                    answer: "TickFest is your ultimate event discovery and ticketing platform. We connect you with amazing events in your area - from concerts and conferences to workshops and festivals. Simply browse events, purchase tickets securely, and enjoy unforgettable experiences!"
                },
                {
                    id: 2,
                    question: "How do I create an account?",
                    answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email. You can also sign up instantly using your Google or Facebook account for faster access."
                },
                {
                    id: 3,
                    question: "Is TickFest free to use?",
                    answer: "Yes! Creating an account and browsing events is completely free. We only charge a small service fee when you purchase tickets, which helps us maintain the platform and provide excellent customer support."
                }
            ]
        },
        {
            id: 'tickets',
            title: 'Tickets & Booking',
            icon: '🎫',
            color: 'from-[#471396] to-[#090040]',
            questions: [
                {
                    id: 4,
                    question: "How do I buy tickets?",
                    answer: "Buying tickets is simple! Find your event, click 'Get Tickets', select your ticket type and quantity, proceed to checkout, and complete your payment. You'll receive your tickets via email instantly."
                },
                {
                    id: 5,
                    question: "Can I get a refund on my tickets?",
                    answer: "Refund policies vary by event organizer. Most events offer full refunds if cancelled, and some allow refunds up to 24-48 hours before the event. Check the specific refund policy on the event page before purchasing."
                },
                {
                    id: 6,
                    question: "What happens if an event is cancelled?",
                    answer: "If an event is cancelled by the organizer, you'll receive a full automatic refund within 5-7 business days. We'll also notify you immediately via email and SMS about the cancellation and next steps."
                }
            ]
        },
        {
            id: 'events',
            title: 'Events & Organizers',
            icon: '📅',
            color: 'from-[#090040] to-[#B13BFF]',
            questions: [
                {
                    id: 7,
                    question: "How can I organize my own event?",
                    answer: "Ready to create amazing events? Switch to an Organizer account in your profile settings. You'll get access to our powerful event management tools, analytics, promotional features, and dedicated organizer support."
                },
                {
                    id: 8,
                    question: "What types of events can I create?",
                    answer: "You can create virtually any type of event! Concerts, conferences, workshops, festivals, sports events, exhibitions, networking meetups, and more. Our platform supports both free and paid events with flexible ticketing options."
                },
                {
                    id: 9,
                    question: "How do I promote my event?",
                    answer: "We provide multiple promotion tools: featured listings, social media integration, email marketing, discount codes, early bird pricing, and analytics to track your success. Premium organizers get additional promotional boost!"
                }
            ]
        },
        {
            id: 'payment',
            title: 'Payment & Security',
            icon: '💳',
            color: 'from-[#B13BFF] to-[#090040]',
            questions: [
                {
                    id: 10,
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely with 256-bit SSL encryption."
                },
                {
                    id: 11,
                    question: "Is my payment information secure?",
                    answer: "Absolutely! We use industry-standard security measures including SSL encryption, PCI DSS compliance, and secure payment gateways. Your payment information is never stored on our servers and is processed by certified payment providers."
                },
                {
                    id: 12,
                    question: "When will I be charged for my tickets?",
                    answer: "Your payment is processed immediately upon completing your purchase. For free events, no payment is required but registration is still necessary to secure your spot and receive event updates."
                }
            ]
        }
    ];

    const toggleFAQ = (questionId) => {
        setOpenFAQ(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const totalQuestions = faqCategories.reduce((total, category) => total + category.questions.length, 0);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Modern Background with Banner Color Scheme */}
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

            {/* Rotating Gradient Rings */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute w-96 h-96 rounded-full border border-[#B13BFF]/20 animate-spin-slow"></div>
                <div className="absolute w-80 h-80 rounded-full border border-[#471396]/20 animate-spin-reverse"></div>
                <div className="absolute w-64 h-64 rounded-full border border-[#090040]/20 animate-spin-slow"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        {/* Highlight Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#471396]/30 to-[#B13BFF]/30 backdrop-blur-sm rounded-full border border-[#B13BFF]/40 mb-8 shadow-lg shadow-[#B13BFF]/20">
                            <span className="text-[#B13BFF] mr-2 text-lg">💡</span>
                            <span className="text-white text-sm font-semibold tracking-wide">Everything you need to know about TickFest</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                            <span className="block">Frequently Asked</span>
                            <span className="block bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] bg-clip-text text-transparent animate-pulse">
                                Questions
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Find answers to common questions about events, tickets, payments, and more
                        </p>

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="text-center group cursor-pointer">
                                <div className="bg-gradient-to-br from-[#B13BFF]/20 to-[#471396]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#B13BFF]/30 transform group-hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#B13BFF]/20">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-20 h-20 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center shadow-2xl">
                                            <FaQuestion className="text-white text-3xl" />
                                        </div>
                                    </div>
                                    <p className="text-lg text-white font-bold">{totalQuestions}+ Questions</p>
                                    <p className="text-sm text-gray-300">Comprehensive FAQ</p>
                                </div>
                            </div>

                            <div className="text-center group cursor-pointer">
                                <div className="bg-gradient-to-br from-[#471396]/20 to-[#B13BFF]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#471396]/30 transform group-hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#471396]/20">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                                            <FaShieldAlt className="text-white text-3xl" />
                                        </div>
                                    </div>
                                    <p className="text-lg text-white font-bold">24/7 Support</p>
                                    <p className="text-sm text-gray-300">Always here to help</p>
                                </div>
                            </div>

                            <div className="text-center group cursor-pointer">
                                <div className="bg-gradient-to-br from-[#B13BFF]/20 to-[#090040]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#B13BFF]/30 transform group-hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#B13BFF]/20">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                                            <FaUsers className="text-white text-3xl" />
                                        </div>
                                    </div>
                                    <p className="text-lg text-white font-bold">Community Help</p>
                                    <p className="text-sm text-gray-300">User-driven support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Categories */}
                    <div className="mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {faqCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-12 translate-x-12"></div>
                                    
                                    <div className="relative z-10 text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                                                <span className="text-3xl">{category.icon}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#090040] mb-2">{category.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{category.questions.length} Questions</p>
                                        <div className="space-y-2">
                                            {category.questions.slice(0, 2).map((q) => (
                                                <div key={q.id} className="text-xs text-gray-500 truncate">
                                                    • {q.question}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Sections */}
                    <div className="space-y-16">
                        {faqCategories.map((category) => (
                            <div key={category.id} className="relative">
                                {/* Category Header */}
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-4 mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                                            <span className="text-2xl">{category.icon}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            {category.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* FAQ Items */}
                                <div className="space-y-6">
                                    {category.questions.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 group relative overflow-hidden"
                                        >
                                            {/* Background decoration */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5 rounded-full -translate-y-16 translate-x-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#471396]/5 to-[#B13BFF]/5 rounded-full translate-y-12 -translate-x-12"></div>
                                            
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full p-8 text-left relative z-10 group focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 rounded-3xl"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                            <FaQuestion className="text-white text-lg" />
                                                        </div>
                                                        <h3 className="text-xl md:text-2xl font-bold text-[#090040] group-hover:text-[#471396] transition-colors duration-300">
                                                            {faq.question}
                                                        </h3>
                                                    </div>
                                                    <div className={`ml-4 transform transition-all duration-300 ${openFAQ[faq.id] ? 'rotate-180' : ''}`}>
                                                        <div className="w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl flex items-center justify-center shadow-lg">
                                                            <FaChevronDown className="text-white text-lg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>

                                            {/* Answer */}
                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                openFAQ[faq.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <div className="px-8 pb-8 relative z-10">
                                                    <div className="border-t-2 border-gray-100 pt-6 ml-16">
                                                        <p className="text-gray-700 text-lg leading-relaxed font-medium">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Support Section */}
                    <div className="text-center mt-20">
                        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#471396]/10 to-[#B13BFF]/10 rounded-full translate-y-16 -translate-x-16"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center shadow-2xl">
                                        <FaQuestion className="text-white text-3xl" />
                                    </div>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-6">
                                    Still Have Questions?
                                </h3>
                                <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                                    Can&apos;t find what you&apos;re looking for? Our support team is always ready to help you with any questions or concerns.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button className="group relative bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-[#B13BFF]/40 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center justify-center gap-3 text-xl">
                                            📧 Contact Support
                                        </span>
                                    </button>
                                    <button className="group relative bg-gradient-to-r from-[#090040] to-[#471396] backdrop-blur-sm text-white font-bold px-10 py-5 rounded-2xl border-2 border-[#B13BFF]/50 hover:border-[#B13BFF] hover:bg-gradient-to-r hover:from-[#471396] hover:to-[#B13BFF] transform hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-[#471396]/40">
                                        <span className="relative flex items-center justify-center gap-3 text-xl">
                                            💬 Live Chat
                                        </span>
                                    </button>
                                </div>
                                
                                {/* Contact Methods */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <span className="text-white text-lg">📞</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[#090040] mb-2">Phone Support</h4>
                                        <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                                        <p className="text-gray-500 text-xs">Mon-Fri, 9AM-6PM EST</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <span className="text-white text-lg">📧</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[#090040] mb-2">Email Support</h4>
                                        <p className="text-gray-600 text-sm">support@tickfest.com</p>
                                        <p className="text-gray-500 text-xs">Response within 24 hours</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <span className="text-white text-lg">💬</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[#090040] mb-2">Live Chat</h4>
                                        <p className="text-gray-600 text-sm">Available 24/7</p>
                                        <p className="text-gray-500 text-xs">Instant response</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;