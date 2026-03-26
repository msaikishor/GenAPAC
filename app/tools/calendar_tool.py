import datetime

def schedule_task(task: str, index: int) -> str:
    """Mock scheduling tool. Books a task at a specific time."""
    base_time = datetime.datetime.now().replace(hour=19, minute=0, second=0, microsecond=0)
    scheduled_time = base_time + datetime.timedelta(hours=index)
    time_str = scheduled_time.strftime("%I%p").lstrip("0")
    if "PM" not in time_str and "AM" not in time_str:
        # Fallback for some OS where %p might be empty in certain locales
        time_str += "PM" if scheduled_time.hour >= 12 else "AM"
    
    return f"{task} scheduled at {time_str}"
