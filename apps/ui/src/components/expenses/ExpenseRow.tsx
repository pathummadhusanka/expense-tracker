import React from 'react';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { CategoryBadge } from './CategoryBadge';
import { PaymentMethodBadge } from './PaymentMethodBadge';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Expense } from '../../types/expense';

export interface ExpenseActions {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface ExpenseRowProps extends ExpenseActions {
  expense: Expense;
}

export function ExpenseRow({ expense, onView, onEdit, onDelete }: ExpenseRowProps) {
  return (
    <tr className="border-b border-border last:border-0" data-testid="expense-row" data-expense-id={expense.id}>
      <td className="max-w-0 py-3 pl-5 pr-3">
        <button
          type="button"
          onClick={() => onView(expense.id)}
          className="block max-w-full truncate rounded text-left font-medium text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
          
          {expense.title}
        </button>
        {expense.description && <p className="mt-0.5 truncate text-xs text-muted">{expense.description}</p>}
      </td>
      <td className="px-3 py-3">
        <CategoryBadge category={expense.category} />
      </td>
      <td className="px-3 py-3 text-right font-medium text-ink tabular-nums">{formatCurrency(expense.amount)}</td>
      <td className="whitespace-nowrap px-3 py-3 text-muted tabular-nums">{formatDate(expense.date)}</td>
      <td className="px-3 py-3">
        <PaymentMethodBadge method={expense.paymentMethod} />
      </td>
      <td className="py-3 pl-3 pr-4">
        <div className="flex items-center justify-end gap-0.5">
          <Button variant="ghost" size="icon" onClick={() => onView(expense.id)} aria-label={`View ${expense.title}`} title="View">
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(expense.id)} aria-label={`Edit ${expense.title}`} title="Edit">
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(expense.id)}
            aria-label={`Delete ${expense.title}`}
            title="Delete"
            className="hover:bg-danger-soft hover:text-danger">
            
            <Trash2Icon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </td>
    </tr>);

}