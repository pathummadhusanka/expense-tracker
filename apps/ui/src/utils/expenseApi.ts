/**
 * Mock expense API.
 *
 * Every function here mirrors a future Fastify REST endpoint. To connect the
 * real backend, replace each body with a fetch call and keep the signatures:
 *
 *   listExpenses()          -> GET    /api/expenses
 *   createExpense(input)    -> POST   /api/expenses
 *   updateExpense(id, input)-> PUT    /api/expenses/:id
 *   deleteExpense(id)       -> DELETE /api/expenses/:id
 */
import { mockExpenses } from '../data/expenses';
import type { Expense, ExpenseInput } from '../types/expense';

const LATENCY_MS = { list: 700, mutate: 350 };

let db: Expense[] = mockExpenses.map((e) => ({ ...e }));

const config = {
  failNextList: false,
  failMutations: false
};

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/** Demo-only: controls simulated failures. */
export function configureMockApi(options: Partial<typeof config>) {
  Object.assign(config, options);
}

/** Demo-only: replaces the in-memory dataset. */
export function seedMockApi(expenses: Expense[]) {
  db = expenses.map((e) => ({ ...e }));
}

function assertMutationsAllowed() {
  if (config.failMutations) {
    throw new ApiError('The server could not process this request.');
  }
}

export async function listExpenses(): Promise<Expense[]> {
  await wait(LATENCY_MS.list);
  if (config.failNextList) {
    config.failNextList = false;
    throw new ApiError("We couldn't load your expenses.");
  }
  return db.map((e) => ({ ...e }));
}

export async function createExpense(input: ExpenseInput): Promise<Expense> {
  await wait(LATENCY_MS.mutate);
  assertMutationsAllowed();
  const expense: Expense = { id: `exp_${Date.now()}`, ...input };
  db = [expense, ...db];
  return { ...expense };
}

export async function updateExpense(id: string, input: ExpenseInput): Promise<Expense> {
  await wait(LATENCY_MS.mutate);
  assertMutationsAllowed();
  const index = db.findIndex((e) => e.id === id);
  if (index === -1) throw new ApiError('Expense not found.');
  const updated: Expense = { id, ...input };
  db = db.map((e) => e.id === id ? updated : e);
  return { ...updated };
}

export async function deleteExpense(id: string): Promise<void> {
  await wait(LATENCY_MS.mutate);
  assertMutationsAllowed();
  if (!db.some((e) => e.id === id)) throw new ApiError('Expense not found.');
  db = db.filter((e) => e.id !== id);
}