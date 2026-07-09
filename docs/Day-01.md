# STMS V1 - Day 01 Development Log

**Date:** 09 July 2026

---

# Objective

Set up the complete development environment and establish a solid backend foundation for the STMS V1 project before writing application code.

---

# Development Environment

## Operating System

- macOS

## Package Manager

- Homebrew

## Python

- Python 3.14.0 (Homebrew)

## Virtual Environment

- uv
- Project-specific virtual environment (.venv)

## Version Control

- Git
- GitHub Repository Created

---

# Software Installed

| Software | Version | Status |
|----------|----------|--------|
| Python | 3.14.0 | ✅ |
| uv | Latest | ✅ |
| Git | Installed | ✅ |
| PostgreSQL | 17.10 | ✅ |
| TimescaleDB | 2.28.2 | ✅ |
| ClickHouse | 26.6.1 | ✅ |

---

# Project Structure Created

```
STMS-V1/
│
├── backend/
├── docs/
├── README.md
└── .gitignore
```

---

# Backend Configuration

Project initialized using **uv**.

Virtual environment created using **Homebrew Python 3.14**.

Updated:

- `.python-version`
- `pyproject.toml`

Python version standardized to:

```
3.14
```

---

# Runtime Dependencies Installed

## Core Framework

- FastAPI

Purpose

REST API Framework.

---

## ASGI Server

- Uvicorn

Purpose

Runs the FastAPI application.

---

## ORM

- SQLAlchemy

Purpose

Database ORM for PostgreSQL.

---

## PostgreSQL Driver

- psycopg

Purpose

Allows SQLAlchemy to communicate with PostgreSQL.

---

## Database Version Control

- Alembic

Purpose

Manage future database schema versions.

---

## Configuration

- pydantic-settings

Purpose

Centralized application configuration.

---

## Environment Variables

- python-dotenv

Purpose

Load environment variables from `.env`.

---

## Authentication

- python-jose

Purpose

JWT token generation and verification.

---

## Password Security

- Passlib (bcrypt)

Purpose

Secure password hashing.

---

## Background Scheduler

- APScheduler

Purpose

Run scheduled background jobs.

Examples

- Offline Site Checks
- Daily Reports
- Alarm Processing
- Cleanup Jobs

---

## Email Service

- FastAPI-Mail

Purpose

Send:

- OTP Emails
- Password Reset Emails
- Alarm Notifications
- Welcome Emails

---

# Databases

## PostgreSQL

Installed successfully.

---

## TimescaleDB

Installed successfully.

Configuration optimized using:

```
timescaledb-tune --quiet --yes
```

Extension moved using:

```
timescaledb_move.sh
```

Verified successfully.

---

## ClickHouse

Installed successfully.

Resolved macOS Gatekeeper issue by allowing the application through **Privacy & Security**.

---

# Git

Initialized local repository.

Created first commit.

Repository pushed to GitHub.

---

# Problems Encountered

## Problem 1

TimescaleDB extension not found.

### Cause

Extension files were not moved into PostgreSQL extension directory.

### Solution

Executed:

```
timescaledb_move.sh
```

Restarted PostgreSQL.

Problem resolved.

---

## Problem 2

ClickHouse blocked by macOS Gatekeeper.

### Solution

Allowed the application from:

System Settings

↓

Privacy & Security

↓

Allow Anyway

Problem resolved.

---

## Problem 3

uv created the virtual environment using Conda Python instead of Homebrew Python.

### Cause

`.python-version`

contained:

```
3.13
```

### Solution

Changed to

```
3.14
```

Removed old virtual environment.

Created a new virtual environment.

Verified:

```
which python
```

Result:

```
backend/.venv/bin/python
```

---

# Important Decisions

- Homebrew Python will be used for the STMS project.
- Conda will only be used for future Machine Learning projects.
- PostgreSQL is the primary relational database.
- TimescaleDB will store time-series telemetry.
- ClickHouse will be used for analytics.
- Alembic will manage schema changes for the new database only.
- Clean Architecture will be followed from the beginning.
- Git commits will be created after every major milestone.

---

# Current Backend Stack

```
React Frontend
        │
        ▼
      Nginx
        │
        ▼
     Uvicorn
        │
        ▼
     FastAPI
        │
        ▼
 Configuration
        │
        ▼
 Authentication
        │
        ▼
 Business Layer
        │
        ▼
  SQLAlchemy
        │
        ▼
   Alembic
        │
        ▼
    psycopg
        │
        ▼
 PostgreSQL
        │
        ▼
 TimescaleDB
        │
        ▼
 ClickHouse
```

---

# Lessons Learned

- Always verify the active Python interpreter before creating a virtual environment.
- `.python-version` controls which Python version uv uses.
- SQLAlchemy requires a database driver such as psycopg.
- Alembic manages schema versions, not data migration from the old RMS project.
- Keep project dependencies isolated using `.venv`.
- Commit changes frequently and push them to GitHub.

---

# Current Status

Development environment is fully prepared.

Backend runtime dependencies are installed.

Project repository has been created and pushed to GitHub.

Ready to begin backend development.

---

# Plan for Day 02

- Remove temporary `backend/main.py`
- Create enterprise backend folder structure
- Configure FastAPI application
- Configure project settings
- Configure PostgreSQL connection
- Configure SQLAlchemy
- Initialize Alembic
- Run the first FastAPI server
- Open Swagger UI
- Create the first API endpoint

---

**Status:** ✅ Day 01 Completed Successfully