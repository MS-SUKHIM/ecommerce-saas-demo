import { ReactNode } from 'react';

interface Props { title: string; description?: string; actions?: ReactNode }

export default function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--fg)]">{title}</h1>
        {description && <p className="text-sm text-[var(--fg-muted)] mt-0.5">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
