# STMS V1 Backend

Enterprise-grade FastAPI backend for the Site Telemetry Management System (STMS).

---

<!-- # Current Status

This project is currently in the foundation phase.

Implemented:

- FastAPI Application
- Environment Configuration
- PostgreSQL Configuration
- SQLAlchemy Database Foundation
- Project Structure

Swagger UI is available after starting the application.

--- -->

<!-- # Technology Stack

| Component | Technology |
|-----------|------------|
| Python | 3.14 |
| Framework | FastAPI |
| Package Manager | uv |
| Database | PostgreSQL 17 |
| ORM | SQLAlchemy 2.x |
| Migrations | Alembic |
| Configuration | Pydantic Settings |
| Authentication | python-jose |
| Password Hashing | Passlib |
| Email | FastAPI-Mail |
| Scheduler | APScheduler |

--- -->

<!-- # Prerequisites

Install the following software before running the project.

- Git
- Python 3.14
- uv
- PostgreSQL 17

--- -->

# Clone Repository

```bash
git clone <repository-url>
```

Move into the backend directory.

```bash
cd STMS-V1/backend
```

---

# Create Virtual Environment

```bash
uv venv
```

---

# Activate Virtual Environment

macOS / Linux

```bash
source .venv/bin/activate
```

Windows

```powershell
.venv\Scripts\activate
```

---

# Install Dependencies

```bash
uv sync
```

This command installs all runtime and development dependencies defined in:

- pyproject.toml
- uv.lock

---

# Create Environment File

Copy the example configuration.

macOS / Linux

```bash
cp .env.example .env
```

Windows

```powershell
copy .env.example .env
```

Update the following values according to your local PostgreSQL installation.

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=stms_db
DATABASE_USER=<your_postgresql_user>
DATABASE_PASSWORD=<your_postgresql_password>
```

---

# Create PostgreSQL Database

Open PostgreSQL.

```bash
psql postgres
```

Create the database.

```sql
CREATE DATABASE stms_db;
```

Exit PostgreSQL.

```sql
\q
```

---

# Run the Backend

Start the development server.

```bash
uv run uvicorn app.main:app --reload
```

Expected output:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

---

# Open Swagger

Open your browser.

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

Current Root Endpoint

```
http://127.0.0.1:8000/
```

Expected Response

```json
{
    "message": "Welcome to STMS V1",
    "version": "0.1.0",
    "environment": "development",
    "debug": true
}
```

---

# Project Structure

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
├── .env.example
├── pyproject.toml
├── uv.lock
└── README.md
```

---

<!-- # Development Workflow

Activate the virtual environment.

```bash
source .venv/bin/activate
```

Synchronize dependencies.

```bash
uv sync
```

Run the backend.

```bash
uv run uvicorn app.main:app --reload
```

Deactivate the virtual environment.

```bash
deactivate
```

---

# Troubleshooting

### PostgreSQL is not running

Check services.

```bash
brew services list
```

Start PostgreSQL.

```bash
brew services start postgresql@17
```

---

### Dependencies missing

Run:

```bash
uv sync
```

---

### Wrong Python Interpreter

Verify:

```bash
which python
```

Expected:

```
backend/.venv/bin/python
```
 -->
