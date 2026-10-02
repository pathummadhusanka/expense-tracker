import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToasterProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const icons = {
  success: { Icon: CheckCircle2Icon, className: 'text-success' },
  error: { Icon: AlertCircleIcon, className: 'text-danger' },
  info: { Icon: InfoIcon, className: 'text-accent' }
};

const AUTO_DISMISS_MS = 4500;

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div
      aria-label="Toast notifications"
      role="region"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-stretch gap-2 sm:inset-x-auto sm:right-6 sm:w-96">
      
      <AnimatePresence initial={false}>
        {toasts.map((toast) =>
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        )}
      </AnimatePresence>
    </div>);

}

function ToastItem({ toast, onDismiss }: {toast: ToastMessage;onDismiss: (id: string) => void;}) {
  const { Icon, className } = icons[toast.type];

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      role={toast.type === 'error' ? 'alert' : 'status'}
      data-testid="toast"
      data-toast-type={toast.type}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-surface p-4 shadow-lg ${
      toast.type === 'error' ? 'border-danger/30' : 'border-border'}`
      }>
      
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${className}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-sm text-muted">{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="-m-1 rounded-md p-1 text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
        
        <XIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.div>);

}