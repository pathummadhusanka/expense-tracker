import React from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CategoryBadge } from './CategoryBadge';
import { PaymentMethodBadge } from './PaymentMethodBadge';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Expense } from '../../types/expense';

interface ExpenseDetailsProps {
  open: boolean;
  expense: Expense | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ExpenseDetails({ open, expense, onClose, onEdit, onDelete }: ExpenseDetailsProps) {
  return (
    <Modal
      open={open && Boolean(expense)}
      onClose={onClose}
      title="Expense details"
      showCloseButton={false}
      testId="expense-details-dialog"
      footer={
      <>
          <Button variant="danger-ghost" onClick={onDelete} className="mr-auto">
            <Trash2Icon className="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose} data-autofocus>
            Close
          </Button>
          <Button variant="primary" onClick={onEdit}>
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
            Edit
          </Button>
        </>
      }>
      
      {expense &&
      <div>
          <h3 className="text-lg font-semibold text-ink" data-testid="expense-details-title">
            {expense.title}
          </h3>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular-nums" data-testid="expense-details-amount">
            {formatCurrency(expense.amount)}
          </p>
          <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted">Category</dt>
              <dd>
                <CategoryBadge category={expense.category} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted">Date</dt>
              <dd className="font-medium text-ink">{formatDate(expense.date)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted">Payment method</dt>
              <dd>
                <PaymentMethodBadge method={expense.paymentMethod} />
              </dd>
            </div>
          </dl>
          <div className="mt-4">
            <h4 className="text-sm text-muted">Description</h4>
            <p className="mt-1 text-sm text-ink">
              {expense.description || <span className="text-faint">No description added.</span>}
            </p>
          </div>
        </div>
      }
    </Modal>);

}