# Expense Tracker API Service

A lightweight Fastify + TypeScript REST API backend for the Expense Tracker application.

## Tech Stack

- **Node.js** (v20+)
- **TypeScript**
- **Fastify** (v4)
- **@fastify/cors** for cross-origin requests
- **tsx** for rapid development with auto-reloading

## Architecture

```text
services/api/
├── src/
│   ├── data/
│   │   └── seedExpenses.ts    # Initial 15 realistic seed expenses
│   ├── routes/
│   │   ├── expense.routes.ts  # CRUD endpoints & metadata
│   │   └── health.routes.ts   # /health endpoint
│   ├── schemas/
│   │   └── expense.schema.ts  # JSON Schema validation & serialization
│   ├── services/
│   │   └── expense.service.ts # In-memory expense data store & operations
│   ├── types/
│   │   └── expense.ts         # TypeScript models matching frontend
│   ├── app.ts                 # Fastify app factory, CORS, error handling
│   └── server.ts              # Server bootstrap and graceful shutdown
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Health Check

- `GET /health`
  - Returns `{ "status": "ok" }` (200)

### Expenses

- `GET /api/expenses`
  - Returns array of all expenses (`Expense[]`) (200)
- `GET /api/expenses/:id`
  - Returns single expense by ID (200) or 404
- `POST /api/expenses`
  - Creates a new expense (201)
  - Requires: `title`, `amount` (> 0), `category`, `date` (YYYY-MM-DD), `paymentMethod`
  - Optional: `description`
- `PUT /api/expenses/:id`
  - Updates an existing expense (200) or 404
- `DELETE /api/expenses/:id`
  - Deletes an expense (204) or 404
- `POST /api/expenses/reset`
  - Resets the in-memory data store back to the seed expenses (200)

### Metadata

- `GET /api/categories`
  - Returns list of available expense categories (200)
- `GET /api/payment-methods`
  - Returns list of available payment methods (200)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | Port the server listens on |
| `HOST` | `0.0.0.0` | Host interface to bind |
| `CORS_ORIGIN` | `http://localhost:5173,http://localhost:3000` | Allowed CORS origins (comma-separated or `*`) |
| `LOG_LEVEL` | `info` | Logger verbosity |

### 3. Available Scripts

- `npm run dev`: Start development server with file watch and auto-restart
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Start compiled server in production mode
- `npm run typecheck`: Run TypeScript compiler check without emitting files
