import React, { useState, useEffect } from 'react';

// A simple function to decode the payload from a JWT
const decodeToken = (token) => {
    try {
        // The payload is the second part of the token
        const payload = token.split('.')[1];
        // Decode the Base64Url string and parse it as JSON
        return JSON.parse(atob(payload));
    } catch (e) {
        console.error("Failed to decode token:", e);
        return null;
    }
};

const GuestProfile = () => (
    <div className="text-center">
        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=guest`} alt="Avatar" className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Guest User</h1>
        <p className="text-gray-400 mt-2">Sign up to save your progress and access all features.</p>
        <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-full">
            Sign Up
        </button>
    </div>
);

const UserProfile = ({ user, progress }) => (
    <div>
        <div className="flex items-center gap-6 mb-8">
            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`} alt="Avatar" className="w-24 h-24 rounded-full bg-gray-700" />
            <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center"><div className="text-2xl font-bold">{progress.solved}</div><div className="text-gray-400">Problems Solved</div></div>
            <div className="bg-gray-800 p-4 rounded-lg text-center"><div className="text-2xl font-bold">{progress.paths}</div><div className="text-gray-400">Paths Started</div></div>
            <div className="bg-gray-800 p-4 rounded-lg text-center"><div className="text-2xl font-bold">{progress.submissions}</div><div className="text-gray-400">Submissions</div></div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Coding Activity</h2>
            <p className="text-gray-400">Activity heatmap coming soon!</p>
        </div>
    </div>
);

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState({ solved: 0, paths: 0, submissions: 0 });
    const token = localStorage.getItem('token');
    const isGuest = token === 'guest-token';

    useEffect(() => {
        if (token && !isGuest) {
            const decoded = decodeToken(token);
            if (decoded && decoded.user) {
                setUser(decoded.user);
                // In a real app, you would fetch this data from your backend
                // For now, we'll simulate it with mock data
                setProgress({ solved: 12, paths: 2, submissions: 87 });
            }
        }
    }, [token, isGuest]);

    return (
        <div className="bg-gray-900 text-white p-8 rounded-lg">
            {isGuest ? <GuestProfile /> : (user ? <UserProfile user={user} progress={progress} /> : <p>Loading profile...</p>)}
        </div>
    );
};

export default ProfilePage;
