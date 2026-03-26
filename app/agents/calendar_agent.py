from app.tools.calendar_tool import schedule_task

def schedule_tasks(tasks: list[str]) -> list[str]:
    """Uses the calendar tool to schedule a list of tasks."""
    schedule = []
    for i, task in enumerate(tasks):
        schedule.append(schedule_task(task, i))
    return schedule
