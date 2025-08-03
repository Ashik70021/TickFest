import { useState } from 'react';
import { FaRocket, FaEye, FaHeart, FaUsers, FaShieldAlt, FaTicketAlt, FaCalendarAlt, FaBullhorn, FaChartLine, FaStar, FaQuoteLeft } from 'react-icons/fa';

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState('mission');

    // Company values and services data
    const companyValues = [
        {
            icon: <FaRocket className="text-3xl text-white" />,
            title: "Innovation",
            description: "We continuously innovate to provide cutting-edge event management solutions that exceed expectations.",
            color: "from-[#B13BFF] to-[#471396]"
        },
        {
            icon: <FaHeart className="text-3xl text-white" />,
            title: "Passion",
            description: "Our passion for creating memorable experiences drives everything we do, from small gatherings to large festivals.",
            color: "from-[#471396] to-[#090040]"
        },
        {
            icon: <FaUsers className="text-3xl text-white" />,
            title: "Community",
            description: "We believe in building strong communities by connecting people through amazing events and shared experiences.",
            color: "from-[#090040] to-[#B13BFF]"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-white" />,
            title: "Trust",
            description: "Security and reliability are at the core of our platform, ensuring safe transactions and data protection.",
            color: "from-[#B13BFF] to-[#090040]"
        }
    ];

    const services = [
        {
            icon: <FaTicketAlt className="text-4xl text-white" />,
            title: "Ticket Management",
            description: "Complete ticketing solution with secure payments, QR codes, and real-time sales tracking.",
            features: ["Secure Payment Processing", "Mobile Tickets", "Real-time Analytics", "Refund Management"]
        },
        {
            icon: <FaCalendarAlt className="text-4xl text-white" />,
            title: "Event Creation",
            description: "Powerful tools to create, customize, and manage events of any size with professional support.",
            features: ["Custom Event Pages", "Registration Management", "Attendee Communication", "Event Promotion"]
        },
        {
            icon: <FaBullhorn className="text-4xl text-white" />,
            title: "Marketing Support",
            description: "Comprehensive marketing tools to promote your events and reach the right audience effectively.",
            features: ["Social Media Integration", "Email Campaigns", "SEO Optimization", "Targeted Advertising"]
        },
        {
            icon: <FaChartLine className="text-4xl text-white" />,
            title: "Analytics & Insights",
            description: "Detailed analytics and reporting to help you understand your audience and improve future events.",
            features: ["Sales Reports", "Audience Demographics", "Performance Metrics", "Revenue Tracking"]
        }
    ];

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            description: "Visionary leader with 10+ years in event management and technology innovation.",
            image: "👩‍💼"
        },
        {
            name: "Michael Chen",
            role: "CTO",
            description: "Tech expert passionate about creating seamless user experiences and robust platforms.",
            image: "👨‍💻"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Marketing",
            description: "Creative strategist helping events reach their full potential through innovative marketing.",
            image: "👩‍🎨"
        },
        {
            name: "David Kumar",
            role: "Customer Success",
            description: "Dedicated to ensuring every customer achieves their event goals and beyond.",
            image: "👨‍🎓"
        }
    ];

    const testimonials = [
        {
            name: "Alex Thompson",
            role: "Event Organizer",
            company: "Music Festivals Co.",
            quote: "TickFest transformed how we manage our music festivals. The platform is intuitive, reliable, and our attendees love the seamless experience.",
            rating: 5
        },
        {
            name: "Maria Garcia",
            role: "Conference Manager",
            company: "Tech Conferences Inc.",
            quote: "The analytics and reporting features helped us understand our audience better and increase attendance by 40% year over year.",
            rating: 5
        },
        {
            name: "James Wilson",
            role: "Corporate Events",
            company: "Enterprise Solutions",
            quote: "Professional support, secure payments, and excellent customer service. TickFest is our go-to platform for all corporate events.",
            rating: 5
        }
    ];

    const stats = [
        { number: "50,000+", label: "Events Created", icon: <FaCalendarAlt /> },
        { number: "2M+", label: "Tickets Sold", icon: <FaTicketAlt /> },
        { number: "10,000+", label: "Happy Organizers", icon: <FaUsers /> },
        { number: "99.9%", label: "Uptime", icon: <FaShieldAlt /> }
    ];

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
            {/* Background Watermark Design with Animations */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {/* Animated Event-related Icons */}
                <div className="absolute top-20 left-10 text-[#232360] text-9xl font-bold transform rotate-12 animate-pulse">🎟️</div>
                <div className="absolute top-40 right-20 text-[#232360] text-7xl font-bold transform -rotate-12 animate-bounce">🎪</div>
                <div className="absolute bottom-32 left-1/4 text-[#232360] text-6xl font-bold transform rotate-45 animate-pulse">🎭</div>
                <div className="absolute bottom-20 right-1/3 text-[#232360] text-8xl font-bold transform -rotate-45 animate-bounce">🎨</div>
                <div className="absolute top-1/2 right-1/2 text-[#232360] text-5xl font-bold transform rotate-90 animate-pulse">🎵</div>
                
                {/* Animated Geometric Shapes */}
                <div className="absolute top-32 right-1/4 w-24 h-24 border-4 border-[#232360] rounded-full transform rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-[#232360] transform rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 left-20 w-20 h-20 border-4 border-[#232360] transform rotate-45 animate-bounce"></div>
                <div className="absolute top-1/3 right-10 w-12 h-12 bg-[#232360] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-18 h-18 border-2 border-[#232360] rounded-full animate-spin-slow"></div>
                
                {/* Text Watermarks */}
                <div className="absolute top-1/4 left-1/2 transform -rotate-12 text-[#232360] text-4xl font-bold opacity-30 animate-pulse">TICKFEST</div>
                <div className="absolute bottom-1/3 right-1/4 transform rotate-12 text-[#232360] text-3xl font-bold opacity-30 animate-bounce">EVENTS</div>
                <div className="absolute top-3/4 left-1/4 transform -rotate-45 text-[#232360] text-2xl font-bold opacity-30 animate-pulse">ABOUT</div>
                
                {/* Additional Animated Elements */}
                <div className="absolute top-16 right-1/3 w-8 h-8 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full animate-bounce opacity-20"></div>
                <div className="absolute bottom-16 left-1/2 w-6 h-6 bg-gradient-to-r from-[#471396] to-[#232360] transform rotate-45 animate-pulse opacity-20"></div>
            </div>

            {/* Subtle Animated Background Pattern */}
            <div className="absolute inset-0 opacity-3">
                <div className="absolute inset-0 animate-pulse" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23232360' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    animation: 'patternMove 30s linear infinite'
                }}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        {/* Highlight Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 backdrop-blur-sm rounded-full border border-[#B13BFF]/30 mb-8 shadow-lg shadow-[#B13BFF]/10">
                            <span className="text-[#B13BFF] mr-2 text-lg">✨</span>
                            <span className="text-[#232360] text-sm font-semibold tracking-wide">Discover the story behind TickFest</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#232360] leading-tight mb-8">
                            <span className="block">About</span>
                            <span className="block bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] bg-clip-text text-transparent animate-pulse">
                                TickFest
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                            We're revolutionizing the event industry by connecting people through unforgettable experiences. 
                            From intimate gatherings to grand festivals, we make event creation and attendance seamless.
                        </p>

                        {/* Company Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group cursor-pointer">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#B13BFF]/20">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center shadow-lg text-white text-2xl">
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <p className="text-3xl font-bold text-[#232360] mb-2">{stat.number}</p>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mission, Vision, Values Section */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#232360] mb-6">Our Foundation</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Built on strong values and a clear vision for the future of events
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-12">
                            <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200">
                                <div className="flex space-x-2">
                                    {['mission', 'vision', 'values'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => toggleTab(tab)}
                                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 capitalize ${
                                                activeTab === tab
                                                    ? 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg'
                                                    : 'text-gray-600 hover:text-[#232360] hover:bg-white/50'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-16 translate-x-16"></div>
                            
                            <div className="relative z-10">
                                {activeTab === 'mission' && (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-6">
                                            <div className="w-20 h-20 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full flex items-center justify-center shadow-2xl">
                                                <FaRocket className="text-white text-3xl" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#090040] mb-6">Our Mission</h3>
                                        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                                            To democratize event creation and make memorable experiences accessible to everyone. 
                                            We empower organizers with professional tools and provide attendees with seamless, 
                                            secure access to the events they love. Our platform bridges the gap between vision 
                                            and reality, turning ideas into unforgettable moments.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'vision' && (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-6">
                                            <div className="w-20 h-20 bg-gradient-to-r from-[#471396] to-[#090040] rounded-full flex items-center justify-center shadow-2xl">
                                                <FaEye className="text-white text-3xl" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#090040] mb-6">Our Vision</h3>
                                        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                                            To become the world's leading event platform, where every gathering—from local meetups 
                                            to international festivals—can thrive. We envision a future where technology seamlessly 
                                            connects communities, cultures, and experiences, making the world more connected and 
                                            vibrant through the power of shared moments.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'values' && (
                                    <div>
                                        <div className="text-center mb-10">
                                            <h3 className="text-3xl font-bold text-[#090040] mb-4">Our Values</h3>
                                            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {companyValues.map((value, index) => (
                                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                                    <div className="flex items-center mb-4">
                                                        <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center shadow-lg mr-4`}>
                                                            {value.icon}
                                                        </div>
                                                        <h4 className="text-xl font-bold text-[#090040]">{value.title}</h4>
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#232360] mb-6">What We Do</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive event solutions from planning to execution
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-12 translate-x-12"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-2xl flex items-center justify-center shadow-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#090040]">{service.title}</h3>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                                        <div className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full mr-3"></div>
                                                    <span className="text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#232360] mb-6">Meet Our Team</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The passionate people behind TickFest's success
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-10 translate-x-10"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-4">{member.image}</div>
                                        <h3 className="text-xl font-bold text-[#090040] mb-2">{member.name}</h3>
                                        <p className="text-[#471396] font-semibold mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="mb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#232360] mb-6">What Our Clients Say</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Real feedback from event organizers who trust TickFest
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-12 translate-x-12"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-4">
                                            <FaQuoteLeft className="text-2xl text-[#B13BFF] mr-3" />
                                            <div className="flex">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <FaStar key={i} className="text-yellow-400 text-lg" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-6 leading-relaxed italic">
                                            "{testimonial.quote}"
                                        </p>
                                        <div>
                                            <p className="font-bold text-[#090040]">{testimonial.name}</p>
                                            <p className="text-[#471396] text-sm">{testimonial.role}</p>
                                            <p className="text-gray-500 text-xs">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B13BFF]/10 to-[#471396]/10 rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#471396]/10 to-[#B13BFF]/10 rounded-full translate-y-16 -translate-x-16"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-6">
                                    Ready to Create Something Amazing?
                                </h3>
                                <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                                    Join thousands of successful event organizers who trust TickFest to bring their visions to life.
                                    Let's create unforgettable experiences together.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button className="group relative bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-[#B13BFF]/40 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center justify-center gap-3 text-xl">
                                            🚀 Start Your Event
                                        </span>
                                    </button>
                                    <button className="group relative bg-gradient-to-r from-[#090040] to-[#471396] backdrop-blur-sm text-white font-bold px-10 py-5 rounded-2xl border-2 border-[#B13BFF]/50 hover:border-[#B13BFF] hover:bg-gradient-to-r hover:from-[#471396] hover:to-[#B13BFF] transform hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-[#471396]/40">
                                        <span className="relative flex items-center justify-center gap-3 text-xl">
                                            💬 Contact Us
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
