You are working on an existing Expense Tracker project.

The React frontend already exists under:

```text
/apps/ui
```

Your task is to **carefully inspect the existing frontend first** and then create a lightweight **Fastify + TypeScript backend** under:

```text
/services/api
```

Do not redesign or rebuild the frontend.

## 1. Inspect the Existing Frontend First

Before writing backend code, inspect `/apps/ui` thoroughly.

Understand:

* Project structure
* React components
* Pages/routes
* TypeScript types/interfaces
* Expense data model
* Form fields
* Categories
* Payment methods
* CRUD interactions
* Search/filter requirements
* Sorting requirements
* Dashboard calculations
* Error states
* Loading states
* Any existing mock data
* Any existing service/API abstraction

The backend API must be designed based on what the existing frontend actually needs.

Do not blindly implement the API from this prompt if the frontend contains a more specific data structure.

First determine the frontend's expected `Expense` model and behavior.

---

# 2. Backend Location

Create the backend here:

```text
/services/api
```

The resulting structure should be approximately:

```text
/services
└── api
    ├── src
    │   ├── routes
    │   ├── services
    │   ├── schemas
    │   ├── types
    │   ├── data
    │   ├── app.ts
    │   └── server.ts
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

Keep the architecture lightweight.

Do not create unnecessary layers or enterprise-style abstractions.

---

# 3. Technology

Use:

* Node.js
* TypeScript
* Fastify
* npm

Use Fastify's built-in capabilities for:

* Routing
* Request validation
* Response serialization
* Error handling

Use a lightweight validation approach such as JSON Schema or a small appropriate validation library if required.

Do not introduce a database yet.

---

# 4. Data Storage

For this version, use an **in-memory data store**.

For example:

```typescript
const expenses: Expense[] = [
  // seed data
];
```

The server should initialize with approximately 10-15 realistic expenses.

The data should match the frontend's existing mock data structure as closely as possible.

Important:

The data will reset whenever the backend restarts.

This is intentional.

Do NOT add PostgreSQL, MongoDB, SQLite, Redis, or another database.

---

# 5. Expense API

Based on the frontend requirements, implement the REST API for expenses.

At minimum:

```text
GET    /api/expenses
GET    /api/expenses/:id
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

If the frontend needs additional endpoints, implement them only when justified by the existing UI.

Possible supporting endpoints:

```text
GET /api/categories
GET /api/payment-methods
```

Avoid creating unnecessary endpoints.

---

# 6. Expense Model

The expected model is approximately:

```typescript
interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}
```

However, **use the actual data model found in `/apps/ui` as the source of truth**.

Keep the frontend and backend types compatible.

Use a consistent date representation.

Use numeric values for monetary amounts rather than strings.

---

# 7. Validation

Validate incoming requests.

For creating an expense:

* Title is required
* Amount is required
* Amount must be greater than 0
* Category is required
* Date is required
* Payment method is required
* Description is optional

For updating an expense:

* Apply the same validation rules
* Allow updating the existing fields
* Do not allow clients to arbitrarily change the ID

Return useful validation errors.

Example:

```json
{
  "error": "Validation failed",
  "message": "Amount must be greater than 0"
}
```

Use appropriate HTTP status codes.

---

# 8. HTTP Status Codes

Use sensible status codes:

```text
GET successful       200
POST successful      201
PUT successful       200
DELETE successful    204 or 200

Invalid input        400
Resource not found   404
Unexpected error     500
```

Keep error responses consistent.

---

# 9. CORS

Configure CORS so the React development server can communicate with the Fastify API.

The frontend and backend will run separately during development.

Allow the appropriate frontend origin, for example:

```text
http://localhost:3000
```

If the existing Vite configuration uses another port, inspect `/apps/ui` and use that actual port.

Do not use an unnecessarily permissive production configuration.

---

# 10. Health Endpoint

Add:

