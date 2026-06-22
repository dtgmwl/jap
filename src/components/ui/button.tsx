import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-farm-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-gradient-to-r from-farm-accent to-farm-accent-dark text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark shadow-md shadow-farm-accent/20': variant === 'primary',
            'bg-farm-green-pale text-farm-green-dark hover:bg-farm-green/20': variant === 'secondary',
            'border-2 border-farm-green text-farm-green-dark hover:bg-farm-green-pale': variant === 'outline',
            'text-farm-stone hover:bg-farm-green-pale': variant === 'ghost',
          },
          {
            'h-9 px-4 text-xs': size === 'sm',
            'h-11 px-5 text-sm': size === 'md',
            'h-13 px-7 text-base': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
