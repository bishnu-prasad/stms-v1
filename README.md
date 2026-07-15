# STMS V1 Backend

Enterprise-grade FastAPI backend for the Site Telemetry Management System (STMS).

---

## Table of Contents

* Overview
* Architecture Overview
* Technology Stack
* Current Status
* Prerequisites
* Quick Start
* Setup: macOS
* Setup: Linux
* Setup: Windows
* Environment Variables
* Database Setup
* Database Migrations
* Running the Application
* API Documentation
* Project Structure
* Development Workflow
* Troubleshooting
* Future Roadmap
* Contributing
* License

---

## Overview

The Site Telemetry Management System (STMS) is an enterprise-grade backend platform designed to manage, monitor, analyze, and maintain telecom infrastructure from a centralized system.

The application is being developed using FastAPI and follows a feature-based modular architecture that separates each business domain into its own module. This architecture improves scalability, maintainability, and code organization, making the project suitable for long-term enterprise development.

STMS is designed to support multiple user roles, customer organizations, telecom sites, equipment management, telemetry processing, alarm management, reporting, analytics, notifications, and future integrations with external systems.

The project emphasizes clean architecture, reusable components, database version control, environment-based configuration, and modern Python development practices.

---

## Architecture Overview

```text
                          STMS V1
                    Client Applications
        ┌────────────────────────────────────┐
        │                                    │
        │  Web Portal / Mobile / REST Client │
        │                                    │
        └────────────────────────────────────┘
                       │
                  HTTP / HTTPS
                       │
                       ▼
        ┌────────────────────────────────────┐
        │           FastAPI Backend          │
        │                                    │
        │ • REST API                         │
        │ • Authentication                   │
        │ • Business Logic                   │
        │ • Validation                       │
        │ • Background Jobs                  │
        └────────────────────────────────────┘
                 │                     │
                 ▼                     ▼
         SQLAlchemy ORM       ClickHouse Client
                 │                     │
                 ▼                     ▼
          PostgreSQL 17          ClickHouse
                 │                     │
                 ▼                     ▼
        TimescaleDB Extension   Analytics & Reports
                 │
                 ▼
   Relational & Time-Series Data
```

---

## Technology Stack

| Category | Technology |
| --- | --- |
| Programming Language | Python 3.14 |
| Framework | FastAPI |
| Package Manager | uv |
| ASGI Server | Uvicorn |
| Relational Database | PostgreSQL 17 |
| Time-Series Database | TimescaleDB 2.x |
| Analytics Database | ClickHouse 26 |
| ORM | SQLAlchemy 2.x |
| Database Driver | Psycopg |
| ClickHouse Client | clickhouse-connect |
| Database Migration | Alembic |
| Validation | Pydantic v2 |
| Configuration | Pydantic Settings |
| Environment Variables | Python Dotenv |
| Authentication | python-jose |
| Password Hashing | Passlib |
| Background Scheduler | APScheduler |
| Email Service | FastAPI-Mail |
| API Documentation | Swagger UI & ReDoc |

---

## Current Status

The project is currently in the foundation phase.

The following components have been established:

* Enterprise project structure
* FastAPI application initialization
* Environment configuration
* PostgreSQL configuration
* TimescaleDB integration
* ClickHouse integration
* SQLAlchemy ORM integration
* ClickHouse client configuration
* Alembic migration setup
* Pydantic Settings configuration
* Application configuration management
* Development environment setup
* Modular architecture foundation

The following modules are planned during development:

* Authentication & Authorization
* User Management
* Customer Management
* Vendor Management
* Site Management
* Equipment Management
* Telemetry Management
* Alarm Management
* Dashboard & Analytics
* Inventory Management
* Reports
* Notifications
* Audit Logs

---

## Why Feature-Based Architecture?

Unlike traditional layer-based applications where models, services, and repositories are stored in separate global folders, STMS follows a feature-based modular architecture.

Each business feature owns its complete implementation.

Example:

```text
modules/
└── customers/
    ├── api/
    ├── models.py
    ├── schemas.py
    ├── repository.py
    ├── service.py
    └── dependencies.py
```

Benefits of this architecture:

