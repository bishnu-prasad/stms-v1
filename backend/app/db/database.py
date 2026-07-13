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

DATABASE_URL = (
    f"postgresql+psycopg://"
    f"{settings.database_user}:"
    f"{settings.database_password}@"
    f"{settings.database_host}:"
    f"{settings.database_port}/"
    f"{settings.database_name}"
)

engine = create_engine(DATABASE_URL)