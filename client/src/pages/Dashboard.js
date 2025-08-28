import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InProgressCard = ({ title, progress }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <p className="font-bold">{title}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-right text-sm text-gray-400 mt-1">{progress}% complete</p>
    </div>
);

const RecommendedCard = ({ title, type }) => (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer">
        <p className="text-cyan-400 text-sm">{type}</p>
        <p className="font-bold mt-1">{title}</p>
    </div>
);

const Dashboard = () => {
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        // Check local storage to see if the user is enrolled
        if (localStorage.getItem('enrolled_dsa') === 'true') {
            setIsEnrolled(true);
        }
    }, []);

    return (
        <div>
            <div className="bg-gray-800 p-8 rounded-lg mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
                <p className="text-gray-400">Continue your learning journey and sharpen your skills.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Paths in progress</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {isEnrolled ? (
                        <InProgressCard title="Data Structures & Algorithms" progress={40} />
                    ) : (
                        <p className="text-gray-400">You are not enrolled in any paths yet. <Link to="/learning-paths" className="text-cyan-400 hover:underline">Explore paths</Link>.</p>
                    )}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <RecommendedCard title="Mastering Dynamic Programming" type="Course" />
                    <RecommendedCard title="Frontend Developer Path" type="Learning Path" />
                    <RecommendedCard title="SQL for Data Science" type="Course" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
