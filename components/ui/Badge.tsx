import * as React from 'react';
import { cn } from '@/lib/utils/formatting';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'success' | 'muted' | 'outline';
}

export function Badge({ className, variant = 'gold', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        {
          'badge-gold': variant === 'gold',
          'badge-success': variant === 'success',
          'badge-muted': variant === 'muted',
          'badge-outline': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
