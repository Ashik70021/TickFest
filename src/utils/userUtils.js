// Utility function to get user type from API
export const getUserTypeFromAPI = async (userEmail) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/index.php/api/users/get-user-type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
        });

        if (response.ok) {
            const data = await response.json();
            return data.User_Type || 'user'; // Default to 'user' if not found
        }
    } catch (error) {
        console.error('Error fetching user type:', error);
    }
    
    // Fallback logic for development
    if (userEmail === 'admin@tickfest.com') return 'admin';
    if (userEmail?.includes('organizer')) return 'organizer';
    return 'user';
};

// Function to get dashboard route based on user type
export const getDashboardRoute = (userType) => {
    switch (userType) {
        case 'admin':
            return '/admindashboard';
        case 'organizer':
            return '/organizerdashboard';
        default:
            return '/profile';
    }
};
