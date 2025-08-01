import { useState, useEffect } from 'react';

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    // API Base URL from environment with fallback
    const API_BASE_URL = import.meta.env.VITE_API_URL;

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
                    role: user.User_Type || user.userType || user.role || 'user', // Default to 'user'
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
                setUsers([]);  // Set empty array instead of mock data
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

    // Handle user edit
    const handleEditUser = (user) => {
        setEditingUser({ ...user });
        setShowEditModal(true);
    };

    // Handle user view
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    // Handle user delete
    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    // Save edited user
    const handleSaveEdit = async () => {
        try {
            console.log('=== User Update Debug Info ===');
            console.log('Editing User:', editingUser);
            
            const requestBody = {
                Name: editingUser.name,
                Email: editingUser.email,
                Phone: editingUser.phone,
                User_Type: editingUser.role,
                Status: editingUser.status
            };
            console.log('Request body:', requestBody);
            
            const response = await fetch(`${API_BASE_URL}/user_api.php/user/${editingUser.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError);
                throw new Error(`Server returned invalid JSON: ${responseText}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || responseText}`);
            }

            if (data.success === true || data.status === 'success' || response.status === 200) {
                console.log('✅ User update successful');
                
                // Update local state
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === editingUser.id ? editingUser : user
                    )
                );
                
                setShowEditModal(false);
                setEditingUser(null);
                alert('User updated successfully!');
            } else {
                throw new Error(data.message || data.error || 'Failed to update user');
            }
        } catch (err) {
            console.error('Error updating user:', err);
            alert(`Failed to update user: ${err.message}`);
        }
    };

    // Confirm delete user
    const handleConfirmDelete = async () => {
        try {
            console.log('=== User Delete Debug Info ===');
            console.log('Deleting User:', selectedUser);
            
            const response = await fetch(`${API_BASE_URL}/user_api.php/user/${selectedUser.id}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError);
                throw new Error(`Server returned invalid JSON: ${responseText}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${data?.message || responseText}`);
            }

            if (data.success === true || data.status === 'success' || response.status === 200) {
                console.log('✅ User delete successful');
                
                // Remove user from local state
                setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
                
                setShowDeleteModal(false);
                setSelectedUser(null);
                alert('User deleted successfully!');
            } else {
                throw new Error(data.message || data.error || 'Failed to delete user');
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            alert(`Failed to delete user: ${err.message}`);
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
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => window.location.reload()} 
                                className="bg-[#471396] text-white px-4 py-2 rounded-lg hover:bg-[#B13BFF] transition-colors"
                            >
                                Retry
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
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'Admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                user.role === 'Organizer' ? 'bg-[#471396]/20 text-[#B13BFF] border border-[#B13BFF]/30' :
                                                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                                {user.role}
                                            </span>
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
                                                <button 
                                                    onClick={() => handleEditUser(user)}
                                                    className="bg-[#471396] hover:bg-[#B13BFF] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                                                    title="Edit User"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleViewUser(user)}
                                                    className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-blue-500/30"
                                                    title="View User Details"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-red-500/30"
                                                    title="Delete User"
                                                >
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

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editingUser?.name || ''}
                                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editingUser?.email || ''}
                                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={editingUser?.phone || ''}
                                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                <select
                                    value={editingUser?.status || ''}
                                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">User Type</label>
                                <select
                                    value={editingUser?.role || ''}
                                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="user">User</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View User Modal */}
            {showViewModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">User Details</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Name</label>
                                <p className="text-white">{selectedUser.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Email</label>
                                <p className="text-white">{selectedUser.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">User Type</label>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    selectedUser.user_type === 'admin' 
                                        ? 'bg-red-100 text-red-800' 
                                        : selectedUser.user_type === 'organizer'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {selectedUser.user_type}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Created At</label>
                                <p className="text-white">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete user <strong>{selectedUser.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
