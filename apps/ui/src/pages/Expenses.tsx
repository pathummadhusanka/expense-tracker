import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterXIcon, PlusIcon, ReceiptIcon, SearchXIcon } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { FilterBar } from '../components/expenses/FilterBar';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { useExpenses } from '../contexts/ExpensesContext';
import { useExpenseDialogs } from '../contexts/ExpenseDialogsContext';
import { useExpenseFilters } from '../hooks/useExpenseFilters';
import { filterExpenses, sortExpenses } from '../utils/expenseQueries';
import { formatCurrency } from '../utils/format';

export function ExpensesPage() {
  const { expenses, status, error, reload } = useExpenses();
  const { openAdd, openView, openEdit, openDelete } = useExpenseDialogs();
  const { filters, setFilter, clearFilters, isFiltered } = useExpenseFilters();
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Focus search when arriving from the mobile search shortcut.
  useEffect(() => {
    const state = location.state as {focusSearch?: boolean;} | null;
    if (state?.focusSearch) {
      searchRef.current?.focus();
      navigate(location.pathname + location.search, { replace: true, state: null });
    }
  }, [location, navigate]);

  const visible = useMemo(
    () => sortExpenses(filterExpenses(expenses, filters), filters.sort),
    [expenses, filters]
  );
  const visibleTotal = visible.reduce((acc, e) => acc + e.amount, 0);
  const onlySearch =
  filters.search.trim() !== '' && filters.category === 'all' && filters.paymentMethod === 'all' && filters.date === 'all';

  const isLoading = status === 'loading' || status === 'idle';
  const hasNoExpenses = status === 'success' && expenses.length === 0;

  const addButton = (testId?: string) =>
  <Button variant="primary" onClick={openAdd} data-testid={testId}>
      <PlusIcon className="h-4 w-4" aria-hidden="true" />
      Add Expense
    </Button>;


  return (
    <>
      <PageHeader title="Expenses" description="Track and manage your spending" actions={addButton('header-add-expense')} />

      {status === 'error' ?
      <ErrorState description={error ?? undefined} onRetry={reload} /> :
      hasNoExpenses ?
      <div className="rounded-xl border border-border bg-surface">
          <EmptyState
          icon={ReceiptIcon}
          title="No expenses yet"
          description="Start tracking your spending by adding your first expense."
          actions={addButton('empty-add-expense')} />
        
        </div> :

      <div className="space-y-4">
          <FilterBar
          filters={filters}
          onChange={setFilter}
          onClear={clearFilters}
          isFiltered={isFiltered}
          disabled={isLoading}
          searchRef={searchRef} />
        

          {isLoading ?
        <LoadingState variant="list" /> :

        <>
              <p className="text-sm text-muted" aria-live="polite" data-testid="results-summary">
                {isFiltered ?
            <>
                    Showing <span className="font-medium text-ink">{visible.length}</span> of {expenses.length} expenses
                  </> :

            <>
                    <span className="font-medium text-ink">{expenses.length}</span> expenses
                  </>
            }
                {visible.length > 0 &&
            <>
                    {' · '}
                    <span className="font-medium text-ink tabular-nums">{formatCurrency(visibleTotal)}</span> total
                  </>
            }
              </p>

              {visible.length > 0 ?
          <ExpenseTable expenses={visible} onView={openView} onEdit={openEdit} onDelete={openDelete} /> :
          onlySearch ?
          <div className="rounded-xl border border-border bg-surface">
                  <EmptyState
              testId="no-search-results"
              icon={SearchXIcon}
              title={`No results for “${filters.search.trim()}”`}
              description="Check the spelling or try a different search term. Search looks at titles and descriptions."
              actions={
              <Button variant="secondary" onClick={() => setFilter('search', '')}>
                        Clear search
                      </Button>
              } />
            
                </div> :

          <div className="rounded-xl border border-border bg-surface">
                  <EmptyState
              testId="no-filtered-results"
              icon={FilterXIcon}
              title="No expenses found"
              description="Try changing your filters or add a new expense."
              actions={
              <>
                        <Button variant="secondary" onClick={clearFilters}>
                          Reset filters
                        </Button>
                        {addButton('empty-add-expense')}
                      </>
              } />
            
                </div>
          }
            </>
        }
        </div>
      }
    </>);

}