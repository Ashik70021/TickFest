import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import axios from 'axios';

const Signin = () => {
    const { signIn, setUser, googleSignIn, facebookSignIn, updateUserProfile } = useContext(AuthContext);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isFacebookLoading, setIsFacebookLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";

    // Function to store user data from social login in database
    const storeUserInDatabase = async (userData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/index.php/api/users/social-login`,
                {
                    uid: userData.uid,
                    name: userData.name || userData.displayName || 'User',
                    email: userData.email,
                    photoURL: userData.photoURL || null,
                    provider: userData.provider || 'google',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('User stored/updated in database:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error storing user in database:', error);
            // Don't throw error - user can still proceed even if DB storage fails
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        setIsEmailLoading(true);
        setError(null);

        try {
            const result = await signIn(email, password);
            setUser(result.user);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
            console.error('Login error:', err);
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError(null);

        try {
            const result = await googleSignIn();
            setUser(result.user);

            // Store user data in database
            const userData = {
                uid: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                provider: 'google'
            };

            await storeUserInDatabase(userData);

            // Update Firebase profile with photo URL if available
            if (result.user.photoURL && updateUserProfile) {
                try {
                    await updateUserProfile(result.user.displayName, result.user.photoURL);
                } catch (profileError) {
                    console.error('Error updating user profile:', profileError);
                    // Don't throw error - user can still proceed
                }
            }

            navigate(from, { replace: true });

        } catch (err) {
            setError(err.message || 'Google sign-in failed');
            console.error('Google sign-in error:', err);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        if (!facebookSignIn) {
            setError('Facebook sign-in is not available');
            return;
        }

        setIsFacebookLoading(true);
        setError(null);

        try {
            const result = await facebookSignIn();
            setUser(result.user);

            // Store user data in database
            const userData = {
                uid: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                provider: 'facebook'
            };

            await storeUserInDatabase(userData);

            // Update Firebase profile with photo URL if available
            if (result.user.photoURL && updateUserProfile) {
                try {
                    await updateUserProfile(result.user.displayName, result.user.photoURL);
                } catch (profileError) {
                    console.error('Error updating user profile:', profileError);
                    // Don't throw error - user can still proceed
                }
            }

            navigate(from, { replace: true });

        } catch (err) {
            setError(err.message || 'Facebook sign-in failed');
            console.error('Facebook sign-in error:', err);
        } finally {
            setIsFacebookLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] animate-gradient-xy py-8 px-4 sm:px-6 lg:px-8">
            {/* Animated SVG background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="90" fill="#B13BFF" fillOpacity="0.18">
                  <animate attributeName="cy" values="200;300;200" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="1200" cy="700" r="60" fill="#471396" fillOpacity="0.15">
                  <animate attributeName="cy" values="700;600;700" dur="10s" repeatCount="indefinite" />
                </circle>
                <circle cx="900" cy="150" r="40" fill="#f5167e" fillOpacity="0.13">
                  <animate attributeName="cx" values="900;1000;900" dur="7s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="800" r="30" fill="#fff" fillOpacity="0.10">
                  <animate attributeName="cy" values="800;700;800" dur="9s" repeatCount="indefinite" />
                </circle>
                <path d="M0,600 Q720,300 1440,600" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" fill="none">
                  <animate attributeName="d" values="M0,600 Q720,300 1440,600;M0,620 Q720,320 1440,620;M0,600 Q720,300 1440,600" dur="12s" repeatCount="indefinite" />
                </path>
                <circle cx="1100" cy="300" r="8" fill="#fff" fillOpacity="0.18">
                  <animate attributeName="cy" values="300;350;300" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="500" r="6" fill="#fff" fillOpacity="0.18">
                  <animate attributeName="cy" values="500;550;500" dur="5s" repeatCount="indefinite" />
                </circle>
            </svg>
            <div className="max-w-6xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden relative z-10">
                {/* Left Column - Social Login */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-[#090040] to-[#471396] p-6 sm:p-8 md:p-12 text-white flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">Welcome to TickFest</h2>
                    <p className="mb-6 sm:mb-8 text-gray-300 text-sm sm:text-base">Get access to exclusive features by logging in with your social accounts</p>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/90 text-white rounded-lg shadow-lg">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-3 sm:space-y-4">
                        <button 
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading || isEmailLoading || isFacebookLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-[#090040] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGoogleLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <span className="w-6 h-6 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.227s2.75-6.227 6.125-6.227c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.023 9.547-9.695 0-.652-.07-1.148-.156-1.477z" fill="#FFC107"/>
                <path d="M3.152 7.345l3.281 2.406c.891-1.789 2.578-2.93 4.617-2.93 1.125 0 2.188.391 3.008 1.164l2.844-2.766c-1.703-1.57-3.906-2.539-6.656-2.539-3.797 0-7.031 2.148-8.672 5.266l3.578 2.399z" fill="#FF3D00"/>
                <path d="M12.05 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.633-2.008 1.078-3.516 1.078-2.844 0-5.258-1.922-6.125-4.523l-3.523 2.422c1.625 3.188 5.016 5.921 9.648 5.921z" fill="#4CAF50"/>
                <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.227s2.75-6.227 6.125-6.227c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.023 9.547-9.695 0-.652-.07-1.148-.156-1.477z" fill="#1976D2" fillOpacity=".15"/>
            </g>
        </svg>
    </span>
                            )}
                            <span className="font-semibold text-sm sm:text-base">
                                {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                            </span>
</button>
                        <button 
                            onClick={handleFacebookSignIn}
                            disabled={isGoogleLoading || isEmailLoading || isFacebookLoading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-[#090040] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isFacebookLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F3]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </span>
                            )}
                            <span className="font-semibold text-sm sm:text-base">
                                {isFacebookLoading ? 'Signing in...' : 'Continue with Facebook'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Column - Email Login */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 bg-white">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Sign in to your account</h2>
                        
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    disabled={isEmailLoading || isGoogleLoading || isFacebookLoading}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    disabled={isEmailLoading || isGoogleLoading || isFacebookLoading}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        disabled={isEmailLoading || isGoogleLoading || isFacebookLoading}
                                        className="h-4 w-4 text-[#471396] focus:ring-[#471396] border-gray-300 rounded disabled:opacity-50"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-[#471396] hover:text-[#B13BFF] transition-colors duration-200">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isEmailLoading || isGoogleLoading || isFacebookLoading}
                                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-[#471396] hover:bg-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#471396] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isEmailLoading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm sm:text-base text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link to="/signup" className="font-medium text-[#471396] hover:text-[#B13BFF] transition-colors duration-200">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;