const axios = require('axios');
const Problem = require('../models/Problem');

// Adjusted polling function for better error handling and non-blocking behavior
const pollForResult = async (token) => {
    const url = `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=true&fields=*`;
    const headers = {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
    };

    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
        try {
            const response = await axios.get(url, { headers });
            const statusId = response.data.status.id;
            if (statusId > 2) { // 3 for Accepted, 4 for Wrong Answer, etc.
                return response.data;
            }
        } catch (error) {
            console.error('Polling error:', error.response ? error.response.data : error.message);
            throw new Error('Error fetching submission result');
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between polls
        attempts++;
    }
    throw new Error('Submission timed out');
};

exports.createSubmission = async (req, res) => {
    const { source_code, language_id, problem_id } = req.body;
    try {
        const problem = await Problem.findById(problem_id);
        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        const submissions = problem.testCases.map(tc => ({
            language_id,
            source_code: Buffer.from(source_code).toString('base64'),
            stdin: Buffer.from(tc.input).toString('base64'),
            expected_output: Buffer.from(tc.expectedOutput).toString('base64'),
        }));

        const options = {
            method: 'POST',
            url: `${process.env.JUDGE0_API_URL}/submissions/batch`,
            params: { base64_encoded: 'true' },
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
            },
            data: { submissions }
        };

        const response = await axios.request(options);
        const tokens = response.data;

        const results = await Promise.all(tokens.map(t => pollForResult(t.token)));

        const allPassed = results.every(r => r.status.id === 3);

        res.json({ allPassed, results });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during submission');
    }
};
