import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const activeLink = "flex items-center p-2 text-base font-normal text-white bg-gray-700 rounded-lg";
    const normalLink = "flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700";

    return (
        <aside className="w-64 bg-gray-800 p-6 flex-col justify-between hidden md:flex">
            <div>
                <h1 className="text-2xl font-bold text-cyan-500 mb-10">Script-Arena</h1>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : normalLink}>Dashboard</NavLink>
                    <NavLink to="/problems" className={({ isActive }) => isActive ? activeLink : normalLink}>Problems</NavLink>
                    <NavLink to="/learning-paths" className={({ isActive }) => isActive ? activeLink : normalLink}>Learning Paths</NavLink>
                    <NavLink to="/contests" className={({ isActive }) => isActive ? activeLink : normalLink}>Contests</NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? activeLink : normalLink}>Profile</NavLink>
                </nav>
            </div>
            <div>
                <button onClick={handleLogout} className="w-full text-left p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-red-500 hover:text-white">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;