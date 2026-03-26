from sqlalchemy.orm import Session
from app.database.models import Note

def save_note(db: Session, content: str) -> Note:
    """Saves a note to the database."""
    new_note = Note(content=content)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

def get_all_notes(db: Session):
    return db.query(Note).all()
