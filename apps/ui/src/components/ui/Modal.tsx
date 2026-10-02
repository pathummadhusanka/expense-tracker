import React, { useEffect, useId, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  role?: 'dialog' | 'alertdialog';
  size?: 'sm' | 'md';
  showCloseButton?: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
  testId?: string;
}

const FOCUSABLE =
'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EASE = [0.23, 1, 0.32, 1] as const;

// Shared across stacked/transitioning modals so focus returns to the original trigger.
const returnFocusMap = new WeakMap<HTMLElement, HTMLElement | null>();
let openCount = 0;

export function Modal(props: ModalProps) {
  return <AnimatePresence>{props.open && <ModalPanel {...props} />}</AnimatePresence>;
}

function ModalPanel({
  onClose,
  title,
  description,
  children,
  footer,
  role = 'dialog',
  size = 'md',
  showCloseButton = true,
  initialFocusRef,
  testId
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const panel = panelRef.current;
    const active = document.activeElement as HTMLElement | null;
    const parentPanel = active?.closest<HTMLElement>('[data-modal-panel]');
    const returnTarget = parentPanel ? returnFocusMap.get(parentPanel) ?? null : active;
    if (panel) returnFocusMap.set(panel, returnTarget);

    const target =
    initialFocusRef?.current ?? panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel;
    target?.focus();

    openCount += 1;
    document.body.style.overflow = 'hidden';

    return () => {
      openCount -= 1;
      if (openCount <= 0) {
        openCount = 0;
        document.body.style.overflow = '';
      }
      // Defer so a newly opened sibling modal can claim focus first.
      requestAnimationFrame(() => {
        const stillInModal = document.activeElement?.closest('[data-modal-panel]');
        if (!stillInModal && returnTarget && document.contains(returnTarget)) {
          returnTarget.focus();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onCloseRef.current();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <motion.div
        className="absolute inset-0 bg-ink/40"
        aria-hidden="true"
        onClick={() => onCloseRef.current()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE }} />
      
      <motion.div
        ref={panelRef}
        data-modal-panel
        data-testid={testId}
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={twMerge(
          'relative flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-surface shadow-xl focus:outline-none sm:rounded-xl',
          size === 'sm' ? 'sm:max-w-md' : 'sm:max-w-lg'
        )}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE }}>
        
        <div className="flex items-start gap-4 px-5 pb-1 pt-5 sm:px-6">
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-base font-semibold text-ink">
              {title}
            </h2>
            {description &&
            <p id={descriptionId} className="mt-1 text-sm text-muted">
                {description}
              </p>
            }
          </div>
          {showCloseButton &&
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            aria-label="Close dialog"
            className="-mr-1.5 -mt-1 rounded-md p-1.5 text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
            
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        </div>
        {children && <div className="overflow-y-auto px-5 pb-5 pt-4 sm:px-6">{children}</div>}
        {footer &&
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-5 py-4 sm:px-6">
            {footer}
          </div>
        }
      </motion.div>
    </div>);

}