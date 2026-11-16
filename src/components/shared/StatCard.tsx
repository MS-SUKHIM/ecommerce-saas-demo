import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  iconColor?: string;
  iconBg?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, iconColor = 'text-[#059669]', iconBg = 'bg-[#ECFDF5]' }: Props) {
  const pos = trend !== undefined && trend >= 0;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="text-sm text-[var(--fg-muted)] font-medium">{title}</p>
          <p className="text-2xl font-bold text-[var(--fg)] mt-1 leading-tight">{value}</p>
          {trend !== undefined && (
            <div className={cn('flex items-center gap-1 mt-1.5 text-xs font-semibold', pos ? 'text-emerald-600' : 'text-red-500')}>
              {pos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{Math.abs(trend)}%</span>
              {trendLabel && <span className="text-[var(--fg-muted)] font-normal">{trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon size={22} className={iconColor} />
        </div>
      </CardContent>
    </Card>
  );
}
