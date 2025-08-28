import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const mockPathDetails = {
    dsa: {
        title: 'Data Structures & Algorithms',
        description: 'This path covers the fundamental concepts of data structures and algorithms, preparing you for technical interviews and advanced computer science topics.',
        modules: [
            {
                title: 'Module 1: Introduction to DSA',
                lessons: [
                    { id: 'big-o', title: 'Big O Notation', summary: 'Understand how to analyze the performance of algorithms.', completed: true, assessments: ['Two Sum'] },
                    { id: 'arrays-strings', title: 'Arrays and Strings', summary: 'Learn the fundamentals of these core data structures.', completed: true, assessments: ['Valid Parentheses'] },
                ]
            },
            {
                title: 'Module 2: Advanced Data Structures',
                lessons: [
                    { id: 'hash-maps', title: 'Hash Maps and Sets', summary: 'Master key-value lookups and their applications.', completed: false, assessments: [] },
                    { id: 'linked-lists', title: 'Linked Lists', summary: 'Explore nodes, pointers, and dynamic data structures.', completed: false, assessments: [] },
                    { id: 'trees-graphs', title: 'Trees and Graphs', summary: 'Dive into non-linear data structures and traversal algorithms.', completed: false, assessments: ['Median of Two Sorted Arrays'] },
                ]
            }
        ]
    }
};

const LearningPathDetail = () => {
    const { id } = useParams();
    const path = mockPathDetails[id];
    const [isEnrolled, setIsEnrolled] = useState(localStorage.getItem('enrolled_dsa') === 'true');

    const handleEnroll = () => {
        localStorage.setItem('enrolled_dsa', 'true');
        setIsEnrolled(true);
    };

    if (!path) return <div>Path not found</div>;

    const totalLessons = path.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = path.modules.reduce((acc, module) => acc + module.lessons.filter(l => l.completed).length, 0);
    const progress = (completedLessons / totalLessons) * 100;

    return (
        <div>
            <div className="bg-gray-800 p-8 rounded-lg mb-8">
                <h1 className="text-4xl font-bold">{path.title}</h1>
                <p className="text-gray-400 mt-2">{path.description}</p>
                <button 
                    onClick={handleEnroll} 
                    disabled={isEnrolled}
                    className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isEnrolled ? 'Enrolled' : 'Enroll in this path'}
                </button>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Path Content</h2>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="space-y-6">
                    {path.modules.map((module, index) => (
                        <div key={index}>
                            <h3 className="text-xl font-bold mb-3 text-cyan-400">{module.title}</h3>
                            <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="bg-gray-800 p-4 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500' : 'bg-gray-700 border-2 border-gray-500'}`}>
                                                {lesson.completed && '✔'}
                                            </div>
                                            <div>
                                                <Link to={`/lesson/${lesson.id}`} className="font-bold hover:underline">{lesson.title}</Link>
                                                <p className="text-sm text-gray-400">{lesson.summary}</p>
                                            </div>
                                        </div>
                                        {lesson.assessments.length > 0 && (
                                            <div className="mt-3 pl-12">
                                                <h4 className="text-sm font-semibold mb-2">Assessments:</h4>
                                                <div className="flex gap-2">
                                                    {lesson.assessments.map(assessment => (
                                                        <Link to="/problems" key={assessment} className="bg-gray-700 text-xs px-3 py-1 rounded-full hover:bg-cyan-600">{assessment}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPathDetail;
