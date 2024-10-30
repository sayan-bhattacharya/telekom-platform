import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Jobs() {
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchJobs = async () => {
    try {
    const response = await axios.get('http://localhost:5001/api/jobs');
    setJobs(response.data);
    } catch (error) {
    console.error('Error fetching jobs:', error);
    } finally {
    setLoading(false);
    }
};

fetchJobs();
}, []);

if (loading) {
return <div className="text-center">Loading...</div>;
}

return (
<div>
    <h1 className="text-3xl font-bold mb-6">Working Student Positions</h1>
    <div className="grid gap-6">
    {jobs.map((job) => (
        <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
            <h3 className="font-semibold mb-2">Location:</h3>
            <p>{job.location}</p>
            </div>
            <div>
            <h3 className="font-semibold mb-2">Department:</h3>
            <p>{job.department}</p>
            </div>
        </div>
        <div className="mb-4">
            <h3 className="font-semibold mb-2">Requirements:</h3>
            <ul className="list-disc list-inside">
            {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
            ))}
            </ul>
        </div>
        {/* Video Preview and Sentiment Analysis */}
        {job.videoURL && (
            <div className="mt-4">
            <h3 className="font-semibold mb-2">Candidate Video:</h3>
            <video width="100%" controls>
                <source src={job.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div>
        )}
        {job.sentiment && (
            <div className="mt-4">
            <h3 className="font-semibold mb-2">Sentiment Analysis:</h3>
            <p>Confidence Score: {job.sentiment.confidence_score}</p>
            <p>Overall Sentiment: {job.sentiment.overall_sentiment}</p>
            </div>
        )}
        <div className="border-t pt-4">
            <Link
            to={`/apply/job/${job._id}`}
            className="inline-block bg-[#E20074] text-white px-4 py-2 rounded hover:bg-[#cb0068] transition-colors"
            >
            Apply Now
            </Link>
        </div>
        </div>
    ))}
    </div>
</div>
);
}

export default Jobs;