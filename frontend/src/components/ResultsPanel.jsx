import React from 'react';

const ResultsPanel = ({ results }) => {
    if (!results) return null;

    return (
        <div className="w-full mx-auto mt-8 bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-100">Final Structured Output</h2>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
            </div>
            <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">
                    {JSON.stringify(results, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default ResultsPanel;
