import React from 'react';
import { cn } from './GlassCard';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
    outline: "border border-white/20 text-white hover:bg-white/5",
    danger: "bg-red-500/80 text-white hover:bg-red-500 shadow-lg shadow-red-500/20",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    />
  );
};
