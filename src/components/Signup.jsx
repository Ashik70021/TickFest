import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

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
                        // Handle successful signup
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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] animate-gradient-xy py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="max-w-6xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex overflow-hidden relative z-10">
                {/* Left Column - Social Login */}
                <div className="w-1/2 bg-gradient-to-br from-[#090040] to-[#471396] p-12 text-white flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-8">Join TickFest Today</h2>
                    <p className="mb-8 text-gray-300">Create your account quickly using your social accounts</p>
                    <button 
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-3 bg-white text-[#090040] px-6 py-3 rounded-lg mb-4 shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                        <span className="w-8 h-8 flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.227s2.75-6.227 6.125-6.227c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.023 9.547-9.695 0-.652-.07-1.148-.156-1.477z" fill="#FFC107"/>
                                    <path d="M3.152 7.345l3.281 2.406c.891-1.789 2.578-2.93 4.617-2.93 1.125 0 2.188.391 3.008 1.164l2.844-2.766c-1.703-1.57-3.906-2.539-6.656-2.539-3.797 0-7.031 2.148-8.672 5.266l3.578 2.399z" fill="#FF3D00"/>
                                    <path d="M12.05 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.633-2.008 1.078-3.516 1.078-2.844 0-5.258-1.922-6.125-4.523l-3.523 2.422c1.625 3.188 5.016 5.921 9.648 5.921z" fill="#4CAF50"/>
                                    <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.227s2.75-6.227 6.125-6.227c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.023 9.547-9.695 0-.652-.07-1.148-.156-1.477z" fill="#1976D2" fillOpacity=".15"/>
                                </g>
                            </svg>
                        </span>
                        <span className="font-semibold text-base">Continue with Google</span>
                    </button>
                    <button 
                        className="flex items-center justify-center gap-3 bg-white text-[#090040] px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                        <span className="w-6 h-6 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                            </svg>
                        </span>
                        <span className="font-semibold text-base">Continue with Facebook</span>
                    </button>
                </div>
                {/* Right Column - Email Signup */}
                <div className="w-1/2 p-12">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Create your account</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396]"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Profile Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    id="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396]"
                                    placeholder="Enter image URL"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396]"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#471396] focus:border-[#471396]"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#471396] hover:bg-[#B13BFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#471396] transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
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
