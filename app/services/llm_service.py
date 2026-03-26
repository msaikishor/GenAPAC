import os
import json
try:
    import google.generativeai as genai
except ImportError:
    genai = None

from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY and genai:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
else:
    model = None

def generate_tasks(goal: str) -> list[str]:
    """Calls Gemini API to break down a goal into tasks. Falls back to mock values if unavailable."""
    if model:
        prompt = f"""You are an intelligent planning assistant.
Convert the user's goal into 3 to 6 practical, real-world actionable tasks.
Correct spelling mistakes automatically.
Do not repeat the user's sentence.
Tasks must be specific and helpful.
Keep each task short (max 12 words).
Return output as JSON list only.
Example format:
[
"task 1",
"task 2",
"task 3"
]

User goal: {goal}"""
        try:
            response = model.generate_content(prompt)
            text = response.text.strip()
            # Clean up markdown code blocks if present
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            # Find the first [ and last ] to extract just the array
            start_idx = text.find('[')
            end_idx = text.rfind(']')
            if start_idx != -1 and end_idx != -1:
                text = text[start_idx:end_idx+1]
                
            return json.loads(text)
        except Exception as e:
            print(f"LLM generate_tasks error: {e}", flush=True)
            pass
    
    # Fallback mock behavior to keep the local server running smoothly
    goal_lower = goal.lower()
    if "data analyst" in goal_lower:
        return ["Review statistics concepts", "Practice SQL queries", "Revise Python for data analysis", "Study machine learning basics", "Prepare behavioral interview answers"]
    elif "python" in goal_lower:
        return ["Variables", "Loops", "Functions", "Classes", "Decorators"]
    elif "interview" in goal_lower:
        return ["Resume Review", "Behavioral questions", "Technical questions", "Mock interview"]
    else:
        return [f"Research {goal}", f"Draft plan for {goal}", f"Execute {goal}"]

def generate_search_context(goal: str) -> str:
    """Calls Gemini API to provide contextual topics. Falls back to mock values if unavailable."""
    if model:
        prompt = f"""Provide short helpful context related to the goal.
Return 2 to 3 lines of useful information.
Do not repeat the goal sentence.
Keep output concise.

User goal: {goal}"""
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"LLM generate_search_context error: {e}", flush=True)
            pass

    # Fallback mock behavior
    goal_lower = goal.lower()
    if "data analyst" in goal_lower or "data" in goal_lower:
        return "Key topics for data analyst interviews include statistics, SQL, Python, data visualization, and business understanding."
    elif "python" in goal_lower:
        return "Key topics for Python include data structures, algorithms, object-oriented programming, and popular frameworks."
    return f"Found contextual resources for: {goal}"
