from pydantic import BaseModel
from typing import List, Optional

class WorkflowRequest(BaseModel):
    goal: str

class WorkflowResponse(BaseModel):
    goal: str
    tasks: List[str]
    schedule: List[str]
    notes: List[str]

class TaskResponse(BaseModel):
    id: int
    goal: str
    description: str
    schedule: Optional[str] = None

    class Config:
        from_attributes = True

class NoteResponse(BaseModel):
    id: int
    content: str

    class Config:
        from_attributes = True
