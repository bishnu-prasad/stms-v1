# STMS V1 Frontend

Enterprise-grade Next.js frontend for the Site Telemetry Management System (STMS).

---

## Table of Contents

* Overview
* Architecture Overview
* Technology Stack
* Backend Requirement
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

---

## Overview

The Site Telemetry Management System (STMS) Frontend is an enterprise-grade web application designed to manage, monitor, analyze, and maintain telecom infrastructure from a centralized dashboard.

The application is built using Next.js 16 (App Router) with TypeScript and Tailwind CSS, utilizing best practices in modern web development to construct responsive, highly performant, and premium interfaces.

STMS supports multiple user roles (Platform Owner, Super Admin, Customer organization, Vendor partner, Field Engineer) with role-based routing. It leverages modern libraries for real-time telemetry charting (Apache ECharts), telemetry tree-view hierarchies (React Arborist), tabular alarm lists (AG Grid), and secure client-side session management.

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
         │  • Tailwind CSS                       │
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

## Backend Requirement

The STMS Frontend application can be booted and navigated independently in development mode.

However, all authentication flows (login, session refresh) and live data features require the FastAPI backend service to be running. By default, the frontend sends requests to:

```text
http://localhost:8000
```

Before attempting to log in or query telemetry data, make sure the backend service is started and accessible at `http://localhost:8000`.

---

## Prerequisites

Before running the project, install the following software:

| Software | Required Version | Purpose |
| --- | --- | --- |
| **Node.js** | `v20 LTS` (recommended) or `v18 LTS` or newer | Application Runtime Environment |
| **npm** | `v10+` (included with Node.js LTS) | Package Manager |
| **Git** | Latest | Version Control |

To verify your installation:

```bash
node --version
npm --version
git --version
```

---

## Quick Start

The quickest way to run the STMS Frontend locally:

```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/frontend
npm install
npm run dev
```

Once the server starts successfully, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Setup: macOS

### Step 1 — Check Prerequisites
Ensure Node.js and Git are installed. If using Homebrew:
```bash
brew install node git
```

### Step 2 — Clone & Install
```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/frontend
npm install
```

### Step 3 — Start Development Server
```bash
npm run dev
```

---

## Setup: Linux

### Step 1 — Check Prerequisites
Install Node.js (v18+ or v20+) and Git using your package manager:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm git
```

### Step 2 — Clone & Install
```bash
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1/frontend
npm install
```

### Step 3 — Start Development Server
```bash
npm run dev
```

---

## Setup: Windows

### Step 1 — Check Prerequisites
Install Node.js (LTS installer from nodejs.org) and Git for Windows.

Verify installation in Command Prompt or PowerShell:
```cmd
node --version
npm --version
git --version
```

### Step 2 — Clone & Install
```cmd
git clone https://github.com/bishnu-prasad/STMS-V1.git
cd STMS-V1\frontend
npm install
```

### Step 3 — Start Development Server
```cmd
npm run dev
```

---

## Environment Variables

The STMS Frontend currently resolves the backend API endpoint directly via a centralized Axios configuration in `src/lib/axios.ts`, which communicates with:

```text
http://localhost:8000
```

The application does not read from `process.env`, and no `.env.example` or `.env.local` file is required to run the project.

---

## Project Structure

STMS Frontend follows a modular directory layout under Next.js App Router conventions:

```text
frontend/
│
├── src/                              # Application source code
│   │
│   ├── app/                          # Next.js App Router (routing, layouts, pages)
│   ├── modules/                      # Feature modules (auth, platform-owner, etc.)
│   ├── components/                   # Shared UI components (Shadcn primitives)
│   ├── services/                     # API client methods
│   ├── hooks/                        # Global reusable React hooks
│   ├── providers/                    # React Context providers
│   ├── store/                        # Global state management
│   ├── config/                       # Application configuration
│   ├── schemas/                      # Validation schemas (Zod)
│   ├── types/                        # Shared TypeScript types
│   ├── lib/                          # Utilities (Axios client setup in src/lib/axios.ts)
│   ├── assets/                       # Images, icons, and static media
│   └── styles/                       # Global CSS and Tailwind imports
│
├── public/                           # Static public assets
├── package.json                      # Project dependencies and npm scripts
├── package-lock.json                 # Locked dependency graph
├── tsconfig.json                     # TypeScript compiler configuration
├── next.config.ts                    # Next.js configuration
├── eslint.config.mjs                 # ESLint configuration
├── postcss.config.mjs                # PostCSS configuration
├── .gitignore                        # Git ignore rules
└── FrontendReadme.md                 # Frontend documentation
```

---

## Development Workflow

### Scripts
* `npm run dev` — Starts the Next.js development server on `http://localhost:3000`.
* `npm run build` — Compiles the production build.
* `npm run start` — Starts the built production server.
* `npm run lint` — Runs ESLint code quality checks.

---

## Troubleshooting

### Backend Connection Failed
If API calls fail or login redirects do not complete:
1. Ensure the FastAPI backend is running locally at `http://localhost:8000`.
2. Confirm browser permissions allow `sessionStorage` and cookies.

---

## Future Roadmap

* Real-time WebSocket alarm notifications.
* PDF/Excel report export wrappers.
* Offline telemetry snapshot caching.

---

## Contributing

1. Create a feature branch.
2. Commit your modifications.
3. Run `npm run build` to verify compilation.
4. Submit a Pull Request.
