import React, { useState, useEffect } from 'react';
import AgentCard from './AgentCard';

const AgentFlow = ({ workflowStatus, results }) => {
    // workflowStatus: 'idle', 'running', 'completed'
    // Staggered logic to make it look sequential instead of all running at once natively
    const [staggeredIndex, setStaggeredIndex] = useState(-1);

    useEffect(() => {
        if (workflowStatus === 'running') {
            setStaggeredIndex(0);
            
            // Advance the running animation mockingly every 500ms
            const interval = setInterval(() => {
                setStaggeredIndex(prev => {
                    if (prev >= 4) return 4;
                    return prev + 1;
                });
            }, 600);

            return () => clearInterval(interval);
        } else if (workflowStatus === 'completed') {
            setStaggeredIndex(5);
        } else {
            setStaggeredIndex(-1);
        }
    }, [workflowStatus]);
    
    // Derived individual component statuses to simulate a pipeline
    const getStatus = (agentIndex) => {
        if (workflowStatus === 'completed') return 'completed';
        if (workflowStatus === 'idle') return 'waiting';
        
        if (agentIndex < staggeredIndex) return 'completed';
        if (agentIndex === staggeredIndex) return 'running';
        return 'waiting';
    };

    const agents = [
        { id: 'orchestrator', name: 'Orchestrator Agent', color: 'blue', output: getStatus(0) !== 'waiting' ? "Received goal, coordinating sub-agents..." : null },
        { id: 'task', name: 'Task Agent', color: 'purple', output: getStatus(1) === 'completed' ? results?.tasks || "Breaking down goal into tasks..." : null },
        { id: 'search', name: 'Search Agent', color: 'orange', output: getStatus(2) === 'completed' ? "Fetched context from mock search tool" : null },
        { id: 'calendar', name: 'Calendar Agent', color: 'green', output: getStatus(3) === 'completed' ? results?.schedule || "Scheduling specific times..." : null },
        { id: 'notes', name: 'Notes Agent', color: 'pink', output: getStatus(4) === 'completed' ? results?.notes || "Saved completion summaries." : null },
    ];

    if (workflowStatus === 'idle') return null;

    return (
        <div className="w-full py-8">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Agent Pipeline</h2>
            <div className="flex flex-col items-center w-full px-2">
                {agents.map((agent, index) => (
                    <AgentCard 
                        key={agent.id}
                        name={agent.name}
                        color={agent.color}
                        status={getStatus(index)}
                        output={agent.output}
                        isLast={index === agents.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default AgentFlow;
