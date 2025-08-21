import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium font-sans transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 hover:scale-105 cursor-pointer',
          {
            // Variants avec palette teal
            'bg-teal text-white hover:bg-teal/90 focus:ring-teal shadow-sm': variant === 'primary',
            'bg-teal-light text-white hover:bg-teal-light/80 focus:ring-teal-light shadow-sm': variant === 'secondary',
            'border-2 border-teal bg-transparent text-teal hover:bg-teal/5 focus:ring-teal': variant === 'outline',
            'bg-transparent text-teal hover:bg-teal/10 focus:ring-teal/20': variant === 'ghost',
            // Sizes
            'px-3 py-2 text-sm font-medium min-h-[36px]': size === 'sm',
            'px-4 py-2.5 text-base font-medium min-h-[40px]': size === 'md',
            'px-6 py-3 text-lg font-semibold min-h-[44px]': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;