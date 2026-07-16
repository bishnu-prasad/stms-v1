# Site Telemetry Management System (STMS) — V1

Enterprise-grade IoT site telemetry and management platform designed to monitor, manage, and optimize remote telecom infrastructure. STMS is built from the ground up using a highly scalable, modular, polyglot-database architecture to deliver real-time performance and extensibility.

---

## 📂 Project Repository Structure

STMS is divided into modular components for easier deployment, development, and scaling:

* **[README.md]: Overall system overview, architecture, design patterns, and unified workflows (this document).
* **Backend Services**: [BackendReadme.md]** for setup and technical specifications.
* **Frontend Services**: Built using Next.js, TypeScript, and Tailwind CSS. See **[FrontendReadme.md](create when frontend workspace is initialized) for local development and build instructions.

---

## 🏛️ Architecture & System Design

The STMS architecture utilizes a **polyglot database approach** and a **decoupled processing model** to handle high-frequency telemetry ingestion while keeping the UI responsive.

```text
                           STMS Architecture
                     
                     ┌──────────────────────────────┐
                     │      Next.js Dashboard       │
                     │  (Web Client / real-time UI) │
                     └──────────────────────────────┘
                                     │
                        HTTPS API    │    WebSockets (Real-time Alarms)
                        & Request    │    & Server-Sent Events
                                     ▼
                     ┌──────────────────────────────┐
                     │    FastAPI Gateway Server    │
                     │  (REST API, Auth, Ingest)   │
                     └──────────────────────────────┘
                       │             │            │
         SQLAlchemy    │             │            │ clickhouse-connect
         (pwdlib)      │             │            │
                       ▼             ▼            ▼
                 ┌──────────┐  ┌──────────┐  ┌──────────┐
                 │PostgreSQL│  │Timescale │  │ClickHouse│
                 │    17    │  │    DB    │  │ Analytics│
                 └──────────┘  └──────────┘  └──────────┘
                       ▲             ▲            ▲
                       │             │            │
                       └─────────────┴────────────┘
                                     ▲
                                     │ Reads Raw / Writes Parsed
                       ┌──────────────────────────────┐
                       │  Telemetry Processing Worker  │
                       │  (Asynchronous Logic/Alarms) │
                       └──────────────────────────────┘
                                     ▲
                                     │ IoT Telemetry
                               ┌───────────┐
                               │IoT Devices│
                               └───────────┘
```

### Decoupled Data Flow Model
1. **Ingestion**: Raw telemetry payloads from IoT devices are received by the **FastAPI Gateway**, validated, authenticated, and immediately saved in **TimescaleDB** raw hyper-tables.
2. **Processing**: A background **Telemetry Processing Worker** continuously queries raw records, parses vendor-specific protocols, performs normalizations, evaluates alarm thresholds, and updates the databases:
   - Relational states (like alarm status) are stored in **PostgreSQL**.
   - Structured time-series data is stored in **TimescaleDB**.
   - Aggregated metrics and analytical logs are dispatched to **ClickHouse**.
3. **Delivery**: Alarms and critical state updates trigger the **Notification Worker**, which notifies users instantly via **WebSockets** and schedules emails via **FastAPI-Mail**.

---

## 🛠️ Technology Stack

| Layer / Feature | Technology Stack | Description |
| :--- | :--- | :--- |
| **Programming Language** | Python 3.14 | Application runtime & background services |
| **Backend Framework** | FastAPI | Async high-performance REST API gateway |
| **Frontend Framework** | Next.js (TypeScript) | SSR/Static-generated modular UI |
| **Styling & UI Components**| Tailwind CSS + Shadcn UI | Premium, clean, responsive design system |
| **API Communication** | Axios + React Query | State management, client fetching & caching |
| **Form Handling & Validation**| React Hook Form + Zod | Type-safe schema validation on the client |
| **Charts & Visualization** | Apache ECharts | Responsive data reporting and trend graphs |
| **Advanced Tables** | AG Grid | High-performance interactive data tables |
| **Navigation & Views** | React Arborist | High-performance directory tree views |
| **Transactional DB** | PostgreSQL 17 | Relational business data (Users, Sites, Roles) |
| **Time-Series DB** | TimescaleDB Extension | Ingestion and retention of raw/parsed telemetry |
| **Analytics Warehouse** | ClickHouse | Columnar database for high-speed dashboards & reports |
| **ORM & Migrations** | SQLAlchemy 2.x + Alembic | Modern ORM with migrations |
| **Password Security** | `pwdlib` (bcrypt) | Modern, secure password hashing |
| **Authentication** | OAuth2 + JWT (with Refresh Tokens) | Stateless sessions & token rotation |
| **Background Scheduler** | APScheduler | Centralized cron, database backups & reports |
| **Real-Time Delivery** | WebSockets | Instant telemetry updates & alarm notifications |
| **Reverse Proxy & Gateway** | Nginx | SSL termination, reverse routing & static delivery |
| **CI / CD** | GitHub Actions | Automated linting, test suites, and deployments |

