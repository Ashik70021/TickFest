import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="max-w-md mx-auto mt-10 mb-10 p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
            <div className="p-4">
                {/* Logo */}
                <div className="flex items-center mb-6">
                    <img
                        className="w-8 h-8"
                        src="../../../src/assets/images/logo.png"
                        alt="logo"
                    />
                    <p className="text-lg md:text-xl font-bold pl-2 tracking-wide">
                        TickFest
                    </p>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-semibold pb-8 text-gray-800">
                    Sign up
                </h1>

                {/* Form */}
                <form className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullname"
                            className="block text-gray-600 font-semibold mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            placeholder="Write Your Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-600 font-semibold mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-600 font-semibold mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-600 font-semibold mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>

                    {/* Email Updates Opt-in */}
                    <div className="flex items-center text-sm text-gray-600">
                        <input type="checkbox" id="updates" className="mr-2 accent-black" />
                        <label htmlFor="updates">I want to receive updates via email.</label>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                    >
                        Sign Up
                    </button>

                    {/* OR divider */}
                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                        <hr className="flex-grow border-gray-300" />
                        <span>or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* Google Sign Up */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Sign up with Google
                    </button>

                    {/* Facebook Sign Up */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                            alt="Facebook"
                            className="h-5 w-5"
                        />
                        Sign up with Facebook
                    </button>

                    {/* Sign In Redirect */}
                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link to="/signin"><button
                            type="button"
                            className="text-black font-medium hover:underline"
                        >
                            Sign in
                        </button></Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