```text
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

This will later be useful for Docker and automated tests.

---

# 11. Dashboard Data

Inspect the existing dashboard implementation.

If the dashboard currently calculates:

* Total expenses
* Current month spending
* Average expense
* Number of expenses
* Spending by category

first determine whether these calculations should remain frontend calculations or whether the frontend already expects API-provided statistics.

Prefer **keeping these calculations on the frontend** if they can be calculated from `/api/expenses`.

Do not create a `/dashboard` endpoint unless the existing frontend actually requires it.

Keep the backend minimal.

---

# 12. Search, Filtering and Sorting

Inspect how the existing `/apps/ui` currently implements:

* Search
* Category filtering
* Payment method filtering
* Date filtering
* Sorting

If these currently operate on frontend data, keep them there initially.

Do not unnecessarily move frontend functionality into backend query parameters.

However, structure the API so query parameters could be introduced later without major changes.

---

# 13. Service Layer

Use a small service layer to keep Fastify route handlers clean.

For example:

```text
routes/
  expense.routes.ts

services/
  expense.service.ts

types/
  expense.ts

schemas/
  expense.schema.ts
```

The route should handle HTTP concerns.

The service should handle operations such as:

```text
getExpenses()
getExpenseById()
createExpense()
updateExpense()
deleteExpense()
```

Do not create excessive interfaces, repositories, factories, or dependency-injection systems for this small application.

---

# 14. Error Handling

Create centralized Fastify error handling where appropriate.

Handle:

* Invalid request body
* Invalid ID
* Expense not found
* Unexpected server errors

Do not expose internal stack traces in normal API responses.

Keep error responses predictable because they will later be tested using Playwright/API tests.

---

# 15. Logging

Use Fastify's built-in logging.

Make development logs useful without creating excessive custom logging infrastructure.

---

# 16. Environment Configuration

Use environment variables for configurable values such as:

```text
PORT=4000
HOST=0.0.0.0
```

Provide a `.env.example`.

Do not commit real secrets.

There should be no secrets in this application at this stage.

---

# 17. Scripts

The API package should provide useful npm scripts such as:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "start": "...",
    "typecheck": "..."
  }
}
```

Use a development workflow that supports automatic restart when TypeScript files change.

---

# 18. Frontend Integration

After implementing the backend, inspect `/apps/ui` again and identify the existing mock/local data access.

Replace the mock CRUD implementation with API calls where appropriate.

For example:

```text
Current:

React
  ↓
Mock data

Change to:

React
  ↓
API service
  ↓
Fastify
  ↓
In-memory data
```

Create a clean frontend API/service layer if one does not already exist.

For example:

```text
/apps/ui/src/
├── services/
│   └── expenseApi.ts
```

The API base URL should come from a frontend environment variable rather than being hardcoded throughout the application.

For example:

```text
VITE_API_URL=http://localhost:4000
```

Do not redesign the UI while doing this integration.

---

# 19. Preserve the Existing UI

This is important.

The frontend under `/apps/ui` was intentionally designed before the backend.

Do NOT:

* Replace the UI
* Redesign components
* Change the visual design unnecessarily
* Remove existing features
* Replace the existing routing structure unnecessarily
* Introduce a new UI framework
* Rewrite the application from scratch

Only modify the frontend where necessary to replace mock data with the Fastify API.

The existing UI should look and behave the same after backend integration.

---

# 20. Root Project Structure

After implementation, aim for:

```text
expense-tracker/
│
├── apps/
│   └── ui/
│
├── services/
│   └── api/
│
├── tests/
│
└── README.md
```

Keep the project structure simple.

---

# 21. Docker Preparation

Prepare the backend so it can later be Dockerized.

The API should:

* Bind to `0.0.0.0`
* Read its port from environment variables
* Have a production build
* Have a production start command

Do not add complicated Docker orchestration yet unless it is necessary.

If the project already contains Docker configuration, inspect it and integrate with it rather than replacing it.

---

# 22. Verification

After implementation, verify:

### Backend

```text
GET /health
GET /api/expenses
GET /api/expenses/:id
POST /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id
```

### Frontend

Verify:

```text
Dashboard loads
Expenses load from API
Create works
Edit works
Delete works
Delete confirmation works
Search works
Filters work
Sorting works
Dashboard calculations update
Loading states work
Error states work
```

### Code quality

Run:

```text
npm run typecheck
npm run build
```

Fix all TypeScript/build errors.

---

# 23. Final Output

At the end, provide a concise summary containing:

1. What you discovered in `/apps/ui`
2. Backend architecture created under `/services/api`
3. API endpoints implemented
4. Frontend changes made for API integration
5. How to run the frontend
6. How to run the backend
7. Environment variables required
8. Any assumptions made

Do not add unnecessary features.

The goal is a **small, clean React + Fastify Expense Tracker** that is ready to become the system under test for a Playwright automation project.
