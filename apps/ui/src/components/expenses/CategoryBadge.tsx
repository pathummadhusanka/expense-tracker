import React from 'react';
import { categoryColors } from '../../data/options';
import type { Category } from '../../types/expense';

export function CategoryBadge({ category }: {category: Category;}) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-subtle px-2 py-0.5 text-xs font-medium text-ink">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: categoryColors[category] }}
        aria-hidden="true" />
      
      {category}
    </span>);

}