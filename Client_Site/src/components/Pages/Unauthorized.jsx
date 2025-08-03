import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const Unauthorized = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090040] to-[#471396] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Background decoration */}
                <div className="relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-32 bg-gradient-to-br from-[#B13BFF]/20 to-[#471396]/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                        {/* Warning Icon */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <FaExclamationTriangle className="text-white text-3xl" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-[#090040] mb-4">
                            Access Denied
                        </h1>

                        {/* Message */}
                        <p className="text-gray-700 text-lg mb-2">
                            You don&apos;t have permission to access this page.
                        </p>
                        <p className="text-gray-600 text-sm mb-8">
                            Please contact your administrator if you believe this is an error.
                        </p>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <Link 
                                to="/" 
                                className="w-full group relative bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-[#B13BFF]/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center justify-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#471396] to-[#B13BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <FaHome className="text-lg relative z-10" />
                                <span className="relative z-10">Go to Home</span>
                            </Link>

                            <button 
                                onClick={() => window.history.back()}
                                className="w-full group relative bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-gray-600/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center justify-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <FaArrowLeft className="text-lg relative z-10" />
                                <span className="relative z-10">Go Back</span>
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Error Code: 403 - Forbidden Access
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
