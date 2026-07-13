# STMS V1 – Day 02 Progress Report

**Date:** 11 July 2026

---

# Objective

The objective of Day 2 was to move beyond project initialization and build the foundational backend infrastructure required for enterprise application development.

The focus was on:

- Configuration Management
- Environment Variables
- FastAPI Application Setup
- PostgreSQL Integration
- SQLAlchemy Foundation

---

# Work Completed

## 1. Created Environment Configuration

Created the following files:

```
.env
.env.example
```

### Purpose

- `.env` stores local development configuration.
- `.env.example` provides a template for other developers.

Environment variables added:

- Application Configuration
- PostgreSQL Configuration
- JWT Configuration
- Email Configuration

---

## 2. Implemented Centralized Configuration

Created:

```
app/core/settings.py
```

### Purpose

- Read configuration from `.env`
- Centralize application settings
- Prevent hardcoded values
- Make configuration reusable across the project

Technologies Used

- Pydantic Settings
- python-dotenv

---

## 3. Built First FastAPI Application

Created:

```
app/main.py
```

Implemented:

- FastAPI Application
- Project Metadata
- Root Endpoint

Verified:

- FastAPI server starts successfully
- Configuration loads correctly
- Swagger UI works
- ReDoc works

---

## 4. Configured PostgreSQL

Verified:

- PostgreSQL 17 installed
- PostgreSQL service running
- Local PostgreSQL user (`apple`) identified

Created new database:

```
stms_db
```

Verified database creation.

---

## 5. Implemented SQLAlchemy Engine

Created:

```
app/db/database.py
```

Purpose:

- Build database connection URL
- Create SQLAlchemy Engine
- Prepare application for database communication

Current architecture:

```
.env
      │
      ▼
settings.py
      │
      ▼
DATABASE_URL
      │
      ▼
SQLAlchemy Engine
```

---

## 6. Created Session Factory

Created:

```
app/db/session.py
```

Implemented:

- SQLAlchemy Session Factory
- Engine Binding
- Transaction Configuration

Purpose:

- Create database sessions
- Manage communication with PostgreSQL

---

## 7. Implemented Database Dependency

Created:

```
app/db/dependencies.py
```

Implemented:

- FastAPI Dependency Injection
- Automatic Session Creation
- Automatic Session Closing

Purpose:

Each HTTP request receives its own database session.

---

## 8. Created Declarative Base

Created:

```
app/db/base.py
```

Purpose:

Provide the parent class for every database model.

Future models:

- User
- Customer
- Vendor
- Site
- Equipment
- Alarm

All models will inherit from:

```
Base
```

---

# Current Backend Architecture

```
FastAPI
    │
    ▼
Dependencies
    │
    ▼
Session Factory
    │
    ▼
Database Engine
    │
    ▼
PostgreSQL
```

Model Architecture

```
Base
 │
 ├── User
 ├── Customer
 ├── Vendor
 ├── Site
 └── Equipment
```

---

# Technologies Used Today

- FastAPI
- SQLAlchemy 2.x
- PostgreSQL 17
- psycopg
- Pydantic Settings
- python-dotenv

---

# Problems Faced

## PostgreSQL User

Initially expected:

```
postgres
```

Actual local PostgreSQL user:

```
apple
```

Updated `.env` accordingly.

---

## Database Creation

Initially only default databases existed:

- postgres
- template0
- template1

Created:

```
stms_db
```

for STMS development.

---

## Understanding SQLAlchemy

Learned the difference between:

- Engine
- Session
- Dependency
- Base

Instead of copying code, each component was understood before implementation.

---

# Current Project Status

Completed:

- Project Setup
- Runtime Dependencies
- Development Dependencies
- FastAPI Setup
- Configuration Management
- PostgreSQL Setup
- SQLAlchemy Engine
- Session Factory
- Dependency Injection
- Declarative Base

Project Status:

```
Foundation Phase
████████████████████░░░░░░░
Approximately 35–40% of the backend foundation completed.
```

---

# Plan for Day 03

The focus will shift from infrastructure to database modeling.

Planned tasks:

1. Understand SQLAlchemy ORM
2. Create the first database model (`User`)
3. Learn:
   - `Mapped`
   - `mapped_column`
   - Data types
   - Primary Keys
   - Constraints
4. Create the Authentication module structure
5. Configure Alembic
6. Generate the first database migration
7. Create the `users` table in PostgreSQL
8. Verify migration and database schema

---

# Learning Outcomes

Today I learned:

- Why configuration should be centralized.
- Difference between `.env` and `.env.example`.
- How FastAPI reads configuration using Pydantic Settings.
- Purpose of SQLAlchemy Engine.
- Difference between Engine and Session.
- Why every request requires its own database session.
- Purpose of Dependency Injection in FastAPI.
- Why all database models inherit from a Declarative Base.

---

# Summary

Day 2 established the complete backend foundation required for enterprise application development.

The backend is now configured with centralized settings, PostgreSQL integration, SQLAlchemy infrastructure, and a clean architecture that is ready for implementing business modules such as Authentication, Users, Customers, and Site Management.