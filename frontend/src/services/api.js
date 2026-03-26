const getApiBaseUrl = () => {
    if (import.meta.env.PROD) {
        return ''; 
    }
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

export const runWorkflow = async (goal) => {
    try {
        const response = await fetch(`${getApiBaseUrl()}/run-workflow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

export const fetchTasks = async () => {
    try {
        const response = await fetch(`${getApiBaseUrl()}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const fetchNotes = async () => {
    try {
        const response = await fetch(`${getApiBaseUrl()}/notes`);
        if (!response.ok) throw new Error('Failed to fetch notes');
        return await response.json();
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};