* Better code organization
* Easier maintenance
* Clear separation of business domains
* Reduced coupling between modules
* Easier onboarding for new developers
* Better scalability for enterprise applications

---

## Prerequisites

Before running the project, install the following software.

| Software | Minimum Version | Purpose |
| --- | --- | --- |
| Python | 3.14 | Application Runtime |
| uv | Latest | Package Manager |
| Git | Latest | Version Control |
| PostgreSQL | 17 | Relational Database |
| TimescaleDB | 2.x | Time-Series Extension |
| ClickHouse | 26 | Analytics Database |

Verify your installation.

```bash
python --version
uv --version
git --version
psql --version
clickhouse server --version
```

---

## Quick Start

The quickest way to run STMS locally is:

```bash
# Clone the repository
git clone https://github.com/bishnu-prasad/STMS-V1.git
# Move into backend
cd STMS-V1/backend
# Create virtual environment
uv venv
# Activate virtual environment
source .venv/bin/activate
# Install dependencies
uv sync
# Copy environment configuration
cp .env.example .env
# Configure PostgreSQL and ClickHouse values inside .env
# Run the application
uv run uvicorn app.main:app --reload
```

Once the server starts successfully, open:

### Swagger UI

http://127.0.0.1:8000/docs

### ReDoc

http://127.0.0.1:8000/redoc

### Application Root

http://127.0.0.1:8000/

---

## Setup

The following sections explain how to install and run the project on different operating systems.

* macOS
* Linux
* Windows

Each platform includes:

* Installing required software
* Setting up PostgreSQL
* Configuring TimescaleDB
* Setting up ClickHouse
* Creating the virtual environment
* Installing dependencies
* Configuring environment variables
* Running database migrations
* Running the backend
* Verifying the installation

## Setup: macOS

The project has been tested on macOS (Apple Silicon and Intel) using Python 3.14, PostgreSQL 17, TimescaleDB, ClickHouse 26, and the uv package manager.

---

### Step 1 — Install Homebrew

If Homebrew is not installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify installation:

```bash
brew --version
```

---

### Step 2 — Install Required Software

Install Python, PostgreSQL, TimescaleDB, ClickHouse, Git, and uv.

```bash
brew install python@3.14
brew install postgresql@17
brew install timescaledb
brew install clickhouse
brew install git
brew install uv
```

Verify installation.

```bash
python3 --version
uv --version
git --version
psql --version
clickhouse server --version
```

---

### Step 3 — Start PostgreSQL

Start PostgreSQL as a background service.

```bash
brew services start postgresql@17
```

Check its status.

```bash
brew services list
```

---

### Step 4 — Configure PostgreSQL & TimescaleDB

Open PostgreSQL.

```bash
psql postgres
```

Create the project database.

```sql
CREATE DATABASE stms_db;
```

Connect to the database.

```sql
\c stms_db
```

Enable the TimescaleDB extension.

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

Verify the extension.

```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname='timescaledb';
```

Exit PostgreSQL.

```sql
\q
```

---

### Step 5 — Start ClickHouse

Start the ClickHouse server.

```bash
clickhouse server
```

Leave this terminal running.

Open a new terminal and connect to ClickHouse.

```bash
clickhouse client
```

Create the analytics database.

```sql
CREATE DATABASE IF NOT EXISTS stms_analytics;
```

Verify the database.

```sql
SHOW DATABASES;
```

Exit ClickHouse.

```bash
exit
```

---

### Step 6 — Clone Repository

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
```

Move into the backend directory.

```bash
cd STMS-V1/backend
```

---

### Step 7 — Create Virtual Environment

```bash
uv venv
```

---

### Step 8 — Activate Virtual Environment

```bash
source .venv/bin/activate
```

Your terminal should now display the virtual environment.

Example:

```text
(.venv) MacBook-Air backend %
```

---

### Step 9 — Install Dependencies

```bash
uv sync
```

This installs all runtime and development dependencies defined in:

* pyproject.toml
* uv.lock

---

### Step 10 — Create Environment File

Copy the example environment file.

```bash
cp .env.example .env
```

Open the file.

```bash
open .env
```

Update the database configuration.

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=stms_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
CLICKHOUSE_HOST=localhost
CLICKHOUSE_PORT=8123
CLICKHOUSE_DATABASE=stms_analytics
CLICKHOUSE_USERNAME=default
CLICKHOUSE_PASSWORD=
```

