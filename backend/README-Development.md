Part 1 – Development Environment Setup

# STMS V1 Backend - Development Guide

This document explains how to set up the STMS V1 backend development environment from scratch on a new machine.

The goal is that any developer can clone the repository, install the required software, and start contributing with minimal setup.

---

# Table of Contents

1. Prerequisites
2. Required Software
3. Install Homebrew (macOS)
4. Install Git
5. Install Python 3.14
6. Install uv
7. Install PostgreSQL
8. Install TimescaleDB
9. Install ClickHouse
10. Clone Repository
11. Create Virtual Environment
12. Activate Virtual Environment
13. Install Project Dependencies
14. Verify Installation
15. Project Structure

---

# Prerequisites

Recommended Operating System:

- macOS (Apple Silicon or Intel)
- Ubuntu 24.04 LTS
- Windows (WSL2 recommended)

Minimum Requirements

- 8 GB RAM
- 10 GB Free Disk Space
- Git
- Python 3.14
- Internet Connection

Recommended Tools

- Visual Studio Code
- GitHub Desktop (Optional)
- Postman
- pgAdmin
- DBeaver

---

# Required Software

| Software | Purpose |
|-----------|----------|
| Git | Version Control |
| Python 3.14 | Backend Runtime |
| uv | Package & Environment Manager |
| PostgreSQL | Primary Database |
| TimescaleDB | Time-Series Database |
| ClickHouse | Analytics Database |
| VS Code | Code Editor |

---

# Install Homebrew (macOS)

Check whether Homebrew is installed:

```bash
brew --version
```

If not installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify installation:

```bash
brew --version
```

---

# Install Git

Check version:

```bash
git --version
```

Install:

```bash
brew install git
```

Verify:

```bash
git --version
```

---

# Install Python 3.14

Install:

```bash
brew install python@3.14
```

Verify:

```bash
python3.14 --version
```

Expected output:

```
Python 3.14.x
```

---

# Install uv

Install:

```bash
brew install uv
```

Verify:

```bash
uv --version
```

---

# Install PostgreSQL

Install:

```bash
brew install postgresql@17
```

Start PostgreSQL:

```bash
brew services start postgresql@17
```

Verify:

```bash
psql --version
```

---

# Install TimescaleDB

Install:

```bash
brew tap timescale/tap
brew install timescaledb
```

Verify:

```bash
timescaledb-tune --version
```

> TimescaleDB extends PostgreSQL for efficient time-series data storage.

---

# Install ClickHouse

Install:

```bash
brew install clickhouse
```

Start the service:

```bash
brew services start clickhouse
```

Verify:

```bash
clickhouse-client --version
```

---

# Clone Repository

Clone the project:

```bash
git clone <repository-url>
```

Navigate into the backend:

```bash
cd STMS-V1/backend
```

---

# Create Virtual Environment

Create the project virtual environment:

```bash
uv venv
```

This creates:

```
.venv/
```

inside the backend directory.

---

# Activate Virtual Environment

macOS / Linux

```bash
source .venv/bin/activate
```

Expected prompt:

```
(backend)
```

---

# Install Project Dependencies

Install all runtime and development dependencies:

```bash
uv sync
```

This command reads:

- pyproject.toml
- uv.lock

and installs the exact versions required for the project.

---

# Verify Installation

Check Python:

```bash
python --version
```

Expected:

```
Python 3.14.x
```

Check interpreter:

```bash
which python
```

Expected:

```
backend/.venv/bin/python
```

Verify uv:

```bash
uv --version
```

List installed packages:

```bash
uv pip list
```

If all commands execute successfully, the development environment has been configured correctly.

---

# Current Project Structure

```
backend/
│
├── app/
│   ├── api/
│   ├── common/
│   ├── core/
│   ├── db/
│   ├── jobs/
│   ├── mail/
│   ├── modules/
│   ├── static/
│   ├── __init__.py
│   └── main.py
│
├── tests/
│
├── pyproject.toml
├── uv.lock
├── README.md
├── README-Development.md
└── README-Production.md
```

---

# Part 1 Complete

At this stage you have:

- Python installed
- uv installed
- PostgreSQL installed
- TimescaleDB installed
- ClickHouse installed
- Git configured
- Repository cloned
- Virtual environment created
- Dependencies installed
- Development environment ready

The next section covers:

- Environment Variables
- Running the FastAPI Server
- Daily Development Workflow
- Ruff
- Black
- isort
- Pytest
- Git Workflow
- Troubleshooting




## Part 2 – Development Workflow


