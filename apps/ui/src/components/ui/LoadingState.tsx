import React from 'react';

interface LoadingStateProps {
  variant: 'dashboard' | 'list';
}

function Bar({ className }: {className: string;}) {
  return <div className={`animate-pulse rounded bg-subtle ${className}`} />;
}

export function LoadingState({ variant }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" aria-label="Loading expenses" data-testid="loading-state">
      <span className="sr-only">Loading expenses…</span>
      {variant === 'dashboard' ?
      <div className="space-y-6" aria-hidden="true">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) =>
          <div key={i} className="bg-surface p-5">
                <Bar className="h-3.5 w-24" />
                <Bar className="mt-3 h-7 w-28" />
                <Bar className="mt-2 h-3 w-20" />
              </div>
          )}
          </div>
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-3">
              <Bar className="h-4 w-36" />
              {[0, 1, 2, 3, 4].map((i) =>
            <div key={i} className="mt-5 flex items-center justify-between">
                  <div>
                    <Bar className="h-3.5 w-40" />
                    <Bar className="mt-2 h-3 w-24" />
                  </div>
                  <Bar className="h-3.5 w-16" />
                </div>
            )}
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
              <Bar className="h-4 w-40" />
              {[0, 1, 2, 3, 4].map((i) =>
            <div key={i} className="mt-5">
                  <Bar className="h-3 w-full" />
                  <Bar className="mt-2 h-1.5 w-2/3" />
                </div>
            )}
            </div>
          </div>
        </div> :

      <div className="overflow-hidden rounded-xl border border-border bg-surface" aria-hidden="true">
          <div className="hidden border-b border-border bg-canvas px-5 py-3 md:block">
            <Bar className="h-3 w-1/3" />
          </div>
          {[0, 1, 2, 3, 4, 5].map((i) =>
        <div key={i} className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0">
              <div className="flex-1">
                <Bar className="h-3.5 w-1/2 md:w-1/3" />
                <Bar className="mt-2 h-3 w-1/3 md:w-1/4" />
              </div>
              <Bar className="hidden h-5 w-20 md:block" />
              <Bar className="h-3.5 w-16" />
              <Bar className="hidden h-3.5 w-24 md:block" />
            </div>
        )}
        </div>
      }
    </div>);

}