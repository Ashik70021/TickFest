import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { getUserTypeFromAPI } from '../utils/userUtils';

const PrivateRoute = ({ children, requiredUserType = null, allowedUserTypes = [] }) => {
    const { user, loading } = useContext(AuthContext);
    const [userType, setUserType] = useState(null);
    const [userTypeLoading, setUserTypeLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (user?.email) {
            setUserTypeLoading(true);
            setError(null);
            
            getUserTypeFromAPI(user.email)
                .then(type => {
                    console.log('Fetched user type:', type);
                    setUserType(type);
                    setUserTypeLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user type:', error);
                    setError(error);
                    // More robust fallback logic
                    const fallbackType = getFallbackUserType(user.email);
                    console.log('Using fallback user type:', fallbackType);
                    setUserType(fallbackType);
                    setUserTypeLoading(false);
                });
        } else if (!loading) {
            setUserType(null);
            setUserTypeLoading(false);
        }
    }, [user, loading]);

    // Fallback user type logic
    const getFallbackUserType = (email) => {
        if (email === 'admin@tickfest.com') return 'admin';
        if (email?.includes('organizer') || email?.includes('admin')) return 'organizer';
        return 'user'; // Default to user
    };

    // Show loading spinner while checking authentication and user type
    if (loading || userTypeLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090040] to-[#471396]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                    {error && (
                        <p className="text-white/70 text-sm mt-2">
                            Connection issues detected, using offline mode...
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // If user is not logged in, redirect to sign in
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // If specific user type is required, check if user has permission
    if (requiredUserType && userType !== requiredUserType) {
        console.log(`Access denied: Required ${requiredUserType}, but user is ${userType}`);
        return <Navigate to="/unauthorized" replace />;
    }

    // If multiple user types are allowed, check if user type is in the allowed list
    if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // User is authenticated and has correct permissions
    return children;
};

export default PrivateRoute;
