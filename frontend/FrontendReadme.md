# STMS V1 Frontend

Enterprise-grade Next.js frontend for the Site Telemetry Management System (STMS).

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
* Project Structure
* Development Workflow
* Troubleshooting
* Future Roadmap
* Contributing
* License

---

## Overview

The Site Telemetry Management System (STMS) Frontend is an enterprise-grade web application designed to manage, monitor, analyze, and maintain telecom infrastructure from a centralized dashboard.

The application is built using Next.js 16 (App Router) with TypeScript and Tailwind CSS, utilizing best practices in modern web development to construct responsive, highly performant, and premium interfaces.

STMS supports multiple user roles (Platform Owner, Super Admin, Customer organization, Vendor partner, Field Engineer) with role-based routing. It leverages modern libraries for real-time telemetry charting (Apache ECharts), telemetry tree-view hierarchies (React Arborist), tabular alarm lists (AG Grid), and secure client-side JWT-based session management.

---

## Architecture Overview

```text
                           STMS V1
                      Client Application
         ┌───────────────────────────────────────┐
         │         Next.js Web Portal            │
         │                                       │
         │  • App Router (Next.js 16)            │
         │  • TypeScript                         │
         │  • Tailwind CSS / CSS Modules         │
         └───────────────────────────────────────┘
                        │
                  HTTP / HTTPS
                        │
                        ▼
         ┌───────────────────────────────────────┐
         │             Client Library            │
         │                                       │
         │  • Axios (HTTP client)                │
         │  • React Query (Cache & State)        │
         │  • React Hook Form (Forms)            │
         │  • Zod (Validation Schema)            │
         └───────────────────────────────────────┘
                  │                     │
                  ▼                     ▼
         ┌─────────────────┐   ┌──────────────────┐
         │ FastAPI REST    │   │ Local Storage    │
         │   Backend API   │   │  sessionStorage  │
         └─────────────────┘   └──────────────────┘
```

---

## Technology Stack

| Category | Technology | Purpose |
| --- | --- | --- |
| Core Framework | Next.js 16 (App Router) | Application Structure & SSR/CSR Routing |
| Programming Language | TypeScript | Type Safety & Dev Experience |
| Styling (CSS) | Tailwind CSS v4 | CSS Utility Framework & Styling |
| UI Components | Shadcn UI | Premium, Accessible Radix-based Components |
| API Communication | Axios | HTTP client for backend request handling |
| Data Fetching | React Query (TanStack Query) | Server state management, cache, & polling |
| Form Handling | React Hook Form | High-performance React form state controller |
| Validation | Zod | Runtime type safety & form validation schemas |
| Charts | Apache ECharts | Rich, interactive time-series telemetry charts |
| Tables | AG Grid | High-performance tabular alarm/site data grids |
| Tree View | React Arborist | Hierarchical site/equipment structure tree view |
| Package Manager | npm | Native Package & Script Executor |

---

## Current Status

The project is currently in the initial integration phase.

The following components have been established:

* Next.js App Router initialization
* Basic routing layout (login & dashboard)
* Session storage-based JWT authentication flow
* Axios wrapper interceptors for Bearer token auth
* Universal, premium split-screen login page matching design guidelines
* Tailwind CSS utility integration

The following integrations are planned during development:

* **Shadcn UI Setup**: Integrating accessible components (Dialogs, Dropdowns, Sheets, Tables)
* **React Query Hydration**: Setting up TanStack query client providers for telemetry data caching
* **AG Grid Integration**: Creating high-density data tables for alarm logs, events, and site details
* **Apache ECharts Dashboards**: Plotting historical battery voltage, temperature, and power grid analytics
* **React Arborist Views**: Displaying organizational tree-hierarchies of Regions → Circles → Sites → Equipment

---

## Prerequisites

Before running the project, install the following software.

