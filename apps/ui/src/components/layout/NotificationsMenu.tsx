import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon } from 'lucide-react';
import { useDismiss } from '../../hooks/useDismiss';
import { initialNotifications } from '../../data/notifications';

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, () => setOpen(false));

  const unread = items.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        aria-controls="notifications-panel"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
        
        <BellIcon className="h-[18px] w-[18px]" aria-hidden="true" />
        {unread > 0 &&
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" aria-hidden="true" />
        }
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          id="notifications-panel"
          role="region"
          aria-label="Notifications panel"
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'top right' }}
          className="absolute right-0 top-11 z-40 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
          
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-ink">Notifications</h2>
              <button
              type="button"
              disabled={unread === 0}
              onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
              className="rounded text-xs font-medium text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:text-faint">
              
                Mark all as read
              </button>
            </div>
            <ul className="max-h-80 divide-y divide-border overflow-y-auto">
              {items.map((n) =>
            <li key={n.id}>
                  <button
                type="button"
                onClick={() => setItems((prev) => prev.map((p) => p.id === n.id ? { ...p, read: true } : p))}
                className="flex w-full gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none">
                
                    <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-transparent' : 'bg-accent'}`}
                  aria-hidden="true" />
                
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm ${n.read ? 'text-muted' : 'font-medium text-ink'}`}>
                        {n.title}
                        {!n.read && <span className="sr-only"> (unread)</span>}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">{n.body}</span>
                      <span className="mt-1 block text-xs text-faint">{n.time}</span>
                    </span>
                  </button>
                </li>
            )}
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}