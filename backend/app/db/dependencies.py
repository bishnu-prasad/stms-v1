"""
Database Dependencies

Gives one session to each request and closes it

Purpose:
- Provides FastAPI dependency functions related to the database.
- Creates a new database Session for each incoming request.
- Ensures the Session is automatically closed after the request completes.

Benefit:
Prevents database connection leaks and guarantees that every request
uses an isolated database Session.
"""

from collections.abc import Generator

from sqlalchemy.orm import Session

from app.db.session import SessionLocal


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()