import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import * as expenseApi from '../utils/expenseApi';
import { mockExpenses } from '../data/expenses';
import { useToast } from './ToastContext';
import type { Expense, ExpenseInput, LoadStatus, MockScenario } from '../types/expense';

interface ExpensesContextValue {
  expenses: Expense[];
  status: LoadStatus;
  error: string | null;
  reload: () => Promise<void>;
  createExpense: (input: ExpenseInput) => Promise<Expense | null>;
  updateExpense: (id: string, input: ExpenseInput) => Promise<Expense | null>;
  deleteExpense: (id: string) => Promise<boolean>;
  resetData: () => Promise<void>;
}

const ExpensesContext = createContext<ExpensesContextValue | null>(null);

interface ExpensesProviderProps {
  children: ReactNode;
  scenario: MockScenario;
  failMutations: boolean;
}

export function ExpensesProvider({ children, scenario, failMutations }: ExpensesProviderProps) {
  const { showToast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [status, setStatus] = useState<LoadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const reload = useCallback(async () => {
    const id = ++requestId.current;
    setStatus('loading');
    setError(null);
    try {
      const data = await expenseApi.listExpenses();
      if (id !== requestId.current) return;
      setExpenses(data);
      setStatus('success');
    } catch (err) {
      if (id !== requestId.current) return;
      const message = err instanceof Error ? err.message : "We couldn't load your expenses.";
      setError(message);
      setStatus('error');
      showToast({ type: 'error', title: "Couldn't load expenses", description: 'Check your connection and try again.' });
    }
  }, [showToast]);

  // Demo scenarios: configure the mock API, then load.
  useEffect(() => {
    expenseApi.seedMockApi(scenario === 'empty' ? [] : mockExpenses);
    expenseApi.configureMockApi({ failNextList: scenario === 'load-error', failMutations });
    void reload();
  }, [scenario, failMutations, reload]);

  const createExpense = useCallback(
    async (input: ExpenseInput) => {
      try {
        const created = await expenseApi.createExpense(input);
        setExpenses((prev) => [created, ...prev]);
        showToast({ type: 'success', title: 'Expense added successfully', description: created.title });
        return created;
      } catch {
        showToast({ type: 'error', title: "Couldn't add expense", description: 'Please try again.' });
        return null;
      }
    },
    [showToast]
  );

  const updateExpense = useCallback(
    async (id: string, input: ExpenseInput) => {
      try {
        const updated = await expenseApi.updateExpense(id, input);
        setExpenses((prev) => prev.map((e) => e.id === id ? updated : e));
        showToast({ type: 'success', title: 'Expense updated successfully', description: updated.title });
        return updated;
      } catch {
        showToast({ type: 'error', title: "Couldn't update expense", description: 'Please try again.' });
        return null;
      }
    },
    [showToast]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      try {
        await expenseApi.deleteExpense(id);
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        showToast({ type: 'success', title: 'Expense deleted successfully' });
        return true;
      } catch {
        showToast({ type: 'error', title: "Couldn't delete expense", description: 'Please try again.' });
        return false;
      }
    },
    [showToast]
  );

  const resetData = useCallback(async () => {
    try {
      await expenseApi.resetExpenses();
    } catch {
      expenseApi.seedMockApi(mockExpenses);
    }
    await reload();
    showToast({ type: 'info', title: 'Demo data restored' });
  }, [reload, showToast]);

  const value = useMemo(
    () => ({ expenses, status, error, reload, createExpense, updateExpense, deleteExpense, resetData }),
    [expenses, status, error, reload, createExpense, updateExpense, deleteExpense, resetData]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
}