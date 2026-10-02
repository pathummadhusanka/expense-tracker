/**
 * Centralized expense domain model.
 * Mirrors the shape the future Fastify REST API is expected to return.
 */

export const CATEGORIES = [
'Food',
'Transport',
'Shopping',
'Bills',
'Entertainment',
'Health',
'Education',
'Other'] as
const;

export type Category = (typeof CATEGORIES)[number];

export const PAYMENT_METHODS = ['Cash', 'Card', 'Bank Transfer', 'Digital Wallet'] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: Category;
  /** ISO date string, yyyy-MM-dd */
  date: string;
  paymentMethod: PaymentMethod;
}

/** Payload for create/update requests (POST /expenses, PUT /expenses/:id). */
export type ExpenseInput = Omit<Expense, 'id'>;

export type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

export type DatePreset = 'all' | '7d' | '30d' | 'this-month' | 'last-month';

export interface ExpenseFilters {
  search: string;
  category: Category | 'all';
  paymentMethod: PaymentMethod | 'all';
  date: DatePreset;
  sort: SortOption;
}

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

export type MockScenario = 'default' | 'empty' | 'load-error';

/** Raw form state — strings so inputs stay controlled while typing. */
export interface ExpenseFormValues {
  title: string;
  description: string;
  amount: string;
  category: Category | '';
  date: string;
  paymentMethod: PaymentMethod | '';
}

export type ExpenseFormErrors = Partial<Record<keyof ExpenseFormValues, string>>;