| Software | Minimum Version | Purpose |
| --- | --- | --- |
| Node.js | v18.x or v20.x (LTS) | Application Runtime Environment |
| npm | Latest (v10+) | Package Manager |
| Git | Latest | Version Control |

Verify your installation.

```bash
node --version
npm --version
git --version
```

---

## Quick Start

The quickest way to run the STMS Frontend locally is:

```bash
# Clone the repository
git clone https://github.com/bishnu-prasad/STMS-V1.git
# Move into frontend
cd STMS-V1/frontend
# Install dependencies
npm install
# Copy environment configuration
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL inside .env.local if backend is hosted on a custom port
# Start the development server
npm run dev
```

Once the server starts successfully, open:

### Local Web Client

http://localhost:3000

---

## Setup: macOS

The project has been tested on macOS using Node.js v20 (LTS) and the standard npm package manager.

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

### Step 2 — Install Node.js & Git

Install Node.js (LTS), Git, and verify the install.

```bash
brew install node
brew install git
```

Verify installation:

```bash
node -v
npm -v
git --version
```

---

### Step 3 — Clone Repository & Install

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/frontend
npm install
```

---

### Step 4 — Configure Environment Variables

Create and configure your local environment configuration:

```bash
cp .env.example .env.local
```

Open the file and verify values:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

### Step 5 — Run the Frontend

Start the Next.js development server:

```bash
npm run dev
```

Expected output:

```text
▲ Next.js 16.2.10
- Local: http://localhost:3000
```

---

## Setup: Linux

The project supports Ubuntu, Debian, Fedora, and other modern Linux distributions.

---

### Step 1 — Install Node.js & Git

Install Node.js using NodeSource or your package manager:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm git
```

Verify installation:

```bash
node -v
npm -v
```

---

### Step 2 — Setup Project & Environment

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/frontend
npm install
cp .env.example .env.local
```

Update your `.env.local` config with the correct API URL.

---

### Step 3 — Start Development Server

```bash
npm run dev
```

---

## Setup: Windows

The project supports Windows 10 and Windows 11 natively or using WSL2.

---

### Step 1 — Install Software

Install:

* Node.js (Windows Installer `.msi` from nodejs.org)
* Git for Windows
* Visual Studio Code (recommended editor)

Verify installation in Command Prompt/PowerShell:

```cmd
node --version
npm --version
git --version
```

---

### Step 2 — Setup Project

```cmd
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1\frontend
npm install
copy .env.example .env.local
```

---

### Step 3 — Run Development Server

```cmd
npm run dev
```

---

## Environment Variables

The project includes a `.env.example` file containing configurations for external services. Copy this file to `.env.local` and customize.

| Variable Name | Default Value | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000` | The entry-point URI of the FastAPI backend service |

---

## Project Structure

STMS Frontend follows a modular page layout, directly mapping modules from the Vite React prototype onto Next.js App Router conventions:

