import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
  variant = 'pills' // 'pills' | 'underline'
}) => {
  return (
    <div className={twMerge('flex flex-wrap gap-1.5', className)}>
      {tabs.map((tab) => {
        const id = typeof tab === 'object' ? tab.id : tab;
        const label = typeof tab === 'object' ? tab.label : tab;
        const icon = typeof tab === 'object' ? tab.icon : null;
        const count = typeof tab === 'object' ? tab.count : null;
        const isActive = activeTab === id;

        if (variant === 'underline') {
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={clsx(
                'flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all',
                isActive
                  ? 'border-calm-600 text-calm-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              )}
            >
              {icon}
              <span>{label}</span>
              {count !== null && (
                <span className={clsx('text-xs px-2 py-0.5 rounded-full', isActive ? 'bg-calm-100 text-calm-800' : 'bg-slate-100 text-slate-600')}>
                  {count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all',
              isActive
                ? 'bg-calm-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
            )}
          >
            {icon}
            <span>{label}</span>
            {count !== null && (
              <span className={clsx('text-xs px-1.5 py-0.2 rounded-full', isActive ? 'bg-calm-700 text-white' : 'bg-slate-100 text-slate-600')}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
