// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchApplications = async () => {
    try {
    const response = await axios.get('http://localhost:5001/api/applications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setApplications(response.data);
    } catch (error) {
    console.error('Error fetching applications:', error);
    } finally {
    setLoading(false);
    }
};

fetchApplications();
}, []);

if (loading) return <p>Loading applications...</p>;

return (
<div>
    <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
    {applications.length > 0 ? (
    <ul>
        {applications.map((app) => (
        <li key={app._id} className="mb-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{app.studentName}</h2>
            <p>Email: {app.email}</p>
            <p>Message: {app.message}</p>
            <p>Disability: {app.disability ? 'Yes' : 'No'}</p>
            <p>Submitted: {new Date(app.dateSubmitted).toLocaleString()}</p>
        </li>
        ))}
    </ul>
    ) : (
    <p>No applications found</p>
    )}
</div>
);
}

export default Dashboard;