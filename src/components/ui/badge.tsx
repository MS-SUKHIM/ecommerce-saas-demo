import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:  'bg-[#ECFDF5] text-[#059669]',
        gray:     'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300',
        red:      'bg-red-50 text-red-700',
        yellow:   'bg-yellow-50 text-yellow-700',
        blue:     'bg-blue-50 text-blue-700',
        purple:   'bg-purple-50 text-purple-700',
        indigo:   'bg-indigo-50 text-indigo-700',
        green:    'bg-emerald-50 text-emerald-700',
        outline:  'border border-[var(--border)] text-[var(--fg)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
