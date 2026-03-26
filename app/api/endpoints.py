from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.database.schemas import WorkflowRequest, WorkflowResponse, TaskResponse, NoteResponse
from app.database.models import Task, Note
from app.agents.orchestrator import run_workflow

router = APIRouter()

@router.post("/run-workflow", response_model=WorkflowResponse)
def execute_workflow(request: WorkflowRequest, db: Session = Depends(get_db)):
    """Runs the multi-agent workflow for a given goal."""
    result = run_workflow(request.goal, db)
    return result

@router.get("/tasks", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    """Returns stored tasks from the database."""
    return db.query(Task).all()

@router.get("/notes", response_model=list[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    """Returns stored notes from the database."""
    return db.query(Note).all()
