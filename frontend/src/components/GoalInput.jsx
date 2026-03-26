import React, { useState } from 'react';

const GoalInput = ({ onRunWorkflow, loading }) => {
    const [goal, setGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (goal.trim()) {
            onRunWorkflow(goal);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Your Goal</h2>
            <div className="flex gap-4">
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. Prepare for Python interview in 7 days"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !goal.trim()}
                    className={`px-6 py-2 rounded-lg font-medium text-white transition-colors
                        ${loading || !goal.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Running...' : 'Run Workflow'}
                </button>
            </div>
        </form>
    );
};

export default GoalInput;
