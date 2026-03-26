from sqlalchemy.orm import Session
from app.agents.task_agent import break_goal_into_tasks
from app.agents.calendar_agent import schedule_tasks
from app.agents.notes_agent import store_execution_notes
from app.agents.search_agent import fetch_context
from app.database.models import Task

def run_workflow(goal: str, db: Session) -> dict:
    """Coordinates the task, calendar, notes, and search agents."""
    
    # 1. Search Agent fetches context roughly
    context = fetch_context(goal)
    
    # 2. Task Agent breaks down goal
    task_titles = break_goal_into_tasks(goal)
    
    # 3. Calendar Agent schedules tasks
    schedule = schedule_tasks(task_titles)
    
    # 4. Save Tasks to DB directly or via an intermediate step
    for t_title, s_time in zip(task_titles, schedule):
        new_task = Task(goal=goal, description=t_title, schedule=s_time)
        db.add(new_task)
    db.commit()

    # 5. Notes Agent stores execution summary
    notes = store_execution_notes(db, goal, task_titles)
    
    return {
        "goal": goal,
        "tasks": task_titles,
        "schedule": schedule,
        "notes": notes
    }
