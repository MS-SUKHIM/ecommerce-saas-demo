import { ReactNode } from 'react';
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import EmptyState from './EmptyState';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: (row: T) => string | number;
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (p: number) => void;
  totalItems?: number;
  pageSize?: number;
  emptyTitle?: string;
  emptyDesc?: string;
}

export default function DataTable<T>({ data, columns, rowKey, isLoading, page = 1, totalPages = 1, onPageChange, totalItems, pageSize = 10, emptyTitle, emptyDesc }: Props<T>) {
  const from = totalItems ? (page - 1) * pageSize + 1 : 0;
  const to   = totalItems ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-[var(--border)]">
            <tr>
              {columns.map(col => (
                <th key={col.key} className={cn('text-right px-4 py-3 text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wide whitespace-nowrap', col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => (
                  <tr key={i}>
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                    ))}
                  </tr>
                ))
              : data.length === 0
                ? (
                  <tr>
                    <td colSpan={columns.length}>
                      <EmptyState title={emptyTitle} description={emptyDesc} />
                    </td>
                  </tr>
                )
                : data.map((row, i) => (
                  <tr key={rowKey ? rowKey(row) : i} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    {columns.map(col => (
                      <td key={col.key} className={cn('px-4 py-3 text-[var(--fg)]', col.className)}>{col.cell(row)}</td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--fg-muted)]">
            {totalItems ? `عرض ${from}–${to} من ${totalItems}` : `صفحة ${page} من ${totalPages}`}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(1)} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"><ChevronsRight size={13} /></button>
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"><ChevronRight size={13} /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <button key={p} onClick={() => onPageChange(p)} className={cn('w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors', p === page ? 'bg-[#059669] text-white' : 'border border-[var(--border)] hover:bg-gray-100 dark:hover:bg-slate-700')}>
                  {p}
                </button>
              );
            })}
            <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"><ChevronLeft size={13} /></button>
            <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border)] disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"><ChevronsLeft size={13} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
