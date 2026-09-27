import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm border border-transparent',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-sm border border-transparent',
    outline:
      'border border-border bg-card text-foreground hover:bg-muted hover:border-muted-foreground/30',
    ghost: 'text-foreground hover:bg-muted',
    link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
  };

  const sizeStyles = {
    sm: 'h-9 px-3.5 text-xs font-medium rounded-sm gap-1.5',
    md: 'h-11 px-5 text-sm font-semibold rounded-sm gap-2',
    lg: 'h-13 px-7 text-base font-semibold rounded-md gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-sans transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
        variantStyles[variant],
        variant !== 'link' && sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
