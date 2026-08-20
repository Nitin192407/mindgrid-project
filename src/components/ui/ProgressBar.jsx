import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ProgressBar = ({
  value = 0,
  max = 100,
  className = '',
  color = 'calm',
  showLabel = false,
  height = 'h-2.5'
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colors = {
    calm: 'bg-calm-500',
    serene: 'bg-serene-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1.5">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={twMerge('w-full bg-slate-100 rounded-full overflow-hidden', height, className)}>
        <div
          className={twMerge('h-full transition-all duration-500 ease-out rounded-full', colors[color] || colors.calm)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
