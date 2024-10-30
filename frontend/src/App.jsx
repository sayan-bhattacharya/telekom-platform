// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ResearchTopics from './pages/ResearchTopics';
import Jobs from './pages/Jobs';
import ApplicationForm from './pages/ApplicationForm';
import Dashboard from './pages/Dashboard';

const isAuthenticated = () => !!localStorage.getItem('token'); // Check if the user is logged in

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/topics" element={isAuthenticated() ? <ResearchTopics /> : <Navigate to="/login" replace />} />
            <Route path="/jobs" element={isAuthenticated() ? <Jobs /> : <Navigate to="/login" replace />} />
            <Route path="/apply/:type/:id" element={isAuthenticated() ? <ApplicationForm /> : <Navigate to="/login" replace />} />
            <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;