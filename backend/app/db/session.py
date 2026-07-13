"""
Database Session Factory

Creates database sessions

Purpose:
- Creates the SQLAlchemy Session Factory (SessionLocal).
- Provides a new database Session for each request.
- Each Session uses the SQLAlchemy Engine to communicate with PostgreSQL.

Note:
A Session is responsible for executing database operations such as
SELECT, INSERT, UPDATE, and DELETE.
"""

from sqlalchemy.orm import sessionmaker

from app.db.database import engine

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)