from sqlalchemy import Column, Integer, String, Text
from app.database.db import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    goal = Column(String, index=True)
    description = Column(String)
    schedule = Column(String, nullable=True)

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
