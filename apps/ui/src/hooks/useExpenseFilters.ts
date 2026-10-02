import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, PAYMENT_METHODS } from '../types/expense';
import { dateOptions, sortOptions } from '../data/options';
import { defaultFilters, hasActiveFilters } from '../utils/expenseQueries';
import type { ExpenseFilters } from '../types/expense';

const PARAM_KEYS: Record<keyof ExpenseFilters, string> = {
  search: 'q',
  category: 'category',
  paymentMethod: 'payment',
  date: 'date',
  sort: 'sort'
};

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return value && (allowed as readonly string[]).includes(value) ? value as T : fallback;
}

/** Filter state lives in the URL so views are shareable and test-friendly. */
export function useExpenseFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo<ExpenseFilters>(
    () => ({
      search: params.get(PARAM_KEYS.search) ?? '',
      category: pick(params.get(PARAM_KEYS.category), CATEGORIES, 'all'),
      paymentMethod: pick(params.get(PARAM_KEYS.paymentMethod), PAYMENT_METHODS, 'all'),
      date: pick(
        params.get(PARAM_KEYS.date),
        dateOptions.map((o) => o.value),
        'all'
      ),
      sort: pick(
        params.get(PARAM_KEYS.sort),
        sortOptions.map((o) => o.value),
        'newest'
      )
    }),
    [params]
  );

  const setFilter = useCallback(
    <K extends keyof ExpenseFilters,>(key: K, value: ExpenseFilters[K]) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === defaultFilters[key] || value === '') next.delete(PARAM_KEYS[key]);else
          next.set(PARAM_KEYS[key], String(value));
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const clearFilters = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams();
        const sort = prev.get(PARAM_KEYS.sort);
        if (sort) next.set(PARAM_KEYS.sort, sort);
        return next;
      },
      { replace: true }
    );
  }, [setParams]);

  return { filters, setFilter, clearFilters, isFiltered: hasActiveFilters(filters) };
}