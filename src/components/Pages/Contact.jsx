import { useState, useEffect } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        eventType: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                eventType: ''
            });
        } catch (err) {
            console.error('Contact form submission error:', err);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            {/* Background Watermark Design with Animations */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {/* Animated Contact-related Icons */}
                <div className="absolute top-20 left-10 text-[#232360] text-9xl font-bold transform rotate-12 animate-pulse">📞</div>
                <div className="absolute top-40 right-20 text-[#232360] text-7xl font-bold transform -rotate-12 animate-bounce">✉️</div>
                <div className="absolute bottom-32 left-1/4 text-[#232360] text-6xl font-bold transform rotate-45 animate-pulse">📍</div>
                <div className="absolute bottom-20 right-1/3 text-[#232360] text-8xl font-bold transform -rotate-45 animate-bounce">💬</div>
                <div className="absolute top-1/2 right-1/2 text-[#232360] text-5xl font-bold transform rotate-90 animate-pulse">📧</div>
                <div className="absolute top-3/4 left-1/5 text-[#232360] text-6xl font-bold transform -rotate-30 animate-bounce">📱</div>
                <div className="absolute bottom-1/5 right-1/5 text-[#232360] text-7xl font-bold transform rotate-30 animate-pulse">📠</div>
                <div className="absolute top-1/3 left-1/3 text-[#232360] text-4xl font-bold transform rotate-60 animate-bounce">🌐</div>
                
                {/* Floating Phone Icons with Different Animations */}
                <div className="absolute top-16 left-1/2 text-[#232360] text-2xl animate-float-slow">📞</div>
                <div className="absolute top-1/4 right-1/5 text-[#232360] text-3xl animate-float-medium">📱</div>
                <div className="absolute bottom-1/4 left-1/6 text-[#232360] text-2xl animate-float-fast">📞</div>
                <div className="absolute top-2/3 right-2/3 text-[#232360] text-2xl animate-twinkle">📧</div>
                <div className="absolute bottom-1/3 left-2/3 text-[#232360] text-3xl animate-float-slow">✉️</div>
                
                {/* Animated Geometric Shapes */}
                <div className="absolute top-32 right-1/4 w-24 h-24 border-4 border-[#232360] rounded-full transform rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-[#232360] transform rotate-12 animate-pulse"></div>
                <div className="absolute top-1/2 left-20 w-20 h-20 border-4 border-[#232360] transform rotate-45 animate-bounce"></div>
                <div className="absolute top-1/3 right-10 w-12 h-12 bg-[#232360] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-18 h-18 border-2 border-[#232360] rounded-full animate-spin-slow"></div>
                
                {/* Contact Bubbles with Phone Ring Animation */}
                <div className="absolute top-1/5 left-2/5 w-8 h-8 border-2 border-[#232360] rounded-full animate-ping opacity-30"></div>
                <div className="absolute bottom-1/5 right-2/5 w-6 h-6 border-2 border-[#232360] rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-2/5 left-1/5 w-10 h-10 border-2 border-[#232360] rounded-full animate-ping opacity-25" style={{animationDelay: '2s'}}></div>
                
                {/* Text Watermarks */}
                <div className="absolute top-1/4 left-1/2 transform -rotate-12 text-[#232360] text-4xl font-bold opacity-30 animate-pulse">CONTACT</div>
                <div className="absolute bottom-1/3 right-1/4 transform rotate-12 text-[#232360] text-3xl font-bold opacity-30 animate-bounce">SUPPORT</div>
                <div className="absolute top-3/4 left-1/4 transform -rotate-45 text-[#232360] text-2xl font-bold opacity-30 animate-pulse">HELP</div>
                <div className="absolute bottom-1/6 left-1/2 transform rotate-25 text-[#232360] text-2xl font-bold opacity-25 animate-bounce">CALL US</div>
                <div className="absolute top-1/6 right-1/3 transform -rotate-20 text-[#232360] text-3xl font-bold opacity-25 animate-pulse">REACH OUT</div>
                
                {/* Signal Wave Animation */}
                <div className="absolute top-1/4 right-1/6">
                    <div className="relative">
                        <div className="w-4 h-4 bg-[#232360] rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-[#232360] rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute inset-0 w-4 h-4 bg-[#232360] rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
                    </div>
                </div>
                
                {/* Additional Animated Elements */}
                <div className="absolute top-16 right-1/3 w-8 h-8 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full animate-bounce opacity-20"></div>
                <div className="absolute bottom-16 left-1/2 w-6 h-6 bg-gradient-to-r from-[#471396] to-[#232360] transform rotate-45 animate-pulse opacity-20"></div>
                <div className="absolute top-3/5 right-1/4 w-10 h-10 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-full animate-float-slow opacity-15"></div>
                <div className="absolute bottom-2/5 left-1/5 w-7 h-7 bg-gradient-to-r from-[#471396] to-[#232360] transform rotate-12 animate-twinkle opacity-20"></div>
            </div>

            {/* Subtle Animated Background Pattern */}
            <div className="absolute inset-0 opacity-3">
                <div className="absolute inset-0 animate-pulse" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23232360' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    animation: 'patternMove 30s linear infinite'
                }}></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-black text-[#232360] mb-6">
                        Get In <span className="bg-gradient-to-r from-[#B13BFF] to-[#471396] bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Have questions about events? Want to organize something special? 
                        We&apos;re here to help make your event dreams come true!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Quick Response</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-[#090040] mb-4">Send Us a Message</h2>
                            <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                        </div>

                        {/* Success/Error Messages */}
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-green-800 font-medium">Message sent successfully! We&apos;ll get back to you soon.</span>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <span className="text-red-800 font-medium">Something went wrong. Please try again.</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#090040] mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#090040] mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#090040] mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder="What's this about?"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#090040] mb-2">Event Type Interest</label>
                                    <select
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white"
                                    >
                                        <option value="">Select event type</option>
                                        <option value="Concert">🎵 Concert</option>
                                        <option value="Conference">💼 Conference</option>
                                        <option value="Sports">⚽ Sports</option>
                                        <option value="Workshop">🔧 Workshop</option>
                                        <option value="Festival">🎪 Festival</option>
                                        <option value="Comedy">😂 Comedy</option>
                                        <option value="Theatre">🎭 Theatre</option>
                                        <option value="Other">🎯 Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#090040] mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full px-8 py-4 bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] hover:from-[#471396] hover:via-[#B13BFF] hover:to-[#471396] text-white rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#B13BFF]/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {/* Office Location */}
                            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#090040] mb-2">Visit Our Office</h3>
                                        <p className="text-gray-600 mb-1">123 Event Street, Tech District</p>
                                        <p className="text-gray-600 mb-3">Dhaka 1205, Bangladesh</p>
                                        <p className="text-sm text-[#471396] font-medium">Open Mon-Fri, 9AM-6PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-[#471396] to-[#090040] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#090040] mb-2">Call Us</h3>
                                        <p className="text-gray-600 mb-1">+880 1234-567890</p>
                                        <p className="text-gray-600 mb-3">+880 1987-654321</p>
                                        <p className="text-sm text-[#471396] font-medium">24/7 Support Available</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#090040] mb-2">Email Us</h3>
                                        <p className="text-gray-600 mb-1">info@tickfest.com</p>
                                        <p className="text-gray-600 mb-3">support@tickfest.com</p>
                                        <p className="text-sm text-[#471396] font-medium">Quick Response Guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-[#090040] mb-6 text-center">Follow Us</h3>
                            <div className="flex justify-center gap-4">
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-3xl p-6 border border-[#B13BFF]/20">
                            <h3 className="text-xl font-bold text-[#090040] mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center gap-3 text-[#471396] hover:text-[#B13BFF] transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>How to book tickets?</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 text-[#471396] hover:text-[#B13BFF] transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Event organization guide</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 text-[#471396] hover:text-[#B13BFF] transition-colors duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Refund & cancellation policy</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="relative z-10 bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#090040] mb-4">Find Us on Map</h2>
                        <p className="text-gray-600">Located in the heart of Dhaka&apos;s tech district</p>
                    </div>
                    
                    {/* Interactive Map */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="relative h-96">
                            {/* Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0962090520893!2d90.3917743!3d23.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a5b7b6d6fb%3A0x7f8a6a3a0c4a5b6c!2sTech%20District%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1642678901234!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="TickFest Office Location"
                                className="absolute inset-0"
                            ></iframe>
                            
                            {/* Custom Overlay with Location Info */}
                            {/* <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#090040]">TickFest HQ</h3>
                                        <p className="text-sm text-gray-600">Tech District, Dhaka</p>
                                        <p className="text-xs text-[#471396] font-medium">23.7749°N, 90.4226°E</p>
                                    </div>
                                </div>
                            </div> */}
                            
                            {/* Get Directions Button */}
                            <div className="absolute bottom-4 right-4 z-10">
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=23.7749,90.4226&destination_place_id=ChIJfb6b5a_HVTcRbFukCjOjqX8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-4 py-2 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 shadow-lg hover:scale-105"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Get Directions
                                </a>
                            </div>
                        </div>
                        
                        {/* Map Info Cards */}
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#090040]">5 min walk</p>
                                        <p className="text-sm text-gray-600">from Dhanmondi Metro</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#090040]">Free Parking</p>
                                        <p className="text-sm text-gray-600">Available on-site</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#090040]">Floor 12</p>
                                        <p className="text-sm text-gray-600">Suite 1205-1210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Coordinates Display */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-2xl px-6 py-4 border border-[#B13BFF]/20">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6m-6 4h6" />
                                </svg>
                                <span className="font-semibold text-[#090040]">Coordinates:</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="bg-white px-3 py-1 rounded-lg font-mono text-[#471396]">
                                    Lat: 23.7749°N
                                </span>
                                <span className="bg-white px-3 py-1 rounded-lg font-mono text-[#471396]">
                                    Lng: 90.4226°E
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('23.7749, 90.4226');
                                    alert('Coordinates copied to clipboard!');
                                }}
                                className="text-[#B13BFF] hover:text-[#471396] transition-colors duration-300"
                                title="Copy coordinates"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative z-10 bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#232360] to-[#471396] bg-clip-text text-transparent mb-4">Ready to Create Amazing Events?</h2>
                    <p className="text-xl text-gray-600 mb-8">Join thousands of event organizers who trust TickFest</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl font-bold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Start Organizing
                        </button>
                        <button className="px-8 py-3 border-2 border-[#B13BFF] text-[#471396] rounded-xl font-bold hover:bg-[#B13BFF] hover:text-white transition-all duration-300 transform hover:scale-105">
                            Browse Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;