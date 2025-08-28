const Problem = require('../models/Problem');

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().select('-testCases');
        res.json(problems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }
        // Return full test cases for the backend to use, but frontend will only show samples
        res.json(problem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};