The project includes a .env.example file containing all required environment variables. Copy it to .env and update the values for your local development environment.

---

### Step 11 — Run Database Migrations

Apply all database migrations.

```bash
uv run alembic upgrade head
```

---

### Step 12 — Run the Backend

Start the FastAPI development server.

```bash
uv run uvicorn app.main:app --reload
```

Expected output:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

---

### Step 13 — Verify Installation

Open the following URLs in your browser.

#### Swagger UI

http://127.0.0.1:8000/docs

#### ReDoc

http://127.0.0.1:8000/redoc

#### Application

http://127.0.0.1:8000/

If all pages load successfully, the STMS backend has been configured correctly and is ready for development.

---

## Setup: Linux

The project supports Ubuntu, Debian, Fedora, and other modern Linux distributions.

---

### Step 1 — Install Required Packages

Install Python, PostgreSQL, Git, curl, and development tools.

```bash
sudo apt update
sudo apt install git python3.14 python3.14-venv postgresql postgresql-contrib curl
```

Install TimescaleDB according to the official installation guide for your Linux distribution and PostgreSQL version.

Install ClickHouse using the official ClickHouse packages for your distribution.

Install uv.

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Restart the terminal.

Verify installation.

```bash
python3 --version
uv --version
psql --version
clickhouse server --version
```

---

### Step 2 — Start PostgreSQL

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

---

### Step 3 — Configure PostgreSQL & TimescaleDB

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE stms_db;
\c stms_db
CREATE EXTENSION IF NOT EXISTS timescaledb;
\q
```

---

### Step 4 — Start ClickHouse

```bash
clickhouse server
```

Open another terminal.

```bash
clickhouse client
```

```sql
CREATE DATABASE IF NOT EXISTS stms_analytics;
SHOW DATABASES;
```

Exit ClickHouse.

---

### Step 5 — Clone Repository

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/backend
```

---

### Step 6 — Create Virtual Environment

```bash
uv venv
```

---

### Step 7 — Activate Environment

```bash
source .venv/bin/activate
```

---

### Step 8 — Install Dependencies

```bash
uv sync
```

---

### Step 9 — Configure Environment

```bash
cp .env.example .env
```

Edit .env and configure PostgreSQL and ClickHouse.

---

### Step 10 — Run Database Migrations

```bash
uv run alembic upgrade head
```

---

### Step 11 — Start Backend

```bash
uv run uvicorn app.main:app --reload
```

---

### Step 12 — Verify Installation

Open:

http://127.0.0.1:8000/docs

---

## Setup: Windows

The project supports Windows 10 and Windows 11.

Windows Subsystem for Linux (WSL2) is recommended for the best development experience, although native Windows is also supported.

---

### Step 1 — Install Software

Install:

* Python 3.14
* Git
* PostgreSQL 17
* TimescaleDB
* ClickHouse
* uv

Verify installation.

```bash
python --version
uv --version
git --version
psql --version
clickhouse server --version
```

---

