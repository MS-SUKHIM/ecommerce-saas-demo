import { LucideIcon, PackageSearch } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon = PackageSearch, title = 'لا توجد بيانات', description = 'لم يتم العثور على أي عناصر', actionLabel, onAction }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon size={28} className="text-[var(--fg-muted)]" />
      </div>
      <h3 className="font-semibold text-[var(--fg)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--fg-muted)] mb-4 max-w-xs">{description}</p>
      {actionLabel && onAction && <Button onClick={onAction} size="sm">{actionLabel}</Button>}
    </div>
  );
}
