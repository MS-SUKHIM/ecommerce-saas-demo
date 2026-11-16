import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        default:   'bg-[#059669] text-white hover:bg-[#047857] shadow-sm',
        outline:   'border border-[var(--border)] bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800 text-[var(--fg)]',
        ghost:     'hover:bg-gray-100 dark:hover:bg-slate-800 text-[var(--fg)]',
        secondary: 'bg-gray-100 dark:bg-slate-700 text-[var(--fg)] hover:bg-gray-200 dark:hover:bg-slate-600',
        danger:    'bg-red-500 text-white hover:bg-red-600',
        link:      'text-[#059669] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm:   'h-8 px-3 text-xs',
        md:   'h-9 px-4',
        lg:   'h-11 px-6 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
        {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';
export { Button, buttonVariants };
