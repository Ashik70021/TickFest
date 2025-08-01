import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { getUserTypeFromAPI } from '../utils/userUtils';

const UserTypeRedirect = () => {
    const { user } = useContext(AuthContext);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            getUserTypeFromAPI(user.email)
                .then(type => {
                    setUserType(type);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user type:', error);
                    setUserType('user'); // Default fallback
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090040] to-[#471396]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
                    <p className="text-white text-lg">Redirecting...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Redirect based on user type
    switch (userType) {
        case 'admin':
            return <Navigate to="/admindashboard/adminhome" replace />;
        case 'organizer':
            return <Navigate to="/organizerdashboard/home" replace />;
        case 'user':
        default:
            return <Navigate to="/profile" replace />;
    }
};

export default UserTypeRedirect;
