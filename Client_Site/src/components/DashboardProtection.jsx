import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { getUserTypeFromAPI } from '../utils/userUtils';

const DashboardProtection = ({ children, requiredUserType, allowedUserTypes = [] }) => {
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
                    setUserType('user');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg">Verifying permissions...</p>
                </div>
            </div>
        );
    }

    // Check if user has required permission
    const hasPermission = () => {
        if (requiredUserType && userType !== requiredUserType) {
            return false;
        }
        if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
            return false;
        }
        return true;
    };

    if (!hasPermission()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full text-center p-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-red-500 text-6xl mb-4">🚫</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
                        <p className="text-gray-600 mb-6">
                            You don&apos;t have the required permissions to access this section.
                        </p>
                        <p className="text-sm text-gray-500">
                            Current role: <span className="font-semibold capitalize">{userType}</span>
                            {requiredUserType && (
                                <><br />Required role: <span className="font-semibold capitalize">{requiredUserType}</span></>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default DashboardProtection;
