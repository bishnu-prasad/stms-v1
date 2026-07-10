
# STMS V1 Backend

> Enterprise-grade FastAPI backend for the Site Telemetry Management System (STMS).

---

# Backend Overview

The STMS backend is designed using a **feature-based modular architecture** to provide a scalable, maintainable, and enterprise-ready foundation for telecom infrastructure monitoring.

The backend is responsible for:

- User Authentication & Authorization
- Customer & Vendor Management
- Site Management
- Equipment Management
- Real-Time Telemetry Processing
- Alarm Management
- Background Jobs
- Email Services
- Reporting & Analytics
- REST API Services

The project follows Clean Architecture principles by separating infrastructure, shared components, and business modules.

---


# Folder Structure


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
│   ├── main.py
│   └── __init__.py
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

# Folder Responsibilities

## app/

The root package containing the complete FastAPI application.

---

## api/

Contains the API router registration and global API dependencies.

Responsibilities:

- Register module routers
- API versioning
- Global dependencies

Example:

```
api/
├── router.py
└── dependencies.py
```

---

## common/

Contains reusable components shared across multiple modules.

Examples:

- Custom Exceptions
- Validators
- Response Models
- Utility Functions
- Shared Enums
- Pagination

If multiple modules require the same functionality, it belongs here.

---

## core/

Application-wide configuration.

Responsibilities:

- Settings
- Logging
- Constants
- Startup & Shutdown Events
- Configuration Management

Example:

```
core/
├── settings.py
├── config.py
├── logging.py
└── lifespan.py
```

---

## db/

Database infrastructure.

Responsibilities:

- SQLAlchemy Engine
- Database Session
- Base ORM Class
- Database Utilities
- Alembic Integration

Example:

```
db/
├── session.py
├── base.py
├── database.py
└── migrations/
```

---

## modules/

Contains all business modules.

Each module is completely isolated.

Example:

```
modules/
├── auth/
├── users/
├── customers/
├── vendors/
├── sites/
├── telemetry/
├── alarms/
└── reports/
```

Every module owns its own:

- Router
- Service
- Repository
- Model
- Schema

---

## jobs/

Contains scheduled background jobs.

Examples:

- Scheduler
- Telemetry Jobs
- Cleanup Jobs
- Report Generation

Powered by APScheduler.

---

## mail/

Responsible for all outgoing email functionality.

Examples:

- OTP Emails
- Welcome Emails
- Password Reset Emails
- Alarm Notification Emails

---

## static/

Contains static assets served by the backend.

Examples:

- Logos
- PDF Reports
- Export Files
- Documentation Assets

---

## tests/

Contains automated test cases.

Testing includes:

- Unit Tests
- Integration Tests
- API Tests

---

# Module Architecture

Each business module follows the same internal structure.

Example:

```text
modules/
└── auth/
    ├── router.py
    ├── service.py
    ├── repository.py
    ├── model.py
    ├── schema.py
    ├── security.py
    └── constants.py
```

## router.py

Defines API endpoints.

Example:

```
POST /login
POST /refresh-token
POST /logout
```

---

## service.py

Contains business logic.

Responsible for:

- Authentication
- Validation
- Processing
- Business Rules

---

## repository.py

Handles all database operations.

Responsibilities:

- CRUD Operations
- Database Queries
- Transactions

---

## model.py

Contains SQLAlchemy ORM models.

Example:

```
User
Customer
Site
Alarm
```

---

## schema.py

Contains Pydantic request and response models.

Examples:

- LoginRequest
- LoginResponse
- UserCreate
- CustomerResponse

---

## security.py

Contains security-related utilities.

Examples:

- JWT
- Password Hashing
- Token Validation

---

## constants.py

Stores module-specific constants.

Examples:

- User Roles
- Permission Names
- Status Values

---

# Configuration Overview

The backend configuration is centralized within the **core** package.

Configuration includes:

- Application Settings
- Environment Variables
- Database URLs
- JWT Configuration
- SMTP Configuration
- Logging Configuration

Environment variables are loaded using:

- Pydantic Settings
- python-dotenv

No sensitive configuration should be hardcoded.

---

# Design Principles

The backend follows the following principles:

- Feature-Based Modular Architecture
- Clean Architecture
- Separation of Concerns
- Single Responsibility Principle
- Dependency Injection
- Reusable Components
- Scalable Project Structure
- RESTful API Design

---

# Development Workflow

Every new feature should follow this process:

1. Create a new module (if required)
2. Define database models
3. Create Pydantic schemas
4. Implement repository layer
5. Implement business service
6. Expose API routes
7. Write tests
8. Update documentation

---

# Conclusion

The STMS backend architecture is designed to provide a scalable, maintainable, and enterprise-grade foundation capable of supporting large-scale telecom infrastructure management while remaining modular and easy to extend as new business requirements are introduced.