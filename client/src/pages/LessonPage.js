import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data for lesson content
const lessonData = {
    'big-o': {
        title: 'Introduction to Big O Notation',
        summary: `Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.

        Key Concepts:
        - **O(1) - Constant Time:** The algorithm takes the same amount of time, regardless of the input size. Example: Accessing an array element by its index.
        - **O(log n) - Logarithmic Time:** The time it takes for the algorithm to run increases logarithmically with the input size. Example: Binary search.
        - **O(n) - Linear Time:** The runtime is directly proportional to the size of the input. Example: Looping through all elements in an array.
        - **O(n^2) - Quadratic Time:** The runtime is proportional to the square of the input size. Example: Nested loops over the same collection.`,
        quiz: {
            question: "What is the time complexity of accessing an element in a hash map by its key, on average?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correctAnswer: "O(1)"
        }
    },
    'arrays-strings': {
        title: 'Arrays and Strings',
        summary: `Arrays are a fundamental data structure, consisting of a collection of elements, each identified by at least one array index or key. Strings are typically represented as arrays of characters.

        Common Operations:
        - **Accessing:** O(1) - Directly access an element at a given index.
        - **Searching:** O(n) - Linear search to find an element.
        - **Insertion/Deletion (at end):** O(1) - Amortized constant time for dynamic arrays.
        - **Insertion/Deletion (at beginning/middle):** O(n) - Requires shifting subsequent elements.`,
        quiz: {
            question: "What is the time complexity of inserting an element at the beginning of a dynamic array?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correctAnswer: "O(n)"
        }
    }
};

const Quiz = ({ quiz }) => {
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        setIsCorrect(option === quiz.correctAnswer);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-4">Quiz</h3>
            <p className="mb-4">{quiz.question}</p>
            <div className="space-y-2">
                {quiz.options.map(option => {
                    let buttonClass = "w-full text-left p-3 rounded-md ";
                    if (selected === option) {
                        buttonClass += isCorrect ? 'bg-green-500' : 'bg-red-500';
                    } else {
                        buttonClass += 'bg-gray-700 hover:bg-gray-600';
                    }
                    return (
                        <button key={option} onClick={() => handleSelect(option)} className={buttonClass}>
                            {option}
                        </button>
                    );
                })}
            </div>
            {selected && <p className="mt-4 font-bold">{isCorrect ? "Correct!" : `Not quite. The correct answer is ${quiz.correctAnswer}.`}</p>}
        </div>
    );
};

const LessonPage = () => {
    const { lessonId } = useParams();
    const lesson = lessonData[lessonId];

    if (!lesson) {
        return <div>Lesson not found.</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
            <div className="prose prose-invert max-w-none bg-gray-800 p-6 rounded-lg">
                <p>{lesson.summary}</p>
            </div>
            <Quiz quiz={lesson.quiz} />
            <Link to="/learning-paths/dsa" className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                &larr; Back to DSA Path
            </Link>
        </div>
    );
};

export default LessonPage;
