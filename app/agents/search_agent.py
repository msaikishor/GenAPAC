from app.services.llm_service import generate_search_context

def fetch_context(goal: str) -> str:
    """Uses LLM search tool to find context around the user's goal."""
    return generate_search_context(goal)
