import type { Expense, ExpenseInput } from '../types/expense';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:4000';

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Config to support preview/testing simulation when requested via AppProps
const config = {
  failNextList: false,
  failMutations: false,
  overrideEmpty: false,
};

export function configureMockApi(options: { failNextList?: boolean; failMutations?: boolean }) {
  if (options.failNextList !== undefined) config.failNextList = options.failNextList;
  if (options.failMutations !== undefined) config.failMutations = options.failMutations;
}

export function seedMockApi(expenses: Expense[]) {
  // If empty scenario is passed, honor it for preview
  config.overrideEmpty = expenses.length === 0;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  let response: Response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch {
    throw new ApiError('Unable to connect to server. Check your connection and try again.');
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  let body: any;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message = body?.message || body?.error || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, body?.details);
  }

  return body as T;
}

export async function listExpenses(): Promise<Expense[]> {
  if (config.failNextList) {
    config.failNextList = false;
    throw new ApiError("We couldn't load your expenses.");
  }
  if (config.overrideEmpty) {
    return [];
  }
  return request<Expense[]>('/api/expenses');
}

export async function getExpenseById(id: string): Promise<Expense> {
  return request<Expense>(`/api/expenses/${encodeURIComponent(id)}`);
}

export async function createExpense(input: ExpenseInput): Promise<Expense> {
  if (config.failMutations) {
    throw new ApiError('The server could not process this request.');
  }
  return request<Expense>('/api/expenses', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateExpense(id: string, input: ExpenseInput): Promise<Expense> {
  if (config.failMutations) {
    throw new ApiError('The server could not process this request.');
  }
  return request<Expense>(`/api/expenses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function deleteExpense(id: string): Promise<void> {
  if (config.failMutations) {
    throw new ApiError('The server could not process this request.');
  }
  await request<void>(`/api/expenses/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export async function resetExpenses(): Promise<void> {
  await request<{ message: string }>('/api/expenses/reset', {
    method: 'POST',
  });
}

export async function getCategories(): Promise<string[]> {
  return request<string[]>('/api/categories');
}

export async function getPaymentMethods(): Promise<string[]> {
  return request<string[]>('/api/payment-methods');
}
