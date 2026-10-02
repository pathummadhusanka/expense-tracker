import React, { ReactNode } from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  actions?: ReactNode;
  testId?: string;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  actions,
  testId = 'empty-state'
}: EmptyStateProps) {
  return <div data-testid={testId} className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-subtle text-muted">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {actions && <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{actions}</div>}
    </div>;
}