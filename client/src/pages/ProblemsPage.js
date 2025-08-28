import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import AiAssistant from '../components/AiAssistant';

// Import Ace Editor and configure it
import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Set the base path for Ace Editor workers from a CDN to fix worker loading issues
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/");

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    c_cpp: 54,
    csharp: 51,
    go: 60,
    kotlin: 78,
    php: 68,
    ruby: 72,
    rust: 73,
    scala: 81,
    swift: 83,
    typescript: 74,
};

const ResultPanel = ({ submissionResult, isLoading }) => {
    if (isLoading) return <div className="p-4 text-center">Running Test Cases...</div>;
    if (!submissionResult) return <div className="p-4 text-gray-400">Run code to see results here.</div>;

    const { allPassed, results } = submissionResult;
    return (
        <div className="p-4 space-y-4">
            <h3 className={`text-2xl font-bold ${allPassed ? 'text-green-500' : 'text-red-500'}`}>
                {allPassed ? 'Accepted' : 'Wrong Answer'}
            </h3>
            {results.map((result, index) => (
                <div key={index} className="bg-gray-900 p-3 rounded-md">
                    <p><strong>Test Case {index + 1}:</strong> 
                        <span className={result.status.id === 3 ? 'text-green-500' : 'text-red-500'}> {result.status.description}</span>
                    </p>
                    <p><strong>Time:</strong> {result.time}s | <strong>Memory:</strong> {result.memory} KB</p>
                    {result.status.id !== 3 && <pre className="text-xs mt-2 bg-black p-2 rounded">Output: {atob(result.stdout || '')}</pre>}
                </div>
            ))}
        </div>
    );
};

const ProblemsPage = () => {
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProblems = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await api.get('/problems', {
                    headers: { 'x-auth-token': token }
                });
                setProblems(data);
                if (data.length > 0) {
                    handleProblemSelect(data[0]._id);
                }
            } catch (error) {
                console.error('Failed to fetch problems:', error);
            }
        };
        fetchProblems();
    }, []);

    const handleProblemSelect = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await api.get(`/problems/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setSelectedProblem(data);
            setCode(data.solutionTemplate || '// Start your code here');
            setSubmissionResult(null);
        } catch (error) {
            console.error('Failed to fetch problem:', error);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setSubmissionResult(null);
        const token = localStorage.getItem('token');
        try {
            const payload = {
                source_code: code,
                language_id: languageMap[language],
                problem_id: selectedProblem._id
            };
            const { data } = await api.post('/submissions', payload, {
                headers: { 'x-auth-token': token }
            });
            setSubmissionResult(data);
        } catch (error) {
            console.error('Submission failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] gap-4">
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Problems</h2>
                {problems.map(prob => (
                    <div key={prob._id} onClick={() => handleProblemSelect(prob._id)}
                        className={`p-3 rounded-md cursor-pointer mb-2 ${selectedProblem?._id === prob._id ? 'bg-cyan-600' : 'hover:bg-gray-700'}`}>
                        <p>{prob.title}</p>
                        <p className="text-sm text-gray-400">{prob.difficulty}</p>
                    </div>
                ))}
            </div>

            <div className="w-2/3 flex flex-col gap-4">
                {selectedProblem ? (
                    <>
                        <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto h-1/2">
                            <h2 className="text-2xl font-bold mb-4">{selectedProblem.title}</h2>
                            <p className="text-gray-400 whitespace-pre-wrap">{selectedProblem.description}</p>
                        </div>
                        <div className="h-1/2 flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 p-2 rounded-md">
                                    {Object.keys(languageMap).map(lang => <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>)}
                                </select>
                                <button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-500 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                                    {isLoading ? 'Running...' : 'Run & Submit'}
                                </button>
                            </div>
                            <div className="flex-grow border border-gray-700 rounded-lg overflow-hidden">
                                <AceEditor
                                    mode={language} theme="monokai" onChange={setCode} name="code-editor"
                                    editorProps={{ $blockScrolling: true }} fontSize={16} width="100%" height="100%"
                                    value={code} setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true, enableSnippets: true }}
                                />
                            </div>
                        </div>
                        <div className="bg-gray-800 mt-4 rounded-lg overflow-y-auto">
                            <ResultPanel submissionResult={submissionResult} isLoading={isLoading} />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
                        <p>Select a problem to start</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemsPage;
