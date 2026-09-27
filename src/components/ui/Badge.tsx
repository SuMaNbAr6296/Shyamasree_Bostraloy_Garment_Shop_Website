import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'success';
}

export function Badge({
  children,
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/15 text-secondary-foreground border-secondary/30',
    accent: 'bg-accent/10 text-accent border-accent/20',
    outline: 'bg-transparent text-foreground border-border',
    success: 'bg-success/10 text-success border-success/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border font-sans tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
