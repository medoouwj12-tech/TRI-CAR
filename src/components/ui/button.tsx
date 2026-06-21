import { cn } from '@/lib/utils';
import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60';
    const variants: Record<string, string> = {
      primary:
        'bg-gold-gradient text-ink-900 shadow-gold hover:shadow-gold-lg hover:scale-[1.03] active:scale-[0.98]',
      outline:
        'border border-gold-400/40 text-gold-600 dark:text-gold-200 hover:bg-gold-400/5 hover:border-gold-400/70',
      ghost: 'text-foreground/80 hover:text-foreground',
    };
    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-7 text-base',
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
