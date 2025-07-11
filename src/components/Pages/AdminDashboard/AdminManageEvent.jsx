import { useState } from "react";
import axios from "axios";

const AdminManageEvent = () => {
    const [bannerPreview, setBannerPreview] = useState(null);
    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
                setInputs(values => ({...values, banner: file}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            Object.keys(inputs).forEach(key => {
                formData.append(key, inputs[key]);
            });

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/event/save`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.status === 1) {
                setInputs({});
                setBannerPreview(null);
                alert('Event created successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to create event');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating the event');
            console.error('Error creating event:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-[#242565] mb-4">Create New Event</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Name */}
                <div>
                    <label className="block mb-1 font-semibold">Event Name</label>
                    <input
                        onChange={handleChange}
                        name="event_name"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                        placeholder="Enter event name"
                        required
                    />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Date</label>
                        <input
                            onChange={handleChange}
                            name="date"
                            type="date"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Time</label>
                        <input
                            onChange={handleChange}
                            name="time"
                            type="time"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                            required
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 font-semibold">Location</label>
                    <input
                        onChange={handleChange}
                        name="location"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                        placeholder="Venue or city"
                        required
                    />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Category</label>
                        <select onChange={handleChange} name="catagory"  className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-[#f5167e]/50" required>
                            <option>Select category</option>
                            <option value="concert">Concert</option>
                            <option value="conference">Conference</option>
                            <option value="sports">Sports</option>
                            <option value="olympiad">Olympiad</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Status</label>
                        <select onChange={handleChange} name="status" className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-[#f5167e]/50" required>
                            <option>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Ticket Price & Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Ticket Price (৳)</label>
                        <input
                            onChange={handleChange}
                            name="price"
                            type="number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Available Tickets</label>
                        <input
                            onChange={handleChange}
                            name="quantity"
                            type="number"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                            required
                        />
                    </div>
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="block mb-1 font-semibold">Event Banner</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-[#f5167e]/80 file:text-white hover:file:bg-[#f5167e]"
                        required
                    />
                    {bannerPreview && (
                        <img src={bannerPreview} alt="Banner Preview" className="mt-4 w-full max-h-64 object-cover rounded shadow" />
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-semibold">Event Description</label>
                    <textarea
                        onChange={handleChange}
                        name="description"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f5167e]/50"
                        rows="4"
                        placeholder="Add a brief description of the event"
                        required
                    ></textarea>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-[#f5167e] text-white px-6 py-3 rounded-md font-semibold transition
                        ${isLoading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[#e40d6e]'
                        }`}
                >
                    {isLoading ? 'Creating Event...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default AdminManageEvent;
