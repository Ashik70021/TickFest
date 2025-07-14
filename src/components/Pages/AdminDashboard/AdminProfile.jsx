import React, { useState } from "react";

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "admin@tickfest.com",
        role: "Super Administrator",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        joinDate: "January 2023",
        avatar: null
    });

    const [securityData, setSecurityData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactor: true,
        emailNotifications: true,
        smsNotifications: false
    });

    const tabs = [
        { id: "profile", label: "Profile Information", icon: "👤" },
        { id: "security", label: "Security & Privacy", icon: "🔒" },
        { id: "preferences", label: "Preferences", icon: "⚙️" },
        { id: "activity", label: "Activity Log", icon: "📊" },
    ];

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Handle profile update logic
        console.log("Profile updated:", profileData);
    };

    const handleSecurityUpdate = (e) => {
        e.preventDefault();
        // Handle security update logic
        console.log("Security updated:", securityData);
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <div className="relative z-10 p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 bg-gradient-to-r from-[#471396] to-[#B13BFF] rounded-full flex items-center justify-center border-4 border-gray-200 shadow-xl">
                                        <span className="text-4xl text-white font-black">
                                            {profileData.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                        <span className="text-white text-sm">📷</span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-black mb-2 bg-gradient-to-r from-black to-[#471396] bg-clip-text text-transparent">
                                        {profileData.name}
                                    </h1>
                                    <p className="text-gray-700 text-lg font-bold">{profileData.role}</p>
                                    <p className="text-gray-600">{profileData.email}</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <button className="px-6 py-3 bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    💾 Save Changes
                                </button>
                                <button className="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                                    🔄 Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? "bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white shadow-lg"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                    {/* Profile Information Tab */}
                    {activeTab === "profile" && (
                        <div>
                            <h2 className="text-2xl font-bold text-black bg-gradient-to-r from-black to-[#471396] bg-clip-text text-transparent mb-6">
                                👤 Profile Information
                            </h2>
                            
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                        <input
                                            type="text"
                                            value={profileData.role}
                                            disabled
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                                        <input
                                            type="text"
                                            value={profileData.joinDate}
                                            disabled
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-500"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-6">
                                🔒 Security & Privacy
                            </h2>
                            
                            <div className="space-y-8">
                                {/* Password Change */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Change Password</h3>
                                    <form onSubmit={handleSecurityUpdate} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                value={securityData.currentPassword}
                                                onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    value={securityData.newPassword}
                                                    onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    value={securityData.confirmPassword}
                                                    onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                        >
                                            Update Password
                                        </button>
                                    </form>
                                </div>

                                {/* Security Settings */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Security Settings</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-500">Add extra security to your account</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={securityData.twoFactor}
                                                    onChange={(e) => setSecurityData({...securityData, twoFactor: e.target.checked})}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B13BFF]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#471396] peer-checked:to-[#B13BFF]"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                                                <p className="text-sm text-gray-500">Receive security alerts via email</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={securityData.emailNotifications}
                                                    onChange={(e) => setSecurityData({...securityData, emailNotifications: e.target.checked})}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B13BFF]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#471396] peer-checked:to-[#B13BFF]"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === "preferences" && (
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-6">
                                ⚙️ Preferences
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Display Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                                                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800">
                                                    <option>Light Mode</option>
                                                    <option>Dark Mode</option>
                                                    <option>Auto</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                                                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800">
                                                    <option>English</option>
                                                    <option>Spanish</option>
                                                    <option>French</option>
                                                    <option>German</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Frequency</label>
                                                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800">
                                                    <option>Immediately</option>
                                                    <option>Daily Digest</option>
                                                    <option>Weekly Summary</option>
                                                    <option>Monthly Report</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Time Zone</label>
                                                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#B13BFF]/30 transition-all duration-300 text-gray-800">
                                                    <option>UTC-5 (Eastern Time)</option>
                                                    <option>UTC-8 (Pacific Time)</option>
                                                    <option>UTC+0 (Greenwich Mean Time)</option>
                                                    <option>UTC+1 (Central European Time)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activity Log Tab */}
                    {activeTab === "activity" && (
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent mb-6">
                                📊 Activity Log
                            </h2>
                            
                            <div className="space-y-4">
                                {[
                                    { action: "Password Changed", time: "2 hours ago", ip: "192.168.1.1", status: "success" },
                                    { action: "Login from New Device", time: "1 day ago", ip: "192.168.1.5", status: "warning" },
                                    { action: "Profile Updated", time: "3 days ago", ip: "192.168.1.1", status: "success" },
                                    { action: "Failed Login Attempt", time: "1 week ago", ip: "10.0.0.1", status: "error" },
                                    { action: "Two-Factor Authentication Enabled", time: "2 weeks ago", ip: "192.168.1.1", status: "success" },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${
                                                activity.status === 'success' ? 'bg-green-500' :
                                                activity.status === 'warning' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}></div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{activity.action}</h3>
                                                <p className="text-sm text-gray-500">IP: {activity.ip}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
