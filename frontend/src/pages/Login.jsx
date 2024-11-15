// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', formData.role);
            localStorage.setItem('user', JSON.stringify({
                name: response.data.user.name,
                email: response.data.user.email,
            }));

            alert('Signed in successfully!');
            setTimeout(() => {
                if (formData.role === 'student') {
                    navigate('/jobs');
                } else if (formData.role === 'recruiter') {
                    navigate('/dashboard');
                }
            }, 100);
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {/* Animated Background Circles */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-200 opacity-50 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-2/3 left-3/4 w-72 h-72 bg-pink-300 opacity-50 rounded-full blur-2xl animate-pulseLight"></div>
            
            {/* Login Card */}
            <div className="relative z-10 max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">DT Student Platform</h1>
                <h3 className="text-lg text-gray-600 text-center mb-6">Welcome Back! Please Login</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                    >
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600 transition duration-150"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/signup" className="text-pink-500 hover:text-pink-600 transition duration-150">Don’t have an account? Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;