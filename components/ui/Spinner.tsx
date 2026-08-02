import * as React from 'react';
import { cn } from '@/lib/utils/formatting';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent text-gold',
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}
