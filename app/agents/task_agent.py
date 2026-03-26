from app.services.llm_service import generate_tasks

def break_goal_into_tasks(goal: str) -> list[str]:
    """AI task generation: Breaks a given goal into an arbitrary list of tasks via Gemini."""
    return generate_tasks(goal)
