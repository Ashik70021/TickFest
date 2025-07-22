import { useState, useEffect } from 'react';

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API Base URL from environment with fallback
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Fetch users from database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                console.log('Attempting to fetch users from:', `${API_BASE_URL}/index.php/api/users`);
                
                const response = await fetch(`${API_BASE_URL}/index.php/api/users`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Users API Response:', data);
                
                // Transform the API data to match our component structure
                const transformedUsers = data.map(user => ({
                    id: user.uid || user.User_ID || user.id,
                    name: user.Name || user.displayName || user.name || 'N/A',
                    email: user.Email || user.email || 'N/A',
                    phone: user.Phone || user.phone || 'N/A',
                    role: user.User_Type || user.role || 'user', // Default to 'user'
                    status: user.Status || user.status || 'Active',
                    joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A',
                    lastLogin: user.last_login ? new Date(user.last_login).toLocaleString() : 'N/A',
                    eventsAttended: user.events_attended || 0,
                    totalSpent: user.total_spent || '0 BDT',
                    eventsCreated: user.events_created || 0,
                    totalEarned: user.total_earned || '0 BDT',
                    eventsManaged: user.events_managed || 0,
                    avatar: user.photoURL || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.Name || user.name || 'User')}&background=B13BFF&color=fff`
                }));

                setUsers(transformedUsers);
                setError(null);
            } catch (err) {
                console.error('Error fetching users:', err);
                console.error('API URL being used:', `${API_BASE_URL}/index.php/api/users`);
                console.error('Error details:', {
                    message: err.message,
                    status: err.status,
                    statusText: err.statusText
                });
                
                let errorMessage = 'Failed to fetch users. ';
                
                if (err.name === 'TypeError' && err.message.includes('fetch')) {
                    errorMessage += 'Network connection failed. Please check if your backend server is running.';
                } else if (err.status === 404) {
                    errorMessage += 'API endpoint not found. Please check your backend configuration.';
                } else if (err.status === 500) {
                    errorMessage += 'Server error. Please check your backend logs.';
                } else if (!API_BASE_URL || API_BASE_URL === 'undefined') {
                    errorMessage += 'API URL not configured. Please set VITE_API_URL in your .env file.';
                } else {
                    errorMessage += `${err.message}`;
                }
                
                setError(errorMessage);
                
                // For development: Add some mock data as fallback
                const mockUsers = [
                    {
                        id: 'mock-1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+1234567890',
                        role: 'user',
                        status: 'Active',
                        joinDate: new Date().toLocaleDateString(),
                        lastLogin: 'Never',
                        eventsAttended: 3,
                        totalSpent: '450 BDT',
                        eventsCreated: 0,
                        totalEarned: '0 BDT',
                        eventsManaged: 0,
                        avatar: 'https://ui-avatars.com/api/?name=John%20Doe&background=B13BFF&color=fff'
                    },
                    {
                        id: 'mock-2',
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        phone: '+1234567891',
                        role: 'organizer',
                        status: 'Active',
                        joinDate: new Date().toLocaleDateString(),
                        lastLogin: '2 hours ago',
                        eventsAttended: 1,
                        totalSpent: '150 BDT',
                        eventsCreated: 5,
                        totalEarned: '2500 BDT',
                        eventsManaged: 0,
                        avatar: 'https://ui-avatars.com/api/?name=Jane%20Smith&background=B13BFF&color=fff'
                    },
                    {
                        id: 'mock-3',
                        name: 'Admin User',
                        email: 'admin@example.com',
                        phone: '+1234567892',
                        role: 'admin',
                        status: 'Active',
                        joinDate: new Date().toLocaleDateString(),
                        lastLogin: '1 hour ago',
                        eventsAttended: 0,
                        totalSpent: '0 BDT',
                        eventsCreated: 0,
                        totalEarned: '0 BDT',
                        eventsManaged: 15,
                        avatar: 'https://ui-avatars.com/api/?name=Admin%20User&background=B13BFF&color=fff'
                    }
                ];
                
                console.log('Using mock data due to API error');
                setUsers(mockUsers);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [API_BASE_URL]);

    // Filter and search logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.phone.includes(searchTerm);
        const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
        const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Stats calculation
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const organizers = users.filter(u => u.role === 'organizer').length;
    const customers = users.filter(u => u.role === 'user').length;

    // Handle user role update
    const handleRoleUpdate = async (userId, newRole) => {
        try {
            console.log('=== Role Update Debug Info ===');
            console.log('User ID:', userId);
            console.log('New Role:', newRole);
            console.log('API URL:', `${API_BASE_URL}/index.php/api/users/update-role`);
            
            const requestBody = {
                uid: userId,
                User_Type: newRole
            };
            console.log('Request body:', requestBody);
            
            const response = await fetch(`${API_BASE_URL}/index.php/api/users/update-role`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            // Read response text first to debug
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError);
                throw new Error(`Server returned invalid JSON: ${responseText}`);
            }

            console.log('Parsed response data:', data);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || responseText}`);
            }

            // Check for successful response patterns
            if (data.success === true || 
                data.status === 'success' || 
                (data.message && data.message.toLowerCase().includes('success')) ||
                response.status === 200) {
                
                console.log('✅ Role update successful');
                
                // Update local state
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
                alert('User role updated successfully!');
            } else {
                console.log('❌ Role update failed based on response data');
                throw new Error(data.message || data.error || 'Failed to update role - unexpected response format');
            }
        } catch (err) {
            console.error('=== Role Update Error ===');
            console.error('Error type:', err.constructor.name);
            console.error('Error message:', err.message);
            console.error('Full error:', err);
            
            let userMessage = 'Failed to update user role';
            if (err.message.includes('NetworkError') || err.message.includes('fetch')) {
                userMessage += ': Network connection failed. Please check your server.';
            } else if (err.message.includes('HTTP error')) {
                userMessage += `: Server error (${err.message})`;
            } else if (err.message.includes('invalid JSON')) {
                userMessage += ': Server returned invalid response format.';
            } else {
                userMessage += `: ${err.message}`;
            }
            
            alert(userMessage + ' Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#471396] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="text-center">
                        <div className="text-red-500 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Users</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-left text-sm">
                            <p className="text-yellow-800 font-medium mb-1">Debug Info:</p>
                            <p className="text-yellow-700">API URL: {API_BASE_URL || 'Not configured'}/index.php/api/users</p>
                            <p className="text-yellow-700">Environment: {import.meta.env.MODE}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <button 
                                onClick={() => window.location.reload()} 
                                className="bg-[#471396] text-white px-4 py-2 rounded-lg hover:bg-[#B13BFF] transition-colors"
                            >
                                Retry
                            </button>
                            <button 
                                onClick={() => {
                                    setError(null);
                                    setLoading(false);
                                }} 
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Continue with Mock Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#090040]/5 to-[#471396]/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#471396]/5 to-[#B13BFF]/5 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-[#B13BFF]/3 to-[#090040]/3 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black text-gray-800 mb-2 bg-gradient-to-r from-[#090040] to-[#471396] bg-clip-text text-transparent">
                                User Management
                            </h1>
                            <p className="text-gray-600">Manage and monitor all users</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                            <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New User
                                </span>
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                                Export Users
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Users</p>
                                    <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#B13BFF]/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Active Users</p>
                                    <p className="text-3xl font-bold text-gray-800">{activeUsers}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Organizers</p>
                                    <p className="text-3xl font-bold text-gray-800">{organizers}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#471396]/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#471396]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:bg-white/90 transition-all duration-300 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Users</p>
                                    <p className="text-3xl font-bold text-gray-800">{customers}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 mb-8 shadow-lg">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                {/* Role Filter */}
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] transition-all duration-300"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="user">User</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="admin">Admin</option>
                                </select>

                                {/* Status Filter */}
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] transition-all duration-300"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {/* Sort By */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] transition-all duration-300"
                                >
                                    <option value="name">Sort by Name</option>
                                    <option value="joinDate">Sort by Join Date</option>
                                    <option value="lastLogin">Sort by Last Login</option>
                                    <option value="role">Sort by Role</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-[#090040]/10 to-[#471396]/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stats</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" src={user.avatar} alt={user.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div>{user.email}</div>
                                            <div className="text-gray-500">{user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B13BFF] ${
                                                        user.role === 'admin' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                        user.role === 'organizer' ? 'bg-[#471396]/20 text-[#B13BFF] border-[#B13BFF]/30' :
                                                        'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                    }`}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="organizer">Organizer</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                                <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div>Joined: {user.joinDate}</div>
                                            <div className="text-gray-500">Last: {user.lastLogin}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {user.role === 'organizer' ? (
                                                <div>
                                                    <div>Created: {user.eventsCreated} events</div>
                                                    <div className="text-gray-500">Earned: {user.totalEarned}</div>
                                                </div>
                                            ) : user.role === 'admin' ? (
                                                <div>
                                                    <div>Managed: {user.eventsManaged} events</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div>Attended: {user.eventsAttended} events</div>
                                                    <div className="text-gray-500">Spent: {user.totalSpent}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="bg-[#471396] hover:bg-[#B13BFF] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-blue-500/30">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-red-500/30">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* No results message */}
                {filteredUsers.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No users found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria or add a new user.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
