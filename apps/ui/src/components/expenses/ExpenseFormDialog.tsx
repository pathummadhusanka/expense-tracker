import React from 'react';
import { Modal } from '../ui/Modal';
import { ExpenseForm } from './ExpenseForm';
import { expenseToFormValues } from '../../utils/expenseValidation';
import type { Expense, ExpenseInput } from '../../types/expense';

interface ExpenseFormDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  expense?: Expense;
  onSubmit: (input: ExpenseInput) => Promise<boolean>;
  onCancel: () => void;
}

export function ExpenseFormDialog({ open, mode, expense, onSubmit, onCancel }: ExpenseFormDialogProps) {
  const isEdit = mode === 'edit';
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={isEdit ? 'Edit expense' : 'Add expense'}
      description={isEdit ? 'Update the details of this expense.' : 'Record a new expense to keep your spending up to date.'}
      testId={isEdit ? 'edit-expense-dialog' : 'add-expense-dialog'}>
      
      <ExpenseForm
        key={isEdit ? expense?.id : 'new'}
        initialValues={isEdit && expense ? expenseToFormValues(expense) : undefined}
        submitLabel={isEdit ? 'Save changes' : 'Add Expense'}
        onSubmit={onSubmit}
        onCancel={onCancel} />
      
    </Modal>);

}