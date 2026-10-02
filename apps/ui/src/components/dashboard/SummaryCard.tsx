import React from 'react';
import type { ReactNode } from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
  hint?: ReactNode;
  testId?: string;
}

export function SummaryCard({ label, value, hint, testId }: SummaryCardProps) {
  return (
    <div className="bg-surface p-4 sm:p-5" data-testid={testId}>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1.5 text-xl font-semibold tracking-tight text-ink tabular-nums sm:text-2xl">{value}</dd>
      {hint && <dd className="mt-1 text-xs text-muted">{hint}</dd>}
    </div>);

}