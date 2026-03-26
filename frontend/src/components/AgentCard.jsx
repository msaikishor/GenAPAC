import React from 'react';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';

const AgentCard = ({ name, color, status, output, isLast }) => {
    
    // Status can be: 'waiting', 'running', 'completed'
    
    const colorClasses = {
        blue: "border-blue-500",
        purple: "border-purple-500",
        orange: "border-orange-500",
        green: "border-green-500",
        pink: "border-pink-500"
    };

    const bgClasses = {
        blue: "bg-blue-50",
        purple: "bg-purple-50",
        orange: "bg-orange-50",
        green: "bg-green-50",
        pink: "bg-pink-50"
    };

    const StatusIcon = () => {
        if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        if (status === 'running') return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
        return <CircleDashed className="w-5 h-5 text-gray-400" />;
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className={`w-full max-w-lg bg-white rounded-xl shadow-md border-l-4 ${colorClasses[color] || 'border-gray-500'} overflow-hidden transition-all duration-300 ${status === 'running' ? 'scale-[1.02] shadow-lg' : ''}`}>
                <div className={`p-4 border-b border-gray-100 flex justify-between items-center ${bgClasses[color] || 'bg-gray-50'}`}>
                    <h3 className="font-semibold text-gray-800">{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 capitalize">{status}</span>
                        <StatusIcon />
                    </div>
                </div>
                
                {output && (
                    <div className="p-4 bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap">
                        {Array.isArray(output) ? (
                            <ul className="list-disc pl-5 space-y-1">
                                {output.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                        ) : (
                            <p>{output}</p>
                        )}
                    </div>
                )}
            </div>

            {!isLast && (
                <div className="flex flex-col items-center py-2 h-12">
                    <div className={`w-0.5 h-full ${status === 'completed' ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-500`}></div>
                    <div className={`w-3 h-3 rotate-45 border-b-2 border-r-2 -mt-2 ${status === 'completed' ? 'border-green-500' : 'border-gray-300'} transition-colors duration-500`}></div>
                </div>
            )}
        </div>
    );
};

export default AgentCard;