```text
frontend/
├── app/                              # Next.js App Router (1:1 mapped to prototype modules)
│   ├── layout.tsx                    # Global context & styling layout
│   ├── globals.css                   # Core Tailwind CSS & theme tokens
│   ├── login/                        # Unified, premium login page view
│   │   └── page.tsx
│   ├── (customer)/                   # Mapped from prototype /src/pages/ (General portal)
│   │   ├── dashboard/                # Main customer telemetry overview
│   │   ├── monitor/                  # Active equipment telemetry grid
│   │   ├── energy/                   # Fuel, solar, & power grid monitoring
│   │   ├── network/                  # Site connectivity topology
│   │   ├── performance/              # System SLA and network charts
│   │   ├── reports/                  # Batch report builder and exporter
│   │   ├── sites/                    # Site directory & telemetry map
│   │   │   └── [siteId]/             # Site telemetry & sensor dashboards
│   │   └── users/                    # Customer organization user directories
│   ├── (owner)/                      # Mapped from prototype /src/owner/
│   │   ├── overview/                 # Platform administration health dashboard
│   │   ├── customers/                # Customer tenant database directory
│   │   ├── vendors/                  # Vendor partner logs & associations
│   │   ├── billing/                  # Platform plan subscription & payments
│   │   ├── platform-health/          # API, Timescale, & ClickHouse latency logs
│   │   └── system/                   # Global configuration & SMTP settings
│   ├── (super-admin)/                # Mapped from prototype /src/super-admin/
│   │   ├── alarms/                   # Global real-time alarms and thresholds
│   │   ├── analytics/                # Multi-tenant infrastructure analysis
│   │   ├── gateways/                 # IoT gateway registration and provisioning
│   │   ├── organizations/            # Multi-level organization hierarchy trees
│   │   └── licenses/                 # Software licensing keys & activations
│   ├── (vendor)/                     # Mapped from prototype /src/vendor/
│   │   ├── dashboard/                # Service SLA and job assignments
│   │   ├── assigned-sites/           # SLA tower lists assigned to vendor
│   │   ├── engineers/                # Vendor's field engineers dispatcher
│   │   ├── jobs/                     # Dispatched maintenance check sheets
│   │   └── active-alarms/            # High priority warnings assigned to vendor
│   └── (engineer)/                   # Mapped from prototype /src/engineer/
│       ├── dashboard/                # My daily jobs queue & site routes
│       ├── jobs/                     # Onsite task execution, checks & check-ins
│       └── inventory/                # Spare parts request logs and tools lists
├── components/                       # Reusable React layout blocks & atoms
│   ├── ui/                           # Shadcn UI base components (Button, Input, Card)
│   ├── layout/                       # Multi-role Sidebar and Navigation layouts
│   └── charts/                       # Wrapped Apache ECharts components
├── contexts/                         # Client state contexts (e.g. AuthContext)
├── data/                             # Mock tables, structures, and static maps
├── hooks/                            # Custom hooks (e.g. useTelemetryData)
├── lib/                              # External wrappers and clients
│   ├── axios.ts                      # Axios configuration (auth interceptors)
│   ├── query-client.ts               # React Query client initializer
│   └── utils.ts                      # Tailwind merge & styling helpers
├── public/                           # Static assets served directly
│   ├── login-bg.png                  # Custom atmospheric cell-tower photo
│   └── favicon.svg                   # Concentric target orange favicon logo
├── services/                         # Client-side API request methods
│   ├── auth.ts                       # Login, getCurrentUser, and JWT handling
│   ├── sites.ts                      # Site list and sensor logs endpoints
│   └── telemetry.ts                  # Real-time telemetry log fetch APIs
├── package.json                      # Dependencies and npm scripts
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## Development Workflow

### Coding Standards
* Write clean, type-safe TypeScript code.
* Follow the folder structures strictly. Do not rename variables or break existing authentication methods.
* Utilize reusable Shadcn UI components for consistency.
* Use Zod schemas to validate form inputs.

### Build & Compilation
Always build your project locally before submitting code to verify it passes typechecking and production-ready bundler checks:

```bash
npm run build
```

---

## Troubleshooting

### API Connection Refused
If login triggers an error or redirects do not occur:
1. Ensure the FastAPI backend is running locally at `http://127.0.0.1:8000`.
2. Check that your browser has local network access allowed to localhost.
3. Confirm `sessionStorage` permissions are enabled (required for token storage).

### Tailwind Build Warnings
If styling updates do not apply, check that your browser did not cache older CSS sheets, and verify that Tailwind CLI is compiling successfully by running `npm run build`.

---

## Future Roadmap

* Real-time WebSocket alarm notifications from TimescaleDB alerts.
* PDF/Excel reports download wrapper integration.
* Offline telemetry snapshot caching for field engineer check-ins.

---

## Contributing

1. Create a feature branch.
2. Commit your modifications.
3. Run `npm run build` to verify type safety.
4. Submit a Pull Request.

---

