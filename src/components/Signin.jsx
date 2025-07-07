import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <div className="max-w-md mx-auto mt-10 mb-10 p-8 bg-white shadow-md border border-gray-200 rounded-lg">
            <div className="p-4">
                {/* logo */}
                <div className="flex items-center mb-4">
                    <img className="w-8 h-8" src="../../../src/assets/images/logo.png" alt="logo" />
                    <p className="text-lg md:text-xl font-bold pl-2 tracking-wide">TickFest</p>
                </div>

                {/* heading */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold pb-8 text-gray-800">Sign in</h1>
                </div>

                {/* form section */}
                <div>
                    <form action="" className=" space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-600 font-semibold mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-gray-600 font-semibold mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            />
                        </div>

                        {/* Remember Me and Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-gray-500">
                                <input type="checkbox" className="mr-2 accent-black" />
                                Remember me
                            </label>
                            <button type="button" className="text-sm text-black hover:underline">
                                Forgot your password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                        >
                            Sign In
                        </button>

                        {/* OR divider */}
                        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                            <hr className="flex-grow border-gray-300" />
                            <span>or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="h-5 w-5" />
                            Sign in with Google
                        </button>

                        {/* Facebook Sign In */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 transition duration-300"
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="h-5 w-5" />
                            Sign in with Facebook
                        </button>

                        {/* Signup */}
                        <p className="text-center text-gray-500 text-sm">
                            Don$apos;t have an account?{" "}
                            <Link to="/signup"><button type="button" className="text-black font-medium hover:underline">
                                Sign up
                            </button></Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Signin;