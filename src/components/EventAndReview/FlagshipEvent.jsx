import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getFeaturedEvents, getEventsData } from "../../utils/eventsAPI";
import getImage from "../../utils/grtImage";

export default function FlagshipEvents() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            try {
                let featuredEvents = await getFeaturedEvents();
                
                // If no featured events, get first 6 events as fallback
                if (featuredEvents.length === 0) {
                    const allEvents = await getEventsData();
                    featuredEvents = allEvents.slice(0, 6);
                }
                
                setCards(featuredEvents);
            } catch (error) {
                console.error('Error loading featured events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedEvents();
    }, []);

    if (loading) {
        return (
            <section className="relative py-20 bg-gradient-to-br from-[#090040] via-[#471396] to-[#090040] overflow-hidden">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF]"></div>
                </div>
            </section>
        );
    }

    // Don't render the component if no events are available
    if (cards.length === 0) {
        return null;
    }

    return (
        <section className="relative py-20 bg-gradient-to-br from-[#090040] via-[#471396] to-[#090040] overflow-hidden">
            {/* Advanced Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Floating geometric shapes with enhanced animations */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/20 to-transparent rounded-full animate-float-slow blur-sm"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#471396]/20 to-transparent rounded-full animate-float-medium transform rotate-45"></div>
                <div className="absolute bottom-20 left-40 w-20 h-20 bg-gradient-to-br from-[#B13BFF]/15 to-transparent rounded-full animate-float-fast"></div>
                <div className="absolute bottom-40 right-40 w-28 h-28 bg-gradient-to-br from-[#471396]/15 to-transparent rounded-full animate-spin-slow blur-sm"></div>

                {/* Additional floating elements */}
                <div className="absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-full animate-float-reverse"></div>
                <div className="absolute top-2/3 right-10 w-20 h-20 bg-gradient-to-l from-[#471396]/15 to-[#B13BFF]/15 rounded-full animate-orbit"></div>

                {/* Animated lines and grids */}
                <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-[#B13BFF]/30 to-transparent animate-glow"></div>
                <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-[#471396]/30 to-transparent animate-glow-delay"></div>
                <div className="absolute left-0 top-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-[#B13BFF]/20 to-transparent animate-flow-horizontal"></div>
                <div className="absolute left-0 top-2/3 w-full h-0.5 bg-gradient-to-r from-transparent via-[#471396]/20 to-transparent animate-flow-horizontal-reverse"></div>

                {/* Dynamic mesh background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh animate-mesh-move"></div>
                </div>

                {/* Radial gradients for depth with enhanced animations */}
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-radial from-[#B13BFF]/10 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-[#471396]/8 to-transparent rounded-full animate-expand-contract"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-[#B13BFF]/6 to-transparent rounded-full animate-rotate-slow"></div>

                {/* Particle-like dots */}
                <div className="absolute top-10 left-1/3 w-2 h-2 bg-[#B13BFF]/40 rounded-full animate-twinkle"></div>
                <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-[#471396]/50 rounded-full animate-twinkle-delay"></div>
                <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-[#B13BFF]/30 rounded-full animate-twinkle-slow"></div>
                <div className="absolute bottom-10 right-1/5 w-2.5 h-2.5 bg-[#471396]/40 rounded-full animate-twinkle-fast"></div>

                {/* Wave-like animations */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#090040]/50 to-transparent animate-wave"></div>
                <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-[#471396]/30 to-transparent animate-wave-reverse"></div>
            </div>

            {/* Content Container with reduced width */}
            <div className="relative z-10 max-w-[80%] mx-auto px-8">
                {/* Enhanced Header Section */}
                <div className="text-center mb-16 relative">
                    {/* Animated background accent */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-1 bg-gradient-to-r from-transparent via-[#B13BFF] to-transparent opacity-60 animate-glow"></div>

                    {/* Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B13BFF]/30 to-[#471396]/30 backdrop-blur-sm rounded-full border border-[#B13BFF]/40 mb-8 shadow-lg transform hover:scale-105 transition-all duration-300 animate-float-slow">
                        <span className="text-[#B13BFF] mr-2 text-lg animate-twinkle">🏆</span>
                        <span className="text-white font-semibold tracking-wide">Featured Success Stories</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        <span className="block transform hover:scale-105 transition-transform duration-300">Flagship Events</span>
                        <span className="block bg-gradient-to-r from-[#B13BFF] via-white to-[#B13BFF] bg-clip-text text-transparent">
                            in Review
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed transform hover:text-gray-200 transition-colors duration-300">
                        We are proud to showcase the success of our previous flagship events, where
                        <span className="text-[#B13BFF] font-semibold animate-twinkle"> TickFest </span>
                        provided exceptional ticketing solutions from start to finish.
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-24 h-1 bg-gradient-to-r from-transparent via-[#471396] to-transparent opacity-40 animate-glow-delay"></div>
                </div>

                {/* Enhanced Marquee Sections */}
                <div className="space-y-8 relative">
                    {/* Animated divider */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B13BFF]/30 to-transparent transform -translate-y-1/2 animate-flow-horizontal"></div>

                    {/* First Marquee - Left to Right */}
                    <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#090040] via-[#090040]/80 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#090040] via-[#090040]/80 to-transparent z-10 pointer-events-none"></div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B13BFF]/0 via-[#B13BFF]/5 to-[#B13BFF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow"></div>

                        <Marquee speed={80} gradient={false} className="py-4">
                            {cards.map((card, i) => (
                                <div
                                    key={`left-${i}`}
                                    className="group relative mx-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-[#B13BFF]/30 animate-float-slow"
                                    style={{
                                        width: '320px',
                                        height: '200px',
                                        animationDelay: `${i * 0.2}s`
                                    }}
                                >
                                    {/* Image with overlay */}
                                    <div className="relative h-full overflow-hidden">
                                        <img
                                            src={getImage(card.cover)}
                                            alt={card.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Animated shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#090040]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                        {/* Content overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-lg font-bold mb-2 line-clamp-1">{card.name}</h3>
                                            <p className="text-sm opacity-90 line-clamp-2">{card.description}</p>
                                        </div>

                                        {/* Hover effect border */}
                                        <div className="absolute inset-0 border-2 border-[#B13BFF]/0 group-hover:border-[#B13BFF]/50 rounded-3xl transition-all duration-300"></div>

                                        {/* Corner accent */}
                                        <div className="absolute top-4 right-4 w-3 h-3 bg-[#B13BFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-twinkle"></div>
                                    </div>
                                </div>
                            ))}
                        </Marquee>
                    </div>

                    {/* Second Marquee - Right to Left */}
                    <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#090040] via-[#090040]/80 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#090040] via-[#090040]/80 to-transparent z-10 pointer-events-none"></div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#471396]/0 via-[#471396]/5 to-[#471396]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-delay"></div>

                        <Marquee direction="right" speed={60} gradient={false} className="py-4">
                            {cards.map((card, i) => (
                                <div
                                    key={`right-${i}`}
                                    className="group relative mx-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-[#471396]/30 animate-float-reverse"
                                    style={{
                                        width: '320px',
                                        height: '200px',
                                        animationDelay: `${i * 0.15}s`
                                    }}
                                >
                                    {/* Image with overlay */}
                                    <div className="relative h-full overflow-hidden">
                                        <img
                                            src={getImage(card.cover)}
                                            alt={card.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Animated shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#471396]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                        {/* Content overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-lg font-bold mb-2 line-clamp-1">{card.name}</h3>
                                            <p className="text-sm opacity-90 line-clamp-2">{card.description}</p>
                                        </div>

                                        {/* Hover effect border */}
                                        <div className="absolute inset-0 border-2 border-[#471396]/0 group-hover:border-[#471396]/50 rounded-3xl transition-all duration-300"></div>

                                        {/* Corner accent */}
                                        <div className="absolute top-4 left-4 w-3 h-3 bg-[#471396] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-twinkle-delay"></div>
                                    </div>
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div className="text-center mt-16 relative">
                    {/* Animated background elements */}
                    <div className="absolute -top-8 left-1/4 w-16 h-16 bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-full animate-orbit"></div>
                    <div className="absolute -bottom-8 right-1/4 w-12 h-12 bg-gradient-to-l from-[#471396]/15 to-[#B13BFF]/15 rounded-full animate-float-reverse"></div>

                    <div className="group bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 backdrop-blur-sm rounded-3xl p-8 border border-[#B13BFF]/30 max-w-2xl mx-auto relative overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#B13BFF]/20">
                        {/* Animated background overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B13BFF]/5 to-[#471396]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-mesh-move"></div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B13BFF] transition-colors duration-300">
                                Ready to Create Your Success Story?
                            </h3>
                            <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                                Join thousands of event organizers who trust TickFest for their events.
                            </p>
                            <button className="group/btn bg-gradient-to-r from-[#B13BFF] to-[#471396] hover:from-[#471396] hover:to-[#B13BFF] text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-[#B13BFF]/40 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                {/* Button shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>

                                <span className="relative flex items-center justify-center gap-2">
                                    Start Your Event
                                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform animate-twinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-3 right-3 w-2 h-2 bg-[#B13BFF] rounded-full animate-twinkle"></div>
                        <div className="absolute bottom-3 left-3 w-2 h-2 bg-[#471396] rounded-full animate-twinkle-delay"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}