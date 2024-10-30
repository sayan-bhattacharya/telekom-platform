    // src/pages/ResearchTopics.jsx
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';

    function ResearchTopics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/topics');
            setTopics(response.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchTopics();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
        <h1 className="text-3xl font-bold mb-6">Research Topics</h1>
        <div className="grid gap-6">
            {topics.map((topic) => (
            <div key={topic._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">{topic.title}</h2>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="mb-4">
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc list-inside">
                    {topic.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                    ))}
                </ul>
                </div>
                <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Mentor:</h3>
                <p>{topic.mentor.name} - {topic.mentor.position}</p>
                <Link
                    to={`/apply/topic/${topic._id}`}
                    className="mt-4 inline-block bg-[#E20074] text-white px-4 py-2 rounded hover:bg-[#cb0068] transition-colors"
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

    export default ResearchTopics;
