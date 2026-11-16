import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }

export default function SearchBar({ value, onChange, placeholder = 'بحث...', className }: Props) {
  return (
    <div className={cn('relative', className)}>
      <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-9 pl-8 py-2 h-9 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--input-bg)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)]">
          <X size={13} />
        </button>
      )}
    </div>
  );
}
