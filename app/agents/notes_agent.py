from sqlalchemy.orm import Session
from app.tools.notes_tool import save_note

def store_execution_notes(db: Session, goal: str, tasks: list[str]) -> list[str]:
    """Uses the notes tool to store summaries of the execution."""
    note_content = f"Workflow completed for goal: {goal}. Tasks created: {', '.join(tasks)}."
    saved = save_note(db, note_content)
    return [saved.content]