### Step 2 — Clone Repository

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1\backend
```

---

### Step 3 — Create Virtual Environment

```bash
uv venv
```

---

### Step 4 — Activate Virtual Environment

```bash
.venv\Scripts\activate
```

---

### Step 5 — Install Dependencies

```bash
uv sync
```

---

### Step 6 — Copy Environment File

```bash
copy .env.example .env
```

Update PostgreSQL and ClickHouse configuration inside .env.

---

### Step 7 — Configure PostgreSQL & TimescaleDB

Open SQL Shell (psql).

```sql
CREATE DATABASE stms_db;
\c stms_db
CREATE EXTENSION IF NOT EXISTS timescaledb;
\q
```

---

### Step 8 — Configure ClickHouse

Start the ClickHouse server.

```bash
clickhouse server
```

Open another terminal.

```bash
clickhouse client
```

```sql
CREATE DATABASE IF NOT EXISTS stms_analytics;
SHOW DATABASES;
```

---

### Step 9 — Run Database Migrations

```bash
uv run alembic upgrade head
```

---

### Step 10 — Start Backend

```bash
uv run uvicorn app.main:app --reload
```

---

### Step 11 — Verify Installation

#### Swagger UI

http://127.0.0.1:8000/docs

#### ReDoc

http://127.0.0.1:8000/redoc

#### Application

http://127.0.0.1:8000/

If all pages open successfully, the STMS backend has been configured correctly and is ready for development.

## Environment Variables

The application uses environment variables to configure the runtime environment, database connections, authentication, email services, and other external dependencies.

A template file named .env.example is included with the project.

Create your local configuration by copying the template.

### macOS / Linux

```bash
cp .env.example .env
```

### Windows

```bash
copy .env.example .env
```

Update the values according to your local development environment.

```env
# ==========================================
# Application
# ==========================================
APP_NAME=STMS V1
APP_VERSION=0.1.0
APP_ENV=development
DEBUG=True
# ==========================================
# PostgreSQL
# ==========================================
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=stms_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
# ==========================================
# ClickHouse
# ==========================================
CLICKHOUSE_HOST=localhost
CLICKHOUSE_PORT=8123
CLICKHOUSE_DATABASE=stms_analytics
CLICKHOUSE_USERNAME=default
CLICKHOUSE_PASSWORD=
# ==========================================
# JWT Authentication
# ==========================================
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
# ==========================================
# Email Configuration
# ==========================================
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_FROM=your_email@example.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=True
MAIL_SSL_TLS=False
```

Note: TimescaleDB does not require separate environment variables because it is a PostgreSQL extension. Once PostgreSQL is configured and the TimescaleDB extension is enabled, the application automatically uses its time-series capabilities through the existing PostgreSQL connection.

---

## Database Setup

STMS uses multiple database technologies, each serving a different purpose.

| Database | Purpose |
| --- | --- |
| PostgreSQL 17 | Primary relational database |
| TimescaleDB | Time-series storage for telemetry data |
| ClickHouse | Analytics, reporting, and dashboard queries |

### PostgreSQL

Stores all transactional and business data, including:

* Users
* Roles & Permissions
* Customers
* Vendors
* Sites
* Equipment
* Inventory
* Configuration
* Audit Logs

### TimescaleDB

TimescaleDB extends PostgreSQL and is used for high-volume time-series data, including:

* Raw telemetry
* Sensor values
* Historical device measurements
* Time-series queries
* Data retention policies

### ClickHouse

ClickHouse is used for analytical workloads, including:

* Dashboard analytics
* KPI calculations
* Historical reports
* Trend analysis
* Aggregated telemetry
* High-speed reporting

---

## Database Migrations

STMS uses Alembic to manage database schema changes.

Apply all pending migrations.

```bash
uv run alembic upgrade head
```

Check the current migration version.

```bash
uv run alembic current
```

View migration history.

```bash
uv run alembic history
```

Create a new migration after modifying SQLAlchemy models.

```bash
uv run alembic revision --autogenerate -m "migration description"
```

Upgrade to the latest version.

```bash
uv run alembic upgrade head
```

Rollback the most recent migration.

```bash
uv run alembic downgrade -1
```

Rollback to a specific migration.

```bash
uv run alembic downgrade <revision_id>
```

---

## Running the Application

Activate the virtual environment before starting the application.

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Ensure PostgreSQL is running.

### macOS

```bash
brew services start postgresql@17
```

Ensure the ClickHouse server is running.

```bash
clickhouse server
```

Run the FastAPI development server.

```bash
uv run uvicorn app.main:app --reload
```

Expected output:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
INFO: Application startup complete.
```

---

## API Documentation

Once the application is running, interactive API documentation is available.

| URL | Description |
| --- | --- |
| http://127.0.0.1:8000/docs | Swagger UI |
| http://127.0.0.1:8000/redoc | ReDoc |
| http://127.0.0.1:8000/openapi.json | OpenAPI Specification |

Swagger UI allows developers to:

* Explore available endpoints
* Execute API requests
* View request and response schemas
* Test authentication
* Inspect API documentation

ReDoc provides a clean, structured API reference suitable for developers and technical documentation.

---

## Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   ├── common/
│   ├── core/
│   ├── db/
│   │   ├── base.py
│   │   ├── clickhouse.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   └── session.py
│   │
│   ├── jobs/
│   ├── mail/
│   ├── modules/
│   │   ├── telemetry/
│   │   ├── auth/
│   │   ├── customers/
│   │   ├── vendors/
│   │   ├── sites/
│   │   └── ...
│   │
│   ├── static/
│   ├── __init__.py
│   └── main.py
│
├── tests/
├── .env.example
├── pyproject.toml
├── uv.lock
└── README.md
```

## API Documentation

Once the application is running, interactive API documentation is automatically generated by FastAPI.

### Swagger UI

http://127.0.0.1:8000/docs

Swagger UI allows developers to:

* Browse all available API endpoints
* Execute requests directly from the browser
* View request and response models
* Test authentication
* Explore API schemas

### ReDoc

http://127.0.0.1:8000/redoc

ReDoc provides a clean, structured API reference suitable for developers and technical documentation.

### OpenAPI Specification

http://127.0.0.1:8000/openapi.json

The OpenAPI specification can be used for API integrations, client SDK generation, and third-party tooling.

---

## Project Structure

The backend follows a feature-based modular architecture where each business domain owns its API, models, schemas, services, and repository.

```text
backend/
│
├── app/
│   ├── api/                     # Global API configuration
│   ├── common/                  # Shared utilities
│   ├── core/                    # Application configuration
│   ├── db/                      # Database configuration
│   │   ├── base.py
│   │   ├── clickhouse.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   └── session.py
│   │
│   ├── jobs/                    # Scheduled jobs
│   ├── mail/                    # Email services
│   ├── modules/                 # Business modules
│   │   ├── auth/
│   │   ├── customers/
│   │   ├── vendors/
│   │   ├── sites/
│   │   ├── telemetry/
│   │   ├── alarms/
│   │   └── ...
│   │
│   ├── static/
│   ├── __init__.py
│   └── main.py
│
├── tests/
├── .env.example
├── pyproject.toml
├── uv.lock
└── README.md
```

---

## Development Workflow

The recommended workflow for local development is shown below.

### 1. Activate the virtual environment

#### macOS / Linux

```bash
source .venv/bin/activate
```

#### Windows

```bash
.venv\Scripts\activate
```

---

### 2. Start PostgreSQL

#### macOS

```bash
brew services start postgresql@17
```

#### Linux

```bash
sudo systemctl start postgresql
```

---

### 3. Start ClickHouse

```bash
clickhouse server
```

---

### 4. Install or update dependencies

```bash
uv sync
```

---

### 5. Apply database migrations

```bash
uv run alembic upgrade head
```

---

### 6. Start the FastAPI development server

```bash
uv run uvicorn app.main:app --reload
```

---

### 7. Open Swagger UI

http://127.0.0.1:8000/docs

---

### 8. Stop the application

Stop Uvicorn.

```text
CTRL + C
```

Deactivate the virtual environment.

```bash
deactivate
```

---

## Troubleshooting

### PostgreSQL is not running

#### macOS

Check the service status.

```bash
brew services list
```

Start PostgreSQL.

```bash
brew services start postgresql@17
```

---

#### Linux

```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
```

---

### ClickHouse server is not running

Start the server.

```bash
clickhouse server
```

Verify the connection.

```bash
clickhouse client
```

---

### TimescaleDB extension is missing

Connect to PostgreSQL.

```bash
psql -d stms_db
```

Install the extension.

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
```

Verify installation.

```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname = 'timescaledb';
```

---

### Dependencies are missing

Synchronize all dependencies.

```bash
uv sync
```

---

### Virtual environment is not activated

#### macOS / Linux

```bash
source .venv/bin/activate
```

#### Windows

```bash
.venv\Scripts\activate
```

---

### Verify the Python interpreter

#### macOS / Linux

```bash
which python
```

#### Windows

```bash
where python
```

The interpreter should point to the project’s virtual environment.

Example:

```text
backend/.venv/bin/python
```

---

### Verify database connections

#### PostgreSQL

```bash
psql -d stms_db
```

#### ClickHouse

```bash
clickhouse client
```

If both connections succeed, the backend database infrastructure has been configured correctly.