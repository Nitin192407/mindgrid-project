import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  glass = false,
  padding = 'p-6',
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'rounded-2xl border transition-all duration-200',
          glass 
            ? 'glass-panel shadow-soft' 
            : 'bg-white border-slate-200/80 shadow-soft',
          hoverable && 'hover:shadow-soft-lg hover:border-slate-300/90 hover:-translate-y-0.5 cursor-pointer',
          padding,
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
  <div className={twMerge('flex items-start justify-between gap-4 mb-4', className)}>
    <div>
      {title && <h3 className="text-lg font-semibold text-slate-800 tracking-tight">{title}</h3>}
      {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);
