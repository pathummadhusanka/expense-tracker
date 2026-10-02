import { getSeedExpenses } from '../data/seedExpenses.js';
import type { CreateExpenseInput, Expense, UpdateExpenseInput } from '../types/expense.js';

class ExpenseService {
  private expenses: Expense[] = getSeedExpenses();

  getExpenses(): Expense[] {
    return this.expenses.map((e) => ({ ...e }));
  }

  getExpenseById(id: string): Expense | undefined {
    const expense = this.expenses.find((e) => e.id === id);
    return expense ? { ...expense } : undefined;
  }

  createExpense(input: CreateExpenseInput): Expense {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newExpense: Expense = {
      id,
      title: input.title.trim(),
      description: input.description?.trim() ?? '',
      amount: Math.round(input.amount * 100) / 100,
      category: input.category,
      date: input.date,
      paymentMethod: input.paymentMethod,
    };

    // Prepend so the newly added expense is at the top
    this.expenses = [newExpense, ...this.expenses];
    return { ...newExpense };
  }

  updateExpense(id: string, input: UpdateExpenseInput): Expense | null {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return null;
    }

    const current = this.expenses[index];
    const updated: Expense = {
      ...current,
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.description !== undefined && { description: input.description.trim() }),
      ...(input.amount !== undefined && { amount: Math.round(input.amount * 100) / 100 }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.date !== undefined && { date: input.date }),
      ...(input.paymentMethod !== undefined && { paymentMethod: input.paymentMethod }),
      id, // Immutable ID
    };

    this.expenses[index] = updated;
    return { ...updated };
  }

  deleteExpense(id: string): boolean {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return false;
    }

    this.expenses.splice(index, 1);
    return true;
  }

  resetExpenses(): void {
    this.expenses = getSeedExpenses();
  }
}

export const expenseService = new ExpenseService();
