import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const AiAssistant = ({ problemDescription, userCode }) => {
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAiRequest = async (requestType) => {
        setIsLoading(true);
        setResponse('');
        const token = localStorage.getItem('token'); // Retrieve token
        try {
            const payload = {
                problemDescription,
                userCode
            };
            // Add Authorization header to the request
            const { data } = await api.post('/ai/request', { requestType, payload }, {
                headers: { 'x-auth-token': token }
            });
            setResponse(data.response);
        } catch (error) {
            console.error('AI request failed:', error);
            setResponse('Sorry, I encountered an error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-cyan-400">AI Assistant</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={() => handleAiRequest('hint')} disabled={isLoading} className="bg-gray-700 hover:bg-cyan-500 text-white text-sm font-bold py-1 px-3 rounded disabled:bg-gray-600">Get Hint</button>
                <button onClick={() => handleAiRequest('explain')} disabled={isLoading} className="bg-gray-700 hover:bg-cyan-500 text-white text-sm font-bold py-1 px-3 rounded disabled:bg-gray-600">Explain Code</button>
                <button onClick={() => handleAiRequest('debug')} disabled={isLoading} className="bg-gray-700 hover:bg-cyan-500 text-white text-sm font-bold py-1 px-3 rounded disabled:bg-gray-600">Debug</button>
                <button onClick={() => handleAiRequest('generate_test_case')} disabled={isLoading} className="bg-gray-700 hover:bg-cyan-500 text-white text-sm font-bold py-1 px-3 rounded disabled:bg-gray-600">Generate Tests</button>
            </div>
            {isLoading && <p>Thinking...</p>}
            {response && (
                <div className="bg-gray-900 p-3 rounded-md prose prose-invert max-w-none">
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default AiAssistant;
