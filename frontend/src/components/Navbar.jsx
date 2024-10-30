// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
const isAuthenticated = !!localStorage.getItem('token');
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem('token');
navigate('/login');
};

return (
<nav className="bg-white shadow-md">
    <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
        <span className="font-bold text-2xl text-telekom-magenta">DT</span>
        <span className="font-medium text-telekom-gray-800">Student Platform</span>
        </Link>

        <div className="flex space-x-6 items-center">
        <Link
            to="/topics"
            className="text-telekom-gray-700 hover:text-telekom-magenta transition-colors font-medium"
        >
            Research Topics
        </Link>
        <Link
            to="/jobs"
            className="text-telekom-gray-700 hover:text-telekom-magenta transition-colors font-medium"
        >
            Working Student Jobs
        </Link>

        {/* Auth buttons */}
        {isAuthenticated ? (
            <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded font-medium"
            >
            Logout
            </button>
        ) : (
            <div className="space-x-4">
            <Link
                to="/login"
                className="bg-telekom-magenta text-white px-4 py-2 rounded font-medium"
            >
                Login
            </Link>
            <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded font-medium"
            >
                Sign Up
            </Link>
            </div>
        )}
        </div>
    </div>
    </div>
</nav>
);
}

export default Navbar;