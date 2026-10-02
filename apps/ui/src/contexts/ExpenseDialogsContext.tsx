import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useExpenses } from './ExpensesContext';
import { ExpenseFormDialog } from '../components/expenses/ExpenseFormDialog';
import { ExpenseDetails } from '../components/expenses/ExpenseDetails';
import { DeleteConfirmation } from '../components/expenses/DeleteConfirmation';
import type { Expense, ExpenseInput } from '../types/expense';

type DialogState =
{kind: 'closed';} |
{kind: 'add';} |
{kind: 'view';expenseId: string;} |
{kind: 'edit';expenseId: string;fromView: boolean;} |
{kind: 'delete';expenseId: string;fromView: boolean;};

interface ExpenseDialogsValue {
  openAdd: () => void;
  openView: (id: string) => void;
  openEdit: (id: string) => void;
  openDelete: (id: string) => void;
}

const ExpenseDialogsContext = createContext<ExpenseDialogsValue | null>(null);

export function ExpenseDialogsProvider({ children }: {children: ReactNode;}) {
  const { expenses, createExpense, updateExpense, deleteExpense } = useExpenses();
  const [state, setState] = useState<DialogState>({ kind: 'closed' });
  const lastExpense = useRef<Expense | null>(null);

  const activeId = 'expenseId' in state ? state.expenseId : null;
  const active = activeId ? expenses.find((e) => e.id === activeId) ?? null : null;
  if (active) lastExpense.current = active;
  // Keep showing the last expense while a dialog animates out.
  const shown = active ?? lastExpense.current;

  const close = useCallback(() => setState({ kind: 'closed' }), []);

  const value = useMemo<ExpenseDialogsValue>(
    () => ({
      openAdd: () => setState({ kind: 'add' }),
      openView: (id) => setState({ kind: 'view', expenseId: id }),
      openEdit: (id) => setState({ kind: 'edit', expenseId: id, fromView: false }),
      openDelete: (id) => setState({ kind: 'delete', expenseId: id, fromView: false })
    }),
    []
  );

  const backOrClose = () => {
    if ((state.kind === 'edit' || state.kind === 'delete') && state.fromView) {
      setState({ kind: 'view', expenseId: state.expenseId });
    } else {
      close();
    }
  };

  const handleCreate = async (input: ExpenseInput) => {
    const created = await createExpense(input);
    if (created) close();
    return Boolean(created);
  };

  const handleUpdate = async (input: ExpenseInput) => {
    if (state.kind !== 'edit') return false;
    const updated = await updateExpense(state.expenseId, input);
    if (updated) backOrClose();
    return Boolean(updated);
  };

  const handleDelete = async () => {
    if (state.kind !== 'delete') return;
    const ok = await deleteExpense(state.expenseId);
    if (ok) close();
  };

  return (
    <ExpenseDialogsContext.Provider value={value}>
      {children}
      <ExpenseFormDialog open={state.kind === 'add'} mode="add" onSubmit={handleCreate} onCancel={close} />
      <ExpenseFormDialog
        open={state.kind === 'edit' && Boolean(active)}
        mode="edit"
        expense={shown ?? undefined}
        onSubmit={handleUpdate}
        onCancel={backOrClose} />
      
      <ExpenseDetails
        open={state.kind === 'view' && Boolean(active)}
        expense={shown}
        onClose={close}
        onEdit={() => shown && setState({ kind: 'edit', expenseId: shown.id, fromView: true })}
        onDelete={() => shown && setState({ kind: 'delete', expenseId: shown.id, fromView: true })} />
      
      <DeleteConfirmation
        open={state.kind === 'delete' && Boolean(active)}
        expense={shown}
        onCancel={backOrClose}
        onConfirm={handleDelete} />
      
    </ExpenseDialogsContext.Provider>);

}

export function useExpenseDialogs() {
  const ctx = useContext(ExpenseDialogsContext);
  if (!ctx) throw new Error('useExpenseDialogs must be used within ExpenseDialogsProvider');
  return ctx;
}