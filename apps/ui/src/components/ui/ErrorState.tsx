import React from 'react';
import { AlertTriangleIcon, RotateCwIcon } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load your expenses.",
  onRetry,
  retrying
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      data-testid="error-state"
      className="flex flex-col items-center rounded-xl border border-border bg-surface px-6 py-16 text-center">
      
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-soft text-danger">
        <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {onRetry &&
      <Button variant="secondary" className="mt-5" onClick={onRetry} loading={retrying}>
          {!retrying && <RotateCwIcon className="h-4 w-4" aria-hidden="true" />}
          Try Again
        </Button>
      }
    </div>);

}