import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  value,
  onChange,
  placeholder = 'Select an option',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={twMerge(
          clsx(
            'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors duration-150',
            'focus:border-calm-500 focus:outline-none focus:ring-2 focus:ring-calm-500/20',
            error ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300',
            className
          )
        )}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
