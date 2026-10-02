import React from 'react';
import { categoryColors } from '../../data/options';
import { formatCurrency } from '../../utils/format';
import { spendingByCategory } from '../../utils/expenseQueries';
import type { Expense } from '../../types/expense';

export function CategoryBreakdown({ expenses }: {expenses: Expense[];}) {
  const data = spendingByCategory(expenses);
  const max = Math.max(...data.map((d) => d.total), 1);

  return (
    <section
      aria-labelledby="category-heading"
      className="rounded-xl border border-border bg-surface"
      data-testid="category-breakdown">
      
      <header className="px-5 pb-1 pt-5">
        <h2 id="category-heading" className="text-sm font-semibold text-ink">
          Spending by category
        </h2>
        <p className="mt-0.5 text-xs text-muted">All time, sorted by amount</p>
      </header>
      <ul className="space-y-3.5 px-5 pb-5 pt-4">
        {data.map((item) =>
        <li key={item.category} data-testid={`category-${item.category}`}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={item.total ? 'text-ink' : 'text-faint'}>{item.category}</span>
              <span className="flex items-baseline gap-2 tabular-nums">
                <span className="text-xs text-muted">{Math.round(item.share * 100)}%</span>
                <span className={`w-20 text-right font-medium ${item.total ? 'text-ink' : 'text-faint'}`}>
                  {formatCurrency(item.total)}
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-subtle" aria-hidden="true">
              <div
              className="h-full rounded-full"
              style={{ width: `${item.total / max * 100}%`, backgroundColor: categoryColors[item.category] }} />
            
            </div>
          </li>
        )}
      </ul>
    </section>);

}