---

## 📐 Clean Architecture Design Pattern

STMS implements a highly modular Clean Architecture. It uses distinct boundary layers separating the **API endpoints** from **Business Services** and **Repositories**. This ensures components can be tested independently and database drivers can be swapped without rewriting business rules.

```text
   ┌───────────────────────────┐
   │     Next.js (Frontend)    │
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │     FastAPI Controller    │
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │      Service Layer        │
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │     Repository Layer      │
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │   SQLAlchemy / Drivers    │
   └───────────────────────────┘
```

---

## ⚡ Core System Workflows

The following diagrams illustrate the interactions between the Next.js frontend, FastAPI backend, background workers, and polyglot databases.

### 📡 1. Telemetry Ingestion & Processing

This workflow illustrates how high-frequency payloads from remote IoT devices are accepted, saved, analyzed, and propagated to the real-time UI.

```text
                  [ IoT Devices ]
                         │
                         │ POST /api/v1/telemetry
                         ▼
        ┌──────────────────────────────────┐
        │      FastAPI Gateway Server      │
        │  (Validates & Authenticates)     │
        └──────────────┬───────────────────┘
                       │ Insert Raw Payload
                       ▼
        ┌──────────────────────────────────┐
        │  TimescaleDB (Raw Hypertable)    │
        └──────────────┬───────────────────┘
                       │ Polled continuously
                       ▼
        ┌──────────────────────────────────┐
        │   Telemetry Processing Worker    │
        │   (Parses & Normalizes Data)     │
        └───────┬──────────────┬───────────┘
                │              │ Evaluate Alarms
                ▼              ▼
     ┌──────────────┐   ┌──────────────┐
     │  ClickHouse  │   │  PostgreSQL  │
     │ (Analytics)  │   │ (State/Rules)│
     └──────────────┘   └──────┬───────┘
                               │ Trigger if Alarm
                               ▼
                        ┌──────────────┐
                        │Notification &│
                        │WebSockets    │
                        └──────────────┘
```

### ⚙️ 2. Configuration Update Workflow

This bidirectional sync workflow handles changing configurations on the administrative dashboard and sending those instructions downstream to IoT devices during their check-in cycles.

```text
   [ Next.js Dashboard ]               [ IoT Device ]
            │                                │
            │ 1. Update Config               │
            ▼                                │
  ┌───────────────────┐                      │
  │  FastAPI Gateway  │                      │
  └─────────┬─────────┘                      │
            │ 2. Save (Desired)              │
            ▼                                │
  ┌───────────────────┐                      │
  │    PostgreSQL     │                      │
  └─────────┬─────────┘                      │
            │                                │
            │ 4. Read Config                 │ 3. Send Telemetry
            ▼                                ▼
  ┌──────────────────────────────────────────────┐
  │         Telemetry Processing Worker          │
  │    (Compares Desired vs Current Config)      │
  └──────────────────────┬───────────────────────┘
                         │ 5. Generate Commands (If Mismatch)
                         ▼
  ┌──────────────────────────────────────────────┐
  │  FastAPI returns 200 OK w/ Config Commands   │
  └──────────────────────┬───────────────────────┘
                         │ 6. Apply Config
                         ▼
                  [ IoT Device ]
```

### 🔐 3. User Authentication & 2FA Flow

This secure authentication architecture details user verification, Email One-Time Password (2FA) verification, and token management.

```text
    [ User / Next.js UI ]
            │
            │ 1. Login (Email & Password)
            ▼
  ┌───────────────────┐
  │  FastAPI Gateway  │
  │  (Auth Service)   │
  └─────────┬─────────┘
            │ 2. Check User & verify (pwdlib)
            ▼
  ┌───────────────────┐
  │    PostgreSQL     │
  └─────────┬─────────┘
            │ 3. Check 2FA Settings
            ▼
      Is 2FA Enabled?
       /           \
    [NO]          [YES] ──────────────┐
     │                                │ 4. Generate & Queue OTP
     │ 5. Generate JWT                ▼
     │                         ┌──────────────┐
     ▼                         │ Notification │
  [ Success ]                  │    Worker    │
 (Return Tokens)               └──────┬───────┘
                                      │ 5. Send Email via SMTP
                                      ▼
                                [ User Inbox ]
                                      │ 6. Submit OTP
                                      ▼
                            ┌───────────────────┐
                            │  FastAPI Gateway  │
                            │ (Validate in DB)  │
                            └─────────┬─────────┘
                                      │ 7. Generate JWT
                                      ▼
                                 [ Success ]
                               (Return Tokens)
```
