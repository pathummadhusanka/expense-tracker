import React, { forwardRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { inputClass } from '../../utils/styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
{ value, onChange, disabled },
ref)
{
  return (
    <div className="relative">
      <label htmlFor="expense-search" className="sr-only">
        Search expenses
      </label>
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true" />
      
      <input
        ref={ref}
        id="expense-search"
        type="search"
        placeholder="Search expenses..."
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(false, 'h-9 pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden')} />
      
      {value &&
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
        
          <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      }
    </div>);

});