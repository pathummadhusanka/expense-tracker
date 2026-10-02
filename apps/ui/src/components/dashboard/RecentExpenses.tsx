import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { categoryColors } from '../../data/options';
import { formatCurrency, formatDate } from '../../utils/format';
import { getRecentExpenses } from '../../utils/expenseQueries';
import type { Expense } from '../../types/expense';

interface RecentExpensesProps {
  expenses: Expense[];
  onView: (id: string) => void;
}

export function RecentExpenses({ expenses, onView }: RecentExpensesProps) {
  const recent = getRecentExpenses(expenses, 6);

  return (
    <section aria-labelledby="recent-heading" className="rounded-xl border border-border bg-surface" data-testid="recent-expenses">
      <header className="flex items-center justify-between gap-4 px-5 pb-2 pt-5">
        <h2 id="recent-heading" className="text-sm font-semibold text-ink">
          Recent expenses
        </h2>
        <Link
          to="/expenses"
          className="inline-flex items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
          
          View all expenses
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </header>
      <ul className="px-2 pb-2">
        {recent.map((expense) =>
        <li key={expense.id}>
            <button
            type="button"
            onClick={() => onView(expense.id)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
            
              <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: categoryColors[expense.category] }}
              aria-hidden="true" />
            
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">{expense.title}</span>
                <span className="block truncate text-xs text-muted">
                  {expense.category} · {expense.paymentMethod}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-sm font-medium text-ink tabular-nums">{formatCurrency(expense.amount)}</span>
                <span className="block text-xs text-muted tabular-nums">{formatDate(expense.date)}</span>
              </span>
            </button>
          </li>
        )}
      </ul>
    </section>);

}