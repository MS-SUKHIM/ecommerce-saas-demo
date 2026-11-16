import { cn } from '../../lib/utils';

const sizes = { sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-10 h-10 border-3', xl: 'w-16 h-16 border-4' };

export default function LoadingSpinner({ size = 'md', className }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <div className={cn('border-[#059669] border-t-transparent rounded-full animate-spin', sizes[size], className)} />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--bg)]">
      <LoadingSpinner size="xl" />
    </div>
  );
}
