import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { getUserTypeFromAPI } from '../utils/userUtils';

const PrivateRoute = ({ children, requiredUserType = null, allowedUserTypes = [] }) => {
    const { user, loading } = useContext(AuthContext);
    const [userType, setUserType] = useState(null);
    const [userTypeLoading, setUserTypeLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (user?.email) {
            setUserTypeLoading(true);
            getUserTypeFromAPI(user.email)
                .then(type => {
                    setUserType(type);
                    setUserTypeLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user type:', error);
                    setUserType('user'); // Default fallback
                    setUserTypeLoading(false);
                });
        } else {
            setUserType(null);
            setUserTypeLoading(false);
        }
    }, [user]);

    // Show loading spinner while checking authentication and user type
    if (loading || userTypeLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090040] to-[#471396]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
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
