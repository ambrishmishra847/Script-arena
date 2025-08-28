const axios = require('axios');

const getPromptTemplate = (requestType, payload) => {
    const { problemDescription, userCode, errorMessage } = payload;
    switch (requestType) {
        case 'hint':
            return `You are a programming tutor. A user is working on a problem with this description: "${problemDescription}". Provide a one-sentence conceptual hint. Do not write any code.`;
        case 'debug':
            return `Analyze the following code and error message. Explain the likely cause of the error conceptually and suggest what part of the logic the user should re-examine.\n\nCode:\n${userCode}\n\nError:\n${errorMessage}`; 
        case 'explain':
            return `Analyze the following code. Explain its logic, determine its time and space complexity, and suggest one potential optimization. Format the response in Markdown.\n\nCode:\n${userCode}`;
        case 'generate_test_case':
            return `Generate 3 non-trivial edge case inputs for a function that solves the following problem. Include the expected output for each.\n\nProblem:\n${problemDescription}`;
        default:
            return '';
    }
};

exports.handleAiRequest = async (req, res) => {
    const { requestType, payload } = req.body;
    const prompt = getPromptTemplate(requestType, payload);

    if (!prompt) {
        return res.status(400).json({ msg: 'Invalid AI request type' });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
        const text = response.data.candidates[0].content.parts[0].text;
        res.json({ response: text });

    } catch (error) {
        console.error('Gemini API Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Error communicating with AI service');
    }
};