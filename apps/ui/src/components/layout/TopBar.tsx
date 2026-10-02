import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { inputClass } from '../../utils/styles';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/expenses': 'Expenses',
  '/settings': 'Settings'
};

interface TopBarProps {
  navOpen: boolean;
  onOpenNav: () => void;
}

export function TopBar({ navOpen, onOpenNav }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const title = pageTitles[location.pathname] ?? 'ExpenseFlow';

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/expenses?q=${encodeURIComponent(q)}` : '/expenses');
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        aria-expanded={navOpen}
        aria-controls="mobile-navigation"
        className="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 lg:hidden">
        
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="text-sm font-medium text-ink" data-testid="topbar-title">
        {title}
      </p>

      <form role="search" aria-label="Quick search" onSubmit={handleSearch} className="ml-auto hidden w-64 md:block lg:w-72">
        <label htmlFor="quick-search" className="sr-only">
          Quick search
        </label>
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true" />
          
          <input
            id="quick-search"
            type="search"
            placeholder="Search all expenses"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={inputClass(false, 'h-9 bg-canvas pl-9 pr-3')} />
          
        </div>
      </form>

      <div className="ml-auto flex items-center gap-1 md:ml-2">
        <button
          type="button"
          onClick={() => navigate('/expenses', { state: { focusSearch: true } })}
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden">
          
          <SearchIcon className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>);

}