"""
- Creates the SQLAlchemy Engine

Database Engine Configuration

Purpose:
- Builds the database connection URL using application settings.
- Creates the SQLAlchemy Engine.
- The Engine is responsible for managing connections to PostgreSQL.

Note:
The Engine does not execute SQL queries directly. It serves as the
central connection manager that will be used by SQLAlchemy Sessions.
"""

from sqlalchemy import create_engine

from app.core.settings import settings

engine = create_engine(settings.database_url)