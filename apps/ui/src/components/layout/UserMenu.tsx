import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, SettingsIcon } from 'lucide-react';
import { useDismiss } from '../../hooks/useDismiss';
import { useUser } from '../../contexts/UserContext';
import { getInitials } from '../../utils/format';

export function UserMenu() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls="account-panel"
        className="flex h-9 items-center gap-2 rounded-lg pl-1 pr-1.5 transition-colors duration-150 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:pr-2">
        
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {getInitials(user.name)}
        </span>
        <span className="hidden text-sm font-medium text-ink sm:block">{user.name.split(' ')[0]}</span>
        <ChevronDownIcon className="hidden h-3.5 w-3.5 text-muted sm:block" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          id="account-panel"
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'top right' }}
          className="absolute right-0 top-11 z-40 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
          
            <div className="border-b border-border px-4 py-3">
              <p className="truncate text-sm font-medium text-ink">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="p-1.5">
              <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm text-ink transition-colors duration-150 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none">
              
                <SettingsIcon className="h-4 w-4 text-muted" aria-hidden="true" />
                Account settings
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}