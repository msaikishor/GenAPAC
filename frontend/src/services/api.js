// Helper to dynamically connect to the backend whether in Dev (npm run dev) or Prod (Cloud Run)
const getApiBaseUrl = () => {
    if (import.meta.env.PROD) {
        return ''; // Uses the same root domain running the React app
    }
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

export const runWorkflow = async (goal) => {
    try {
        const response = await fetch(`${getApiBaseUrl()}/run-workflow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error executing workflow:", error);
        throw error;
    }
};
