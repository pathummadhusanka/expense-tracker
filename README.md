# Expense Tracker

A modern full-stack Expense Tracker web application with a **React + Vite** frontend and a **Fastify + TypeScript** backend.

---

## Architecture & Ports

| Application | Directory | Tech Stack | Default Port | URL |
|---|---|---|---|---|
| **Frontend** | [`apps/ui`](file:///c:/Users/PathumMadhusanka/dev/repos/universal-agent-test-apps/expense-tracker/apps/ui) | React 18, Vite, TailwindCSS, TypeScript | `5173` | [http://localhost:5173](http://localhost:5173) |
| **Backend** | [`services/api`](file:///c:/Users/PathumMadhusanka/dev/repos/universal-agent-test-apps/expense-tracker/services/api) | Fastify v4, TypeScript, in-memory store | `4000` | [http://localhost:4000](http://localhost:4000) |

---

## Prerequisites

- **Node.js** v20+
- **pnpm** (v9+ / v12+)

---

## Quick Start (How to Run)

You can start both applications from the project root with one command:

```bash
pnpm --dir services/api install
pnpm --dir apps/ui install
pnpm dev
```

This starts the backend at **http://localhost:4000** and the frontend at **http://localhost:5173**. Press `Ctrl+C` to stop both services.

Alternatively, open two separate terminal windows—one for the backend and one for the frontend.

### 1. Start the Backend API (Port 4000)

```bash
cd services/api

# 1. Setup environment variables (optional, defaults work out of the box)
cp .env.example .env

# 2. Install dependencies
pnpm install

# 3. Start development server (auto-reloads on file changes)
pnpm dev
```

The API will be available at: **http://localhost:4000**  
Verify health check: **http://localhost:4000/health**

### 2. Start the Frontend (Port 5173)

```bash
cd apps/ui

# 1. Setup environment variables (points to backend at http://localhost:4000)
cp .env.example .env

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

The UI will be available at: **http://localhost:5173**

---

## Environment Variables

### Backend (`services/api/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | Port Fastify server listens on |
| `HOST` | `0.0.0.0` | Host interface to bind |
| `CORS_ORIGIN` | `http://localhost:5173,http://localhost:3000` | Allowed frontend origins (comma-separated or `*`) |
| `LOG_LEVEL` | `info` | Logging verbosity |

### Frontend (`apps/ui/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | Base URL of the Fastify backend API |

---

## Available Scripts

### Backend (`services/api`)

- `pnpm dev` - Starts development server with `tsx watch`
- `pnpm build` - Compiles TypeScript to `dist/`
- `pnpm start` - Starts production server (`node dist/server.js`)
- `pnpm typecheck` - Type check with `tsc --noEmit`

### Frontend (`apps/ui`)

- `pnpm dev` - Starts Vite dev server
- `pnpm build` - Production bundle build
- `pnpm preview` - Previews production build locally
- `pnpm typecheck` - Type check with `tsc --noEmit`

---

## API Endpoints Summary

- **Health:**
  - `GET /health` - Health check status
- **Expenses:**
  - `GET /api/expenses` - List all expenses
  - `GET /api/expenses/:id` - Get single expense by ID
  - `POST /api/expenses` - Create an expense
  - `PUT /api/expenses/:id` - Update an expense
  - `DELETE /api/expenses/:id` - Delete an expense
  - `POST /api/expenses/reset` - Reset dataset to 15 seed expenses
- **Metadata:**
  - `GET /api/categories` - List available categories
  - `GET /api/payment-methods` - List available payment methods
