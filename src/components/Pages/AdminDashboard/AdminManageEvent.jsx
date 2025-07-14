import axios from "axios";
import { useState } from "react";


const AdminManageEvent = () => {
    const [bannerPreview, setBannerPreview] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState([
        { name: '', role: '', bio: '' }
    ]);
    const [ticketTypes, setTicketTypes] = useState([
        { name: '', price: '', currency: '', description: '', remaining: '' }
    ]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerPreview(URL.createObjectURL(file));
            setInputs(values => ({ ...values, banner: file }));
        }
    };

    // Dynamic Artists
    const handleArtistChange = (idx, e) => {
        const { name, value } = e.target;
        setArtists(prev => prev.map((artist, i) => i === idx ? { ...artist, [name]: value } : artist));
    };
    const addArtist = () => setArtists(prev => [...prev, { name: '', role: '', bio: '' }]);
    const removeArtist = (idx) => setArtists(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);

    // Dynamic Ticket Types
    const handleTicketTypeChange = (idx, e) => {
        const { name, value } = e.target;
        setTicketTypes(prev => prev.map((ticket, i) => i === idx ? { ...ticket, [name]: value } : ticket));
    };
    const addTicketType = () => setTicketTypes(prev => [...prev, { name: '', price: '', currency: '', description: '', remaining: '' }]);
    const removeTicketType = (idx) => setTicketTypes(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Functionality not changed for now
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-[#090040] via-[#471396] to-[#B13BFF] p-8 rounded-3xl shadow-2xl">
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-black mb-2">Create New Event</h1>
                                <p className="text-white/90">Fill in the details to create an amazing event experience</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Basic Information Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h2 className="text-xl font-bold text-[#090040]">Basic Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Event Name</label>
                                    <input onChange={handleChange} name="name" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Enter your event name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Event Slug</label>
                                    <input onChange={handleChange} name="slug" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="event-slug" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Date</label>
                                    <input onChange={handleChange} name="date" type="number" min="1" max="31" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="25" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Month</label>
                                    <input onChange={handleChange} name="month" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="DEC" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Year</label>
                                    <input onChange={handleChange} name="year" type="number" min="2024" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="2024" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Start Time</label>
                                    <input onChange={handleChange} name="time" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="7:00 PM" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">End Time</label>
                                    <input onChange={handleChange} name="endTime" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="11:00 PM" required />
                                </div>
                                {/* <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Full Date (ISO)</label>
                                    <input onChange={handleChange} name="fullDate" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="2024-12-25T19:00:00Z" required />
                                </div> */}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Location</label>
                                    <input onChange={handleChange} name="location" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Dhaka, Bangladesh" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Venue</label>
                                    <input onChange={handleChange} name="venue" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="International Convention City Bashundhara (ICCB)" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Venue Address</label>
                                    <input onChange={handleChange} name="venueAddress" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Plot 1/A, Purbachal Express Highway, Bashundhara R/A, Dhaka 1229" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#090040]">Latitude</label>
                                        <input onChange={handleChange} name="latitude" type="number" step="any" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="23.7749" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#090040]">Longitude</label>
                                        <input onChange={handleChange} name="longitude" type="number" step="any" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="90.4226" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Details Section */}
                        <div className="space-y-6 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#471396] to-[#090040] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h2 className="text-xl font-bold text-[#090040]">Event Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Category</label>
                                    <select onChange={handleChange} name="category" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300" required>
                                        <option value="">Select category</option>
                                        <option value="Concert">🎵 Concert</option>
                                        <option value="Conference">💼 Conference</option>
                                        <option value="Sports">⚽ Sports</option>
                                        <option value="Olympiad">🏆 Olympiad</option>
                                        <option value="Workshop">🔧 Workshop</option>
                                        <option value="Festival">🎪 Festival</option>
                                        <option value="Comedy">😂 Comedy</option>
                                        <option value="Theatre">🎭 Theatre</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Featured Event?</label>
                                    <select onChange={handleChange} name="featured" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300" required>
                                        <option value="">Select</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Short Description</label>
                                <textarea onChange={handleChange} name="description" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white resize-none" rows="3" placeholder="Short event description..." required></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Full Description</label>
                                <textarea onChange={handleChange} name="fullDescription" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white resize-none" rows="5" placeholder="Full event details..." required></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Name</label>
                                    <input onChange={handleChange} name="organizerName" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Dhaka Broadcast" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Email</label>
                                    <input onChange={handleChange} name="organizerEmail" type="email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="info@dhakabroadcast.com" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Contact</label>
                                    <input onChange={handleChange} name="organizerContact" type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="+880 1234567890" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Logo</label>
                                    <input onChange={handleBannerChange} name="organizerLogo" type="file" accept="image/*" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" />
                                </div>
                            </div>
                            {/* Artists Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Artists/Performers</label>
                                <div className="space-y-4">
                                    {artists.map((artist, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <div className="space-y-2">
                                                <input onChange={e => handleArtistChange(idx, e)} name="name" value={artist.name} type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Artist Name" />
                                            </div>
                                            <div className="space-y-2">
                                                <input onChange={e => handleArtistChange(idx, e)} name="role" value={artist.role} type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Role (e.g. Main Artist)" />
                                            </div>
                                            <div className="flex gap-2">
                                                <textarea onChange={e => handleArtistChange(idx, e)} name="bio" value={artist.bio} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white resize-none" rows="2" placeholder="Artist Bio"></textarea>
                                                <button type="button" onClick={() => removeArtist(idx)} className="h-10 w-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-xl ml-2" title="Remove Artist">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addArtist} className="mt-2 px-4 py-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300">+ Add Artist</button>
                                </div>
                            </div>
                            {/* Ticket Types Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Ticket Types</label>
                                <div className="space-y-4">
                                    {ticketTypes.map((ticket, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <input onChange={e => handleTicketTypeChange(idx, e)} name="name" value={ticket.name} type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Ticket Name (e.g. General Admission)" />
                                            <input onChange={e => handleTicketTypeChange(idx, e)} name="price" value={ticket.price} type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Price (e.g. 1500)" />
                                            <input onChange={e => handleTicketTypeChange(idx, e)} name="currency" value={ticket.currency} type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Currency (e.g. BDT)" />
                                            <input onChange={e => handleTicketTypeChange(idx, e)} name="remaining" value={ticket.remaining} type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white" placeholder="Remaining Tickets" />
                                            <div className="flex gap-2">
                                                <textarea onChange={e => handleTicketTypeChange(idx, e)} name="description" value={ticket.description} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white resize-none" rows="2" placeholder="Ticket Description"></textarea>
                                                <button type="button" onClick={() => removeTicketType(idx)} className="h-10 w-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-xl ml-2" title="Remove Ticket Type">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addTicketType} className="mt-2 px-4 py-2 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300">+ Add Ticket Type</button>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="space-y-6 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#B13BFF] to-[#471396] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h2 className="text-xl font-bold text-[#090040]">Event Media</h2>
                            </div>
                            {/* Cover Image */}
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-[#090040]">Event Cover Image</label>
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={handleBannerChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                                    <div className="border-2 border-dashed border-[#B13BFF]/30 rounded-xl p-8 text-center hover:border-[#B13BFF] transition-colors duration-300 bg-gradient-to-br from-[#B13BFF]/5 to-[#471396]/5">
                                        <svg className="w-12 h-12 text-[#B13BFF] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-[#471396] font-medium mb-2">Click to upload cover image</p>
                                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                                {bannerPreview && (
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                        <img src={bannerPreview} alt="Cover Preview" className="w-full h-64 object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                            <p className="text-white font-medium p-4">Cover Preview</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Gallery Images */}
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-[#090040]">Gallery Images</label>
                                <input type="file" accept="image/*" multiple className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" />
                                <p className="text-xs text-gray-500">You can select multiple images for the event gallery.</p>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <button
                                    type="button"
                                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative px-8 py-3 bg-gradient-to-r from-[#B13BFF] via-[#471396] to-[#B13BFF] hover:from-[#471396] hover:via-[#B13BFF] hover:to-[#471396] text-white rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#B13BFF]/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                >
                                    {/* Button animation overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    
                                    <span className="relative flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Creating Event...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Create Event
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminManageEvent;
