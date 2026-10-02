import {
  endOfDay,
  endOfMonth,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths } from
'date-fns';
import { CATEGORIES } from '../types/expense';
import type { Category, DatePreset, Expense, ExpenseFilters, SortOption } from '../types/expense';

export const defaultFilters: ExpenseFilters = {
  search: '',
  category: 'all',
  paymentMethod: 'all',
  date: 'all',
  sort: 'newest'
};

export function matchesDatePreset(isoDate: string, preset: DatePreset, now = new Date()): boolean {
  if (preset === 'all') return true;
  const date = parseISO(isoDate);
  switch (preset) {
    case '7d':
      return isWithinInterval(date, { start: startOfDay(subDays(now, 6)), end: endOfDay(now) });
    case '30d':
      return isWithinInterval(date, { start: startOfDay(subDays(now, 29)), end: endOfDay(now) });
    case 'this-month':
      return isWithinInterval(date, { start: startOfMonth(now), end: endOfMonth(now) });
    case 'last-month':{
        const last = subMonths(now, 1);
        return isWithinInterval(date, { start: startOfMonth(last), end: endOfMonth(last) });
      }
    default:
      return true;
  }
}

export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  const query = filters.search.trim().toLowerCase();
  return expenses.filter((expense) => {
    const matchesSearch =
    !query ||
    expense.title.toLowerCase().includes(query) ||
    expense.description.toLowerCase().includes(query);
    const matchesCategory = filters.category === 'all' || expense.category === filters.category;
    const matchesPayment =
    filters.paymentMethod === 'all' || expense.paymentMethod === filters.paymentMethod;
    return (
      matchesSearch && matchesCategory && matchesPayment && matchesDatePreset(expense.date, filters.date));

  });
}

export function sortExpenses(expenses: Expense[], sort: SortOption): Expense[] {
  const byNewest = (a: Expense, b: Expense) =>
  b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
  const sorted = [...expenses];
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => -byNewest(a, b));
    case 'highest':
      return sorted.sort((a, b) => b.amount - a.amount || byNewest(a, b));
    case 'lowest':
      return sorted.sort((a, b) => a.amount - b.amount || byNewest(a, b));
    case 'newest':
    default:
      return sorted.sort(byNewest);
  }
}

export function hasActiveFilters(filters: ExpenseFilters): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.category !== 'all' ||
    filters.paymentMethod !== 'all' ||
    filters.date !== 'all');

}

export interface ExpenseSummary {
  total: number;
  count: number;
  average: number;
  thisMonth: number;
  thisMonthCount: number;
  lastMonth: number;
}

export function summarizeExpenses(expenses: Expense[], now = new Date()): ExpenseSummary {
  const sum = (list: Expense[]) => list.reduce((acc, e) => acc + e.amount, 0);
  const total = sum(expenses);
  const thisMonthList = expenses.filter((e) => matchesDatePreset(e.date, 'this-month', now));
  const lastMonthList = expenses.filter((e) => matchesDatePreset(e.date, 'last-month', now));
  return {
    total,
    count: expenses.length,
    average: expenses.length ? total / expenses.length : 0,
    thisMonth: sum(thisMonthList),
    thisMonthCount: thisMonthList.length,
    lastMonth: sum(lastMonthList)
  };
}

export interface CategoryTotal {
  category: Category;
  total: number;
  count: number;
  share: number;
}

export function spendingByCategory(expenses: Expense[]): CategoryTotal[] {
  const grandTotal = expenses.reduce((acc, e) => acc + e.amount, 0);
  return CATEGORIES.map((category) => {
    const items = expenses.filter((e) => e.category === category);
    const total = items.reduce((acc, e) => acc + e.amount, 0);
    return {
      category,
      total,
      count: items.length,
      share: grandTotal ? total / grandTotal : 0
    };
  }).sort((a, b) => b.total - a.total);
}

export function getRecentExpenses(expenses: Expense[], limit = 6): Expense[] {
  return sortExpenses(expenses, 'newest').slice(0, limit);
}