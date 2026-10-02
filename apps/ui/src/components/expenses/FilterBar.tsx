import React from 'react';
import type { RefObject } from 'react';
import { XIcon } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { dateOptions, sortOptions } from '../../data/options';
import { CATEGORIES, PAYMENT_METHODS } from '../../types/expense';
import type { ExpenseFilters } from '../../types/expense';

interface FilterBarProps {
  filters: ExpenseFilters;
  onChange: <K extends keyof ExpenseFilters>(key: K, value: ExpenseFilters[K]) => void;
  onClear: () => void;
  isFiltered: boolean;
  disabled?: boolean;
  searchRef?: RefObject<HTMLInputElement>;
}

export function FilterBar({ filters, onChange, onClear, isFiltered, disabled, searchRef }: FilterBarProps) {
  return (
    <div className="space-y-3" role="group" aria-label="Search and filters">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:max-w-md sm:flex-1">
          <SearchBar ref={searchRef} value={filters.search} onChange={(v) => onChange('search', v)} disabled={disabled} />
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <label htmlFor="sort-by" className="whitespace-nowrap text-sm text-muted">
            Sort by
          </label>
          <Select
            id="sort-by"
            value={filters.sort}
            disabled={disabled}
            onChange={(e) => onChange('sort', e.target.value as ExpenseFilters['sort'])}
            options={sortOptions}
            wrapperClassName="flex-1 sm:flex-none"
            className="font-medium sm:w-44" />
          
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <div>
          <label htmlFor="filter-category" className="sr-only">
            Category
          </label>
          <Select
            id="filter-category"
            value={filters.category}
            disabled={disabled}
            onChange={(e) => onChange('category', e.target.value as ExpenseFilters['category'])}
            options={[{ value: 'all', label: 'All categories' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            className={`sm:w-44 ${filters.category !== 'all' ? 'border-accent/50 bg-accent-soft' : ''}`} />
          
        </div>
        <div>
          <label htmlFor="filter-payment" className="sr-only">
            Payment method
          </label>
          <Select
            id="filter-payment"
            value={filters.paymentMethod}
            disabled={disabled}
            onChange={(e) => onChange('paymentMethod', e.target.value as ExpenseFilters['paymentMethod'])}
            options={[{ value: 'all', label: 'All payment methods' }, ...PAYMENT_METHODS.map((m) => ({ value: m, label: m }))]}
            className={`sm:w-48 ${filters.paymentMethod !== 'all' ? 'border-accent/50 bg-accent-soft' : ''}`} />
          
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="filter-date" className="sr-only">
            Date
          </label>
          <Select
            id="filter-date"
            value={filters.date}
            disabled={disabled}
            onChange={(e) => onChange('date', e.target.value as ExpenseFilters['date'])}
            options={dateOptions}
            className={`sm:w-40 ${filters.date !== 'all' ? 'border-accent/50 bg-accent-soft' : ''}`} />
          
        </div>
        <Button
          variant="ghost"
          onClick={onClear}
          disabled={!isFiltered || disabled}
          className="col-span-2 sm:col-span-1">
          
          <XIcon className="h-4 w-4" aria-hidden="true" />
          Clear filters
        </Button>
      </div>
    </div>);

}