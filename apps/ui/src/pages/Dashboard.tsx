import React from 'react';
import { PlusIcon, ReceiptIcon } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { CategoryBreakdown } from '../components/dashboard/CategoryBreakdown';
import { RecentExpenses } from '../components/dashboard/RecentExpenses';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { useExpenses } from '../contexts/ExpensesContext';
import { useExpenseDialogs } from '../contexts/ExpenseDialogsContext';
import { summarizeExpenses } from '../utils/expenseQueries';
import { formatCurrency } from '../utils/format';

export function DashboardPage() {
  const { expenses, status, error, reload } = useExpenses();
  const { openAdd, openView } = useExpenseDialogs();
  const summary = summarizeExpenses(expenses);

  const addButton =
  <Button variant="primary" onClick={openAdd}>
      <PlusIcon className="h-4 w-4" aria-hidden="true" />
      Add Expense
    </Button>;


  return (
    <>
      <PageHeader title="Dashboard" description="Your spending at a glance" actions={addButton} />

      {status === 'loading' || status === 'idle' ?
      <LoadingState variant="dashboard" /> :
      status === 'error' ?
      <ErrorState description={error ?? undefined} onRetry={reload} /> :
      expenses.length === 0 ?
      <div className="rounded-xl border border-border bg-surface">
          <EmptyState
          icon={ReceiptIcon}
          title="No expenses yet"
          description="Add your first expense to see totals, trends, and spending by category."
          actions={
          <Button variant="primary" onClick={openAdd} data-testid="empty-add-expense">
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                Add Expense
              </Button>
          } />
        
        </div> :

      <div className="space-y-6">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">
              Overview
            </h2>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
              <SummaryCard
              testId="summary-total"
              label="Total Expenses"
              value={formatCurrency(summary.total)}
              hint="All time" />
            
              <SummaryCard
              testId="summary-month"
              label="This Month"
              value={formatCurrency(summary.thisMonth)}
              hint={`Last month: ${formatCurrency(summary.lastMonth)}`} />
            
              <SummaryCard
              testId="summary-average"
              label="Average Expense"
              value={formatCurrency(summary.average)}
              hint="Per expense" />
            
              <SummaryCard
              testId="summary-count"
              label="Expenses"
              value={String(summary.count)}
              hint={`${summary.thisMonthCount} this month`} />
            
            </dl>
          </section>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentExpenses expenses={expenses} onView={openView} />
            </div>
            <div className="lg:col-span-2">
              <CategoryBreakdown expenses={expenses} />
            </div>
          </div>
        </div>
      }
    </>);

}