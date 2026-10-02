import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Expense } from '../../types/expense';

interface DeleteConfirmationProps {
  open: boolean;
  expense: Expense | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirmation({ open, expense, onCancel, onConfirm }: DeleteConfirmationProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <Modal
      open={open && Boolean(expense)}
      onClose={deleting ? () => undefined : onCancel}
      role="alertdialog"
      size="sm"
      title="Delete expense?"
      description="Are you sure you want to delete this expense? This action cannot be undone."
      showCloseButton={false}
      testId="delete-expense-dialog"
      footer={
      <>
          <Button variant="secondary" onClick={onCancel} disabled={deleting} data-autofocus>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} loading={deleting}>
            Delete
          </Button>
        </>
      }>
      
      {expense &&
      <div className="flex items-center justify-between gap-4 rounded-lg bg-subtle px-4 py-3 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{expense.title}</p>
            <p className="text-muted">{formatDate(expense.date)}</p>
          </div>
          <p className="font-semibold text-ink tabular-nums">{formatCurrency(expense.amount)}</p>
        </div>
      }
    </Modal>);

}