import type { Category, DatePreset, SortOption } from '../types/expense';

export const categoryColors: Record<Category, string> = {
  Food: '#D9771F',
  Transport: '#3B6FD8',
  Shopping: '#C2418A',
  Bills: '#6D5BD0',
  Entertainment: '#0E95A1',
  Health: '#2F9E5B',
  Education: '#B7861A',
  Other: '#78716C'
};

export const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'newest', label: 'Newest' },
{ value: 'oldest', label: 'Oldest' },
{ value: 'highest', label: 'Highest amount' },
{ value: 'lowest', label: 'Lowest amount' }];


export const dateOptions: {value: DatePreset;label: string;}[] = [
{ value: 'all', label: 'All dates' },
{ value: '7d', label: 'Last 7 days' },
{ value: '30d', label: 'Last 30 days' },
{ value: 'this-month', label: 'This month' },
{ value: 'last-month', label: 'Last month' }];