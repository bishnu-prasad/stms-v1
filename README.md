# STMS V1 (Site Telemetry Management System)

> An enterprise-grade telecom infrastructure monitoring platform developed using FastAPI, React, PostgreSQL, TimescaleDB, and ClickHouse.

---

# Overview

STMS (Site Telemetry Management System) is an enterprise backend platform designed to monitor, manage, and analyze telecom infrastructure in real time.

The platform is being developed as part of an enterprise software engineering initiative to provide centralized monitoring, telemetry processing, alarm management, asset management, and operational insights for telecom infrastructure.

The backend is built using modern software engineering practices, including modular architecture, Clean Architecture principles, RESTful APIs, Role-Based Access Control (RBAC), and scalable database design.

---

# Key Features

### Authentication & Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Secure Password Hashing
- Email OTP Authentication
- Login History
- Audit Logging

### Business Management

- Customer Management
- Vendor Management
- User Management
- Role & Permission Management

### Site Management

- Site Registration
- Equipment Management
- Asset Inventory
- Site Configuration

### Telemetry & Monitoring

- Real-Time Telemetry Processing
- Alarm Management
- Event Monitoring
- Battery Monitoring
- DG Monitoring
- Rectifier Monitoring
- Sensor Monitoring

### Analytics & Reporting

- Operational Dashboards
- Historical Reports
- Alarm Analytics
- Performance Analytics
- Custom Reports

### Notification Services

- Email Notifications
- Scheduled Background Jobs
- Future SMS & Push Notification Support

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Language | Python 3.14 |
| Backend Framework | FastAPI |
| Frontend | React + TypeScript *(Planned)* |
| Database | PostgreSQL |
| Time-Series Database | TimescaleDB |
| Analytics Database | ClickHouse |
| ORM | SQLAlchemy |
| Database Migration | Alembic |
| Authentication | OAuth2 + JWT |
| Password Security | Passlib (bcrypt) |
| Email | FastAPI-Mail |
| Scheduler | APScheduler |
| Configuration | Pydantic Settings |
| Environment Management | python-dotenv |
| Dependency Management | uv |
| Testing | Pytest |
| Linting | Ruff |
| Formatting | Black |
| Import Sorting | isort |

---

# Backend Architecture

The backend follows a modular, feature-based architecture to improve maintainability, scalability, and separation of concerns.

```text
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

# Repository Structure

```text
STMS-V1/
│
├── backend/
│
├── frontend/                 (Planned)
│
├── docs/
│   ├── Architecture.md
│   ├── Database.md
│   ├── API.md
│   ├── Deployment.md
│   ├── Day-01.md
│   └── Day-02.md
│
└── README.md
```

---

# Documentation

| Document | Purpose |
|----------|---------|
| README.md | Project Overview |
| backend/README-Development.md | Development Setup Guide |
| backend/README-Production.md | Production Deployment Guide |
| docs/Architecture.md | System Architecture |
| docs/Database.md | Database Design |
| docs/API.md | API Documentation |
| docs/Deployment.md | Deployment Notes |

---

# Development Status

Current Phase

- ✅ Project Initialization
- ✅ Enterprise Backend Architecture
- ✅ Development Environment Setup
- ✅ Dependency Management
- 🚧 Core Backend Development
- ⏳ Authentication Module
- ⏳ User Management
- ⏳ Customer Management
- ⏳ Site Management
- ⏳ Telemetry Engine
- ⏳ Alarm Engine
- ⏳ Analytics Dashboard
- ⏳ Production Deployment

---

# Development Roadmap

### Phase 1 — Foundation

- Backend Setup
- Configuration
- Database
- Authentication

### Phase 2 — Business Modules

- Users
- Customers
- Vendors
- Sites
- Equipment

### Phase 3 — Monitoring

- Telemetry Processing
- Alarm Engine
- Notification Services
- Scheduler

### Phase 4 — Analytics

- Dashboards
- Reports
- Historical Analytics

### Phase 5 — Production

- Docker
- Nginx
- CI/CD
- Monitoring
- Logging

---

# License

This repository is intended for internal development and learning purposes unless otherwise specified.

---

# Acknowledgement

This project is being developed as part of an internship/training program at **Indio Networks Pvt. Ltd.** using modern enterprise software engineering practices.

The architecture, implementation, and documentation are being built incrementally throughout the development lifecycle.