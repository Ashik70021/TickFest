import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Signup = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'User'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        createUser(formData.email, formData.password)
            .then(result => {
                updateUserProfile(formData.name, formData.image)
                    .then(() => {
                        alert("Register successfully");
                    });
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // Handle successful Google sign-in
            });
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
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">Join TickFest Today</h2>
                    <p className="mb-6 sm:mb-8 text-gray-300 text-sm sm:text-base">Create your account quickly using your social accounts</p>
                    <div className="space-y-3 sm:space-y-4">
                        <button 
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 bg-white text-[#090040] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                        >
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
                            <span className="font-semibold text-sm sm:text-base">Continue with Google</span>
                        </button>
                        <button 
                            className="w-full flex items-center justify-center gap-3 bg-white text-[#090040] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                        >
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F3]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </span>
                            <span className="font-semibold text-sm sm:text-base">Continue with Facebook</span>
                        </button>
                    </div>
                </div>

                {/* Right Column - Email Signup */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 bg-white">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Create your account</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    id="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base"
                                    placeholder="Enter image URL"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base"
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396] text-sm sm:text-base"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-[#471396] hover:bg-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#471396] transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm sm:text-base text-gray-600">
                            Already have an account?{" "}
                            <Link to="/signin" className="font-medium text-[#471396] hover:text-[#B13BFF] transition-colors duration-200">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
