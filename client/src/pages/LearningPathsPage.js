import React from 'react';
import { Link } from 'react-router-dom';

const mockPaths = [
    { id: 'dsa', title: 'Data Structures & Algorithms', duration: '40 hours', level: 'Intermediate', tags: ['Core CS', 'Algorithms'] },
    { id: 'frontend', title: 'Frontend Developer', duration: '60 hours', level: 'Beginner', tags: ['Web Dev', 'React'] },
    { id: 'backend', title: 'Backend Engineer', duration: '55 hours', level: 'Intermediate', tags: ['Web Dev', 'Node.js', 'Databases'] },
];

const PathCard = ({ id, title, duration, level, tags }) => (
    <Link to={`/learning-paths/${id}`} className="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 cursor-pointer">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <span className="bg-cyan-900 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{level}</span>
        </div>
        <p className="text-gray-400 mt-2">{duration} estimated duration</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(tag => <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{tag}</span>)}
        </div>
    </Link>
);

const LearningPathsPage = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Learning Paths</h1>
                <p className="text-gray-400 mt-2">Follow a guided path to build job-ready skills.</p>
                <input type="text" placeholder="Search for a path or skill..." className="w-full mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {mockPaths.map(path => <PathCard key={path.id} {...path} />)}
            </div>
        </div>
    );
};

export default LearningPathsPage;