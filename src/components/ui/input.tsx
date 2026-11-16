import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { error?: string }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => (
  <div className="w-full">
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--input-bg)] px-3 py-1 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus:ring-red-300',
        className,
      )}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
));
Input.displayName = 'Input';
export { Input };
