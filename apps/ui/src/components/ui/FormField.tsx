import React from 'react';
import type { ReactNode } from 'react';
import { AlertCircleIcon } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({ id, label, error, optional, children, className }: FormFieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {optional && <span className="text-xs text-faint">Optional</span>}
      </div>
      {children}
      {error &&
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
          <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      }
    </div>);

}