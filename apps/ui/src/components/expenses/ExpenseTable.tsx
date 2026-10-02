import React from 'react';
import { ExpenseRow } from './ExpenseRow';
import { ExpenseCard } from './ExpenseCard';
import type { ExpenseActions } from './ExpenseRow';
import type { Expense } from '../../types/expense';

interface ExpenseTableProps extends ExpenseActions {
  expenses: Expense[];
}

export function ExpenseTable({ expenses, ...actions }: ExpenseTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* Desktop / tablet */}
      <table className="hidden w-full table-fixed text-sm md:table" data-testid="expense-table">
        <caption className="sr-only">Expenses</caption>
        <colgroup>
          <col />
          <col className="w-[140px]" />
          <col className="w-[110px]" />
          <col className="w-[120px]" />
          <col className="w-[150px] lg:w-[160px]" />
          <col className="w-[124px]" />
        </colgroup>
        <thead className="border-b border-border bg-canvas text-left text-xs font-medium text-muted">
          <tr>
            <th scope="col" className="py-2.5 pl-5 pr-3 font-medium">Title</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Category</th>
            <th scope="col" className="px-3 py-2.5 text-right font-medium">Amount</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Date</th>
            <th scope="col" className="px-3 py-2.5 font-medium">Payment Method</th>
            <th scope="col" className="py-2.5 pl-3 pr-5 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) =>
          <ExpenseRow key={expense.id} expense={expense} {...actions} />
          )}
        </tbody>
      </table>

      {/* Mobile */}
      <ul className="divide-y divide-border md:hidden" aria-label="Expenses" data-testid="expense-list">
        {expenses.map((expense) =>
        <ExpenseCard key={expense.id} expense={expense} {...actions} />
        )}
      </ul>
    </div>);

}