import { twMerge } from 'tailwind-merge';

const inputBase =
'block w-full rounded-lg border bg-surface text-sm text-ink placeholder:text-faint transition-colors duration-150 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export function inputClass(invalid?: boolean, extra?: string): string {
  return twMerge(
    inputBase,
    invalid ?
    'border-danger focus:border-danger focus:ring-danger/20' :
    'border-border hover:border-border-strong focus:border-accent focus:ring-accent/20',
    extra
  );
}