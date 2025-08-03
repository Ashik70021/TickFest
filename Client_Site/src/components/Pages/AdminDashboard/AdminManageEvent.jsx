import axios from "axios";
import { useState } from "react";


const AdminManageEvent = () => {
    const [bannerPreview, setBannerPreview] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [artists, setArtists] = useState([
        { name: '', role: '', bio: '' }
    ]);
    const [ticketTypes, setTicketTypes] = useState([
        { name: '', price: '', currency: 'BDT', description: '', remaining: '' }
    ]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [organizerLogo, setOrganizerLogo] = useState(null);
    const [organizerLogoPreview, setOrganizerLogoPreview] = useState(null);
    
    // API Base URL from environment
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerPreview(URL.createObjectURL(file));
            setInputs(values => ({ ...values, banner: file }));
        }
    };

    // Gallery images handler
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Limit to 3 images
            const limitedFiles = files.slice(0, 3);
            setGalleryImages(limitedFiles);
            
            // Create previews
            const previews = limitedFiles.map(file => URL.createObjectURL(file));
            setGalleryPreviews(previews);
        }
    };

    // Organizer logo handler
    const handleOrganizerLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOrganizerLogo(file);
            setOrganizerLogoPreview(URL.createObjectURL(file));
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
        setSuccessMessage('');
        setErrorMessage('');
        
        try {
            // Validate required fields
            if (!inputs.name || !inputs.slug || !inputs.date || !inputs.month || !inputs.year) {
                setErrorMessage('Please fill in all required fields (Name, Slug, Date, Month, Year)');
                setIsLoading(false);
                return;
            }

            // Validate at least one artist
            const validArtists = artists.filter(artist => artist.name.trim() !== '');
            if (validArtists.length === 0) {
                setErrorMessage('Please add at least one artist/performer');
                setIsLoading(false);
                return;
            }

            // Validate at least one ticket type
            const validTicketTypes = ticketTypes.filter(ticket => ticket.name.trim() !== '' && ticket.price > 0);
            if (validTicketTypes.length === 0) {
                setErrorMessage('Please add at least one valid ticket type with price');
                setIsLoading(false);
                return;
            }

            // Create FormData for sending files along with event data
            const formData = new FormData();

            // Add basic event information
            formData.append('name', inputs.name);
            formData.append('slug', inputs.slug);
            formData.append('date', parseInt(inputs.date));
            formData.append('month', parseInt(inputs.month));
            formData.append('year', parseInt(inputs.year));
            formData.append('time', inputs.time || '');
            formData.append('endTime', inputs.endTime || '');
            formData.append('location', inputs.location || '');
            formData.append('venue', inputs.venue || '');
            formData.append('venueAddress', inputs.venueAddress || '');
            
            // Add coordinates
            formData.append('latitude', parseFloat(inputs.latitude) || 0);
            formData.append('longitude', parseFloat(inputs.longitude) || 0);
            
            // Add event details
            formData.append('category', inputs.category || '');
            formData.append('description', inputs.description || '');
            formData.append('fullDescription', inputs.fullDescription || '');
            formData.append('featured', inputs.featured === true ? 1 : 0);
            
            // Add organizer information
            formData.append('organizerName', inputs.organizerName || '');
            formData.append('organizerEmail', inputs.organizerEmail || '');
            formData.append('organizerContact', inputs.organizerContact || '');
            
            // Add files
            if (inputs.banner && inputs.banner instanceof File) {
                formData.append('coverImage', inputs.banner);
            }
            
            if (organizerLogo && organizerLogo instanceof File) {
                formData.append('organizerLogo', organizerLogo);
            }
            
            // Add gallery images
            if (galleryImages.length > 0) {
                galleryImages.forEach((image, index) => {
                    formData.append(`galleryImage${index}`, image);
                });
                formData.append('galleryCount', galleryImages.length);
            }
            
            // Add artists and ticket types as JSON strings
            formData.append('artists', JSON.stringify(validArtists));
            formData.append('ticketTypes', JSON.stringify(validTicketTypes.map(ticket => ({
                ...ticket,
                price: parseFloat(ticket.price) || 0,
                remaining: parseInt(ticket.remaining) || 0
            }))));

            console.log('Sending event data with files...');

            const response = await axios.post(`${API_BASE_URL}/api.php/api/events`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('API Response:', response.data);

            if ((response.status === 200 || response.status === 201) && response.data.success) {
                setSuccessMessage(`Event created successfully! Event ID: ${response.data.event_id}`);
                
                // Reset form
                setInputs({});
                setBannerPreview(null);
                setGalleryImages([]);
                setGalleryPreviews([]);
                setOrganizerLogo(null);
                setOrganizerLogoPreview(null);
                setArtists([{ name: '', role: '', bio: '' }]);
                setTicketTypes([{ name: '', price: '', currency: 'BDT', description: '', remaining: '' }]);
                
                // Clear file inputs
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => input.value = '');
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 5000);
            } else {
                setErrorMessage('Error creating event: ' + (response.data.message || response.data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Full error details:', error);
            console.error('Error response:', error.response?.data);
            
            let errorMessage = 'Error creating event: ';
            if (error.response?.data?.message) {
                errorMessage += error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage += error.response.data.error;
            } else if (error.response?.data) {
                errorMessage += JSON.stringify(error.response.data);
            } else {
                errorMessage += error.message;
            }
            
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
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
                    {/* Success Message */}
                    {successMessage && (
                        <div className="mx-8 mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-green-800 font-medium">{successMessage}</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mx-8 mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <span className="text-red-800 font-medium">{errorMessage}</span>
                            </div>
                        </div>
                    )}

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
                                    <input onChange={handleChange} name="name" type="text" value={inputs.name || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Enter your event name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Event Slug</label>
                                    <input onChange={handleChange} name="slug" type="text" value={inputs.slug || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="event-slug" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Date</label>
                                    <input onChange={handleChange} name="date" type="number" min="1" max="31" value={inputs.date || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="25" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Month</label>
                                    <select onChange={handleChange} name="month" value={inputs.month || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" required>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Year</label>
                                    <input onChange={handleChange} name="year" type="number" min="2024" value={inputs.year || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="2024" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Start Time</label>
                                    <input onChange={handleChange} name="time" type="text" value={inputs.time || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="7:00 PM" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">End Time</label>
                                    <input onChange={handleChange} name="endTime" type="text" value={inputs.endTime || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="11:00 PM" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Featured Event</label>
                                    <div className="relative">
                                        <input 
                                            onChange={handleChange} 
                                            name="featured" 
                                            type="checkbox" 
                                            id="featured-checkbox"
                                            className="sr-only peer" 
                                        />
                                        <label 
                                            htmlFor="featured-checkbox" 
                                            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl cursor-pointer hover:from-[#B13BFF]/5 hover:to-[#471396]/5 hover:border-[#B13BFF]/30 peer-checked:from-[#B13BFF]/10 peer-checked:to-[#471396]/10 peer-checked:border-[#B13BFF] transition-all duration-300 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-lg peer-checked:border-[#B13BFF] peer-checked:bg-gradient-to-r peer-checked:from-[#B13BFF] peer-checked:to-[#471396] transition-all duration-300 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="text-sm font-semibold text-[#090040] group-hover:text-[#471396] transition-colors duration-300 block">
                                                        Mark as Featured
                                                    </span>
                                                    <p className="text-xs text-gray-500 leading-tight">
                                                        Show on homepage
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-gradient-to-r from-[#B13BFF]/20 to-[#471396]/20 rounded-full flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300">
                                                    <svg className="w-3 h-3 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Location</label>
                                    <input onChange={handleChange} name="location" type="text" value={inputs.location || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Dhaka, Bangladesh" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Venue</label>
                                    <input onChange={handleChange} name="venue" type="text" value={inputs.venue || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="International Convention City Bashundhara (ICCB)" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Venue Address</label>
                                    <input onChange={handleChange} name="venueAddress" type="text" value={inputs.venueAddress || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Plot 1/A, Purbachal Express Highway, Bashundhara R/A, Dhaka 1229" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#090040]">Latitude</label>
                                        <input onChange={handleChange} name="latitude" type="number" step="any" value={inputs.latitude || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="23.7749" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#090040]">Longitude</label>
                                        <input onChange={handleChange} name="longitude" type="number" step="any" value={inputs.longitude || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="90.4226" required />
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
                                    <select onChange={handleChange} name="category" value={inputs.category || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300" required>
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
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Short Description</label>
                                <textarea onChange={handleChange} name="description" value={inputs.description || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white resize-none" rows="3" placeholder="Short event description..." required></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#090040]">Full Description</label>
                                <textarea onChange={handleChange} name="fullDescription" value={inputs.fullDescription || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white resize-none" rows="5" placeholder="Full event details..." required></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Name</label>
                                    <input onChange={handleChange} name="organizerName" type="text" value={inputs.organizerName || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="Dhaka Broadcast" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Email</label>
                                    <input onChange={handleChange} name="organizerEmail" type="email" value={inputs.organizerEmail || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="info@dhakabroadcast.com" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Contact</label>
                                    <input onChange={handleChange} name="organizerContact" type="text" value={inputs.organizerContact || ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" placeholder="+880 1234567890" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#090040]">Organizer Logo</label>
                                    <input onChange={handleOrganizerLogoChange} name="organizerLogo" type="file" accept="image/*" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" />
                                </div>
                            </div>
                            
                            {/* Organizer Logo Preview */}
                            {organizerLogoPreview && (
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <img src={organizerLogoPreview} alt="Organizer Logo Preview" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Organizer Logo Preview</p>
                                        <p className="text-xs text-gray-500">Logo uploaded successfully</p>
                                    </div>
                                </div>
                            )}
                            
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
                                                <textarea onChange={e => handleArtistChange(idx, e)} name="bio" value={artist.bio} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white resize-none" rows="1" placeholder="Artist Bio"></textarea>
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
                                                <textarea onChange={e => handleTicketTypeChange(idx, e)} name="description" value={ticket.description} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-white resize-none" rows="1" placeholder="Ticket Description"></textarea>
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
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    multiple 
                                    onChange={handleGalleryChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B13BFF]/50 focus:border-[#B13BFF] transition-all duration-300 bg-gray-50 hover:bg-white" 
                                />
                                <p className="text-xs text-gray-500">You can select multiple images for the event gallery (max 3 images).</p>
                                
                                {/* Gallery Preview */}
                                {galleryPreviews.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {galleryPreviews.map((preview, idx) => (
                                            <div key={idx} className="relative rounded-xl overflow-hidden shadow-lg">
                                                <img src={preview} alt={`Gallery Preview ${idx + 1}`} className="w-full h-32 object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                                                    <p className="text-white text-sm font-medium p-2">Gallery {idx + 1}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
