// Cache for user types to avoid repeated API calls
const userTypeCache = new Map();

// Utility function to get user type from API
export const getUserTypeFromAPI = async (userEmail) => {
    // Check cache first
    const cacheKey = userEmail;
    if (userTypeCache.has(cacheKey)) {
        console.log('Using cached user type for:', userEmail);
        return userTypeCache.get(cacheKey);
    }

    // Check localStorage for persistence across page reloads
    const cachedType = localStorage.getItem(`userType_${userEmail}`);
    if (cachedType) {
        console.log('Using localStorage cached user type for:', userEmail);
        userTypeCache.set(cacheKey, cachedType);
        return cachedType;
    }

    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        
        if (!apiUrl) {
            console.warn('VITE_API_URL not configured, using fallback logic');
            throw new Error('API URL not configured');
        }

        const response = await fetch(`${apiUrl}/index.php/api/users/get-user-type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('API response for user type:', data);
            const userType = data.User_Type || data.user_type || 'user';
            
            // Cache the result
            userTypeCache.set(cacheKey, userType);
            localStorage.setItem(`userType_${userEmail}`, userType);
            
            return userType;
        } else {
            console.warn(`API returned status ${response.status}, using fallback`);
            throw new Error(`API returned status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user type from API:', error);
        throw error; // Let the calling function handle the fallback
    }
};

// Function to clear user type cache (useful for logout)
export const clearUserTypeCache = (userEmail) => {
    if (userEmail) {
        userTypeCache.delete(userEmail);
        localStorage.removeItem(`userType_${userEmail}`);
    } else {
        // Clear all cache
        userTypeCache.clear();
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('userType_')) {
                localStorage.removeItem(key);
            }
        });
    }
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
