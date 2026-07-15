"""
SQLAlchemy Declarative Base

Parent class for all database models

Purpose:
- Defines the base class for all SQLAlchemy ORM models.
- Every database model in the application must inherit from Base.

Example:
class User(Base):
    ...

This enables SQLAlchemy to recognize Python classes as database tables.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


