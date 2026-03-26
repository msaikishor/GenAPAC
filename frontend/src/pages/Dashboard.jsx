import React, { useState } from 'react';
import GoalInput from '../components/GoalInput';
import AgentFlow from '../components/AgentFlow';
import ResultsPanel from '../components/ResultsPanel';
import { runWorkflow } from '../services/api';

const Dashboard = () => {
    const [workflowStatus, setWorkflowStatus] = useState('idle'); // idle, running, completed
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleRunWorkflow = async (goal) => {
        setWorkflowStatus('running');
        setResults(null);
        setError(null);
        
        try {
            // Initiate real request and let it run, we'll delay the final reveal slightly for animation completion
            const rawData = await runWorkflow(goal);
            
            // To ensure the staging animation finishes we wait briefly
            // The AgentFlow simulates staggered animation which takes about 5*600 = 3000ms
            setTimeout(() => {
                setResults(rawData);
                setWorkflowStatus('completed');
            }, 3000);

        } catch (err) {
            setError(err.message || "Failed to execute workflow");
            setWorkflowStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Multi-Agent AI System Dashboard
                    </h1>
                    <p className="text-lg text-gray-500">
                        Visualizing agent coordination workflow from goal to execution.
                    </p>
                </div>

                <GoalInput onRunWorkflow={handleRunWorkflow} loading={workflowStatus === 'running'} />
                
                {error && (
                    <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center shadow-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <AgentFlow workflowStatus={workflowStatus} results={results} />
                        {workflowStatus === 'idle' && (
                            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                                <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p>Awaiting Workflow Execution</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="sticky top-6">
                        {workflowStatus === 'completed' && (
                            <ResultsPanel results={results} />
                        )}
                        {workflowStatus === 'idle' && (
                            <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 p-8 text-center bg-gray-50/50">
                                The JSON payload will appear here after the workflow completes.
                            </div>
                        )}
                        {workflowStatus === 'running' && (
                            <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center bg-blue-50/50">
                                <span className="relative flex h-5 w-5 mb-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500"></span>
                                </span>
                                <p className="text-blue-500 font-medium">Processing Data...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
