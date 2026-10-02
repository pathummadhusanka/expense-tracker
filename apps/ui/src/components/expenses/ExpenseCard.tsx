import React from 'react';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { CategoryBadge } from './CategoryBadge';
import { PaymentMethodBadge } from './PaymentMethodBadge';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Expense } from '../../types/expense';
import type { ExpenseActions } from './ExpenseRow';

interface ExpenseCardProps extends ExpenseActions {
  expense: Expense;
}

export function ExpenseCard({ expense, onView, onEdit, onDelete }: ExpenseCardProps) {
  return (
    <li className="px-4 py-4" data-testid="expense-card" data-expense-id={expense.id}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-ink">{expense.title}</h3>
          <p className="mt-0.5 text-xs text-muted tabular-nums">{formatDate(expense.date)}</p>
        </div>
        <p className="text-sm font-semibold text-ink tabular-nums">{formatCurrency(expense.amount)}</p>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <CategoryBadge category={expense.category} />
        <PaymentMethodBadge method={expense.paymentMethod} />
      </div>
      <div className="-mx-2 mt-3 flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onView(expense.id)} aria-label={`View ${expense.title}`}>
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
          View
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(expense.id)} aria-label={`Edit ${expense.title}`}>
          <PencilIcon className="h-4 w-4" aria-hidden="true" />
          Edit
        </Button>
        <Button variant="danger-ghost" size="sm" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`}>
          <Trash2Icon className="h-4 w-4" aria-hidden="true" />
          Delete
        </Button>
      </div>
    </li>);

}