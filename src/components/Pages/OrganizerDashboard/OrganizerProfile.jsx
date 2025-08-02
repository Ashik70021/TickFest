import { useState, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const OrganizerProfile = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        phone: '+880 1234567890',
        organization: 'Event Organizers BD',
        bio: 'Professional event organizer with 5+ years of experience.',
        website: 'https://eventorganizers.bd',
        address: 'Dhaka, Bangladesh'
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleProfileSave = () => {
        // Handle profile save
        alert('Profile updated successfully!');
    };

    const handleNotificationSave = () => {
        // Handle notification settings save
        alert('Notification settings updated successfully!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 rounded-3xl p-6 border border-[#B13BFF]/20">
                <h1 className="text-3xl font-black bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-2">
                    Settings ⚙️
                </h1>
                <p className="text-gray-600">
                    Manage your profile and account preferences
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            activeTab === 'profile'
                                ? 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        👤 Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            activeTab === 'notifications'
                                ? 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        🔔 Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            activeTab === 'security'
                                ? 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        🔒 Security
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={profileData.displayName}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={profileData.organization}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your organization name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={profileData.website}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your website URL"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleProfileChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                            <textarea
                                name="bio"
                                value={profileData.bio}
                                onChange={handleProfileChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <button
                            onClick={handleProfileSave}
                            className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            💾 Save Profile
                        </button>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="emailNotifications"
                                        checked={notifications.emailNotifications}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B13BFF]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <h4 className="font-semibold text-gray-800">SMS Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="smsNotifications"
                                        checked={notifications.smsNotifications}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B13BFF]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Push Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive browser push notifications</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="pushNotifications"
                                        checked={notifications.pushNotifications}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B13BFF]"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Marketing Emails</h4>
                                    <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="marketingEmails"
                                        checked={notifications.marketingEmails}
                                        onChange={handleNotificationChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B13BFF]"></div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handleNotificationSave}
                            className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            💾 Save Preferences
                        </button>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h3>
                        
                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 rounded-2xl">
                                <h4 className="font-semibold text-gray-800 mb-3">Change Password</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300">
                                        🔑 Update Password
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 bg-red-50 rounded-2xl">
                                <h4 className="font-semibold text-red-800 mb-3">Danger Zone</h4>
                                <p className="text-sm text-red-600 mb-4">
                                    These actions are irreversible. Please proceed with caution.
                                </p>
                                <div className="space-y-3">
                                    <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300">
                                        🗑️ Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrganizerProfile;
