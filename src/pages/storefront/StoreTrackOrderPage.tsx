import { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Clock, MapPin } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { orders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ORDER_STATUSES } from '../../lib/constants';

const STEPS = [
  { status: 'pending',    icon: Clock,         label: 'تم استلام الطلب',   desc: 'جارٍ مراجعة طلبك' },
  { status: 'processing', icon: Package,        label: 'قيد التجهيز',       desc: 'يتم تجهيز منتجاتك' },
  { status: 'shipped',    icon: Truck,          label: 'في الطريق إليك',   desc: 'طلبك في الشحن' },
  { status: 'delivered',  icon: CheckCircle,    label: 'تم التسليم',       desc: 'استلمت طلبك بنجاح' },
];
const ORDER_IDX: Record<string, number> = { pending: 0, processing: 1, shipped: 2, delivered: 3 };

export default function StoreTrackOrderPage() {
  const [input, setInput] = useState('');
  const [found, setFound] = useState<typeof orders[number] | null | undefined>(undefined);

  const search = () => {
    const o = orders.find(o => o.id.toLowerCase() === input.trim().toLowerCase());
    setFound(o ?? null);
  };

  const cfg = found ? ORDER_STATUSES[found.status as keyof typeof ORDER_STATUSES] : null;
  const activeStep = found ? (ORDER_IDX[found.status] ?? 0) : 0;
  const isCancelled = found?.status === 'cancelled';

  return (
    <StorefrontLayout>
      <div className="max-w-2xl mx-auto px-4 py-12" dir="rtl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-[var(--fg)] mb-2">تتبع طلبك</h1>
          <p className="text-[var(--fg-muted)]">أدخل رقم الطلب لمعرفة حالته</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="ORD-001 مثال:" className="flex-1 text-base h-12" />
          <Button className="gap-2 h-12 px-6" onClick={search}><Search size={16} />بحث</Button>
        </div>

        {/* Demo hint */}
        <p className="text-xs text-center text-[var(--fg-muted)] mb-6">
          للتجربة، جرب: <span className="font-mono font-bold">{orders.slice(0,3).map(o=>o.id).join(' | ')}</span>
        </p>

        {/* Result */}
        {found === null && (
          <div className="text-center py-10 text-[var(--fg-muted)]">
            لم يتم العثور على طلب برقم <span className="font-mono font-bold">{input}</span>
          </div>
        )}

        {found && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="font-mono font-black text-xl text-[var(--fg)]">{found.id}</p>
                <p className="text-sm text-[var(--fg-muted)] mt-0.5">{formatDate(found.date)}</p>
              </div>
              <Badge variant={(cfg?.color ?? 'gray') as any} className="text-sm py-1 px-3">{cfg?.label ?? found.status}</Badge>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {isCancelled
                ? <div className="text-center py-6 text-red-500 font-semibold">تم إلغاء هذا الطلب</div>
                : <div className="relative">
                    <div className="absolute top-4 right-4 left-4 h-0.5 bg-[var(--border)]" />
                    <div className="absolute top-4 right-4 h-0.5 bg-[#059669] transition-all" style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
                    <div className="relative flex justify-between">
                      {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        const done = activeStep >= i;
                        return (
                          <div key={s.status} className="flex flex-col items-center gap-2 flex-1">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 transition-colors ${done ? 'bg-[#059669] text-white' : 'bg-[var(--bg-card)] border-2 border-[var(--border)] text-[var(--fg-muted)]'}`}>
                              <Icon size={16} />
                            </div>
                            <p className={`text-xs font-semibold text-center ${done ? 'text-[#059669]' : 'text-[var(--fg-muted)]'}`}>{s.label}</p>
                            {done && <p className="text-[10px] text-[var(--fg-muted)] text-center">{s.desc}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
              }
            </div>

            {/* Items */}
            <div className="px-6 pb-4 border-t border-[var(--border)]">
              <p className="font-semibold text-[var(--fg)] text-sm mb-3 pt-4">المنتجات</p>
              <div className="space-y-2">
                {found.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold">{item.qty}</div>
                    <span className="flex-1 text-[var(--fg)]">{item.name}</span>
                    <span className="font-semibold text-[var(--fg)]">{formatCurrency(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="px-6 pb-6 flex items-center justify-between">
              <span className="font-bold text-[var(--fg)]">الإجمالي</span>
              <span className="text-xl font-black text-[#059669]">{formatCurrency(found.total)}</span>
            </div>
          </div>
        )}
      </div>
    </StorefrontLayout>
  );
}
