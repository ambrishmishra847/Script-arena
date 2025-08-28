require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Problem = require('../models/Problem');

const problems = [
    {
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        solutionTemplate: `function twoSum(nums, target) {\n    // Your code here\n};`,
        testCases: [
            { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isSample: true },
            { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isSample: true },
            { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]", isSample: false },
        ]
    },
    {
        title: "Valid Parentheses",
        description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        difficulty: "Easy",
        tags: ["String", "Stack"],
        solutionTemplate: `function isValid(s) {\n    // Your code here\n};`,
        testCases: [
            { input: `s = "()"`, expectedOutput: "true", isSample: true },
            { input: `s = "()[]{}"`, expectedOutput: "true", isSample: true },
            { input: `s = "(]"`, expectedOutput: "false", isSample: false },
            { input: `s = "([)]"`, expectedOutput: "false", isSample: false },
            { input: `s = "{[]}"`, expectedOutput: "true", isSample: false },
        ]
    },
    {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
        difficulty: "Hard",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        solutionTemplate: `function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n};`,
        testCases: [
            { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.00000", isSample: true },
            { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.50000", isSample: true },
            { input: "nums1 = [0,0], nums2 = [0,0]", expectedOutput: "0.00000", isSample: false },
        ]
    }
];

const seedDB = async () => {
    await connectDB();
    try {
        await Problem.deleteMany({});
        await Problem.insertMany(problems);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();