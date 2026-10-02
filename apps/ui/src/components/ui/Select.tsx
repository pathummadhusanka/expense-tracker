import React, { forwardRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { inputClass } from '../../utils/styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
{ options, placeholder, invalid, wrapperClassName, className, ...rest },
ref)
{
  return (
    <div className={`relative ${wrapperClassName ?? ''}`}>
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={inputClass(invalid, `h-9 appearance-none pl-3 pr-9 ${className ?? ''}`)}
        {...rest}>
        
        {placeholder !== undefined &&
        <option value="" disabled>
            {placeholder}
          </option>
        }
        {options.map((option) =>
        <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true" />
      
    </div>);

});