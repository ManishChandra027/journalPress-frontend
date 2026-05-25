import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    // temporary auth state
    const isLoggedIn = false;
    //   const isLoggedIn = true;
    return (
        <header className="bg-black text-white px-6 py-4">
            <nav className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    JournalPress
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-gray-300 transition">
                        Home
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-gray-300 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="hover:text-gray-300 transition"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/my-post"
                                className="hover:text-gray-300 transition"
                            >
                                My Posts
                            </Link>

                            <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
