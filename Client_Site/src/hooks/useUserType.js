import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { getUserTypeFromAPI } from '../utils/userUtils';

export const useUserType = () => {
    const { user } = useContext(AuthContext);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            setError(null);
            getUserTypeFromAPI(user.email)
                .then(type => {
                    setUserType(type);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching user type:', err);
                    setError('Failed to fetch user type');
                    setUserType('user'); // Default fallback
                    setLoading(false);
                });
        } else {
            setUserType(null);
            setLoading(false);
            setError(null);
        }
    }, [user]);

    const isAdmin = userType === 'admin';
    const isOrganizer = userType === 'organizer';
    const isUser = userType === 'user';
    const isAuthenticated = !!user;

    const hasPermission = (requiredType) => {
        if (!isAuthenticated) return false;
        if (requiredType === userType) return true;
        return false;
    };

    const hasAnyPermission = (allowedTypes) => {
        if (!isAuthenticated) return false;
        return allowedTypes.includes(userType);
    };

    return {
        userType,
        loading,
        error,
        isAdmin,
        isOrganizer,
        isUser,
        isAuthenticated,
        hasPermission,
        hasAnyPermission
    };
};
