import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlassCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-6",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
