    // src/pages/Login.jsx
    import React, { useState } from 'react';
    import axios from 'axios';
    import { useNavigate, Link } from 'react-router-dom';
    import '../styles/Auth.css';

    function Login() {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login form submitted:', formData); // Log form data

        try {
        const response = await axios.post('http://localhost:5001/api/auth/login', formData);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
        } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="auth-input"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="auth-input"
                onChange={handleChange}
                required
            />
            <select
                name="role"
                className="auth-input"
                value={formData.role}
                onChange={handleChange}
                required
            >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
            </select>
            <button type="submit" className="auth-button">Login</button>
            </form>
            <Link to="/signup" className="auth-link">Don’t have an account? Sign up</Link>
        </div>
        </div>
    );
    }

    export default Login;