import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  decorative?: boolean;
}

export function Divider({ className, decorative = true, ...props }: DividerProps) {
  return (
    <hr
      role={decorative ? 'none' : 'separator'}
      className={cn('border-t border-border my-6 w-full', className)}
      {...props}
    />
  );
}
