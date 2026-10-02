export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PAYMENT_METHODS = [
  'Cash',
  'Card',
  'Bank Transfer',
  'Digital Wallet',
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // ISO date string, yyyy-MM-dd
  paymentMethod: PaymentMethod;
}

export interface CreateExpenseInput {
  title: string;
  description?: string;
  amount: number;
  category: Category;
  date: string;
  paymentMethod: PaymentMethod;
}

export type UpdateExpenseInput = Partial<CreateExpenseInput>;