16. Environment Variables
17. Running the Backend Server
18. Daily Development Workflow
19. Ruff (Linting)
20. Black (Formatting)
21. isort (Import Sorting)
22. Pytest (Testing)
23. Git Workflow
24. Common Commands
25. Troubleshooting
26. Development Best Practices
27. Development Checklist
28. Conclusion

---

---

# Environment Variables

The application configuration is managed using environment variables.

Create a new environment file:

```bash
touch .env
```


```

> **Important:** Never commit your `.env` file to Git. Only commit `.env.example`.

---

# Running the Backend Server

Ensure the virtual environment is activated.

```bash
source .venv/bin/activate
```

Run the development server:

```bash
uv run uvicorn app.main:app --reload
```

Expected output:

```text
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Open the following URLs in your browser:

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# Daily Development Workflow

## Start Your Day

Navigate to the backend:

```bash
cd ~/Developer/STMS-V1/backend
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Verify Python:

```bash
python --version
```

Pull the latest changes:

```bash
git pull
```

Ensure dependencies are synchronized:

```bash
uv sync
```

Start the development server:

```bash
uv run uvicorn app.main:app --reload
```

Begin development.

---

## End Your Day

Stop the running server.

Check project status:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Describe your changes"
```

Push changes:

```bash
git push
```

Deactivate the virtual environment:

```bash
deactivate
```

---

# Code Quality Tools

The project uses several development tools to maintain code quality.

---

## Ruff (Linting)

Check the project for code quality issues:

```bash
uv run ruff check .
```

Automatically fix supported issues:

```bash
uv run ruff check . --fix
```

---

## Black (Code Formatter)

Automatically format the entire project:

```bash
uv run black .
```

Black ensures a consistent code style across the project.

---

## isort (Import Sorting)

Automatically organize Python imports:

```bash
uv run isort .
```

Imports remain clean and consistently ordered.

---

## Pytest (Testing)

Run all automated tests:

```bash
uv run pytest
```

Run a specific test file:

```bash
uv run pytest tests/test_auth.py
```

Run with verbose output:

```bash
uv run pytest -v
```

---

# Git Workflow

Every new feature should follow the standard Git workflow.

Check the current status:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Meaningful commit message"
```

Push to GitHub:

```bash
git push
```

Pull the latest changes before starting new work:

```bash
git pull
```

---

# Common Commands

Activate virtual environment:

```bash
source .venv/bin/activate
```

Deactivate virtual environment:

```bash
deactivate
```

Synchronize dependencies:

```bash
uv sync
```

Add a new dependency:

```bash
uv add package-name
```

Add a development dependency:

```bash
uv add --dev package-name
```

List installed packages:

```bash
uv pip list
```

Update project dependencies:

```bash
uv lock
uv sync
```

---

# Troubleshooting

## Wrong Python Version

Check the active interpreter:

```bash
python --version
```

If necessary, recreate the virtual environment:

```bash
rm -rf .venv
uv venv
source .venv/bin/activate
uv sync
```

---

## Virtual Environment Not Activated

Check the active Python:

```bash
which python
```

Expected:

```
backend/.venv/bin/python
```

---

## Missing Dependencies

Install all project dependencies again:

```bash
uv sync
```

---

## PostgreSQL Not Running

Check PostgreSQL service:

```bash
brew services list
```

Start PostgreSQL:

```bash
brew services start postgresql@17
```

---

## ClickHouse Not Running

Start ClickHouse:

```bash
brew services start clickhouse
```

---

## VS Code Using the Wrong Python Interpreter

Open the Command Palette:

```
Cmd + Shift + P
```

Select:

```
Python: Select Interpreter
```

Choose:

```
backend/.venv/bin/python
```

---

# Development Best Practices

- Always work inside the virtual environment.
- Use `uv sync` after pulling new changes.
- Keep secrets in `.env`.
- Never commit `.env`.
- Format code using Black before committing.
- Check code quality using Ruff.
- Sort imports using isort.
- Write tests for new features whenever possible.
- Write clear and meaningful commit messages.
- Keep modules independent and reusable.

---

# Development Checklist

Before opening a Pull Request or pushing major changes, ensure:

- Virtual environment is active.
- Dependencies are synchronized.
- Code is formatted.
- Imports are sorted.
- Ruff reports no issues.
- Tests pass successfully.
- Documentation is updated if required.
- Meaningful commit message is used.

---

# Conclusion

Your development environment is now fully configured and ready for enterprise backend development.

Following this guide ensures a consistent development workflow across all contributors and helps maintain code quality, project stability, and long-term maintainability.