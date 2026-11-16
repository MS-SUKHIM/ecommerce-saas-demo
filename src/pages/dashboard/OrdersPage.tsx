import { useState } from 'react';
import { Eye } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import SearchBar from '../../components/shared/SearchBar';
import DataTable, { Column } from '../../components/shared/DataTable';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogClose } from '../../components/ui/dialog';
import { Separator } from '../../components/ui/separator';
import { orders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ORDER_STATUSES } from '../../lib/constants';
import { CheckCircle, Clock, Truck, Package, XCircle } from 'lucide-react';

type Order = typeof orders[number];

const sv = (s: string) => (ORDER_STATUSES[s as keyof typeof ORDER_STATUSES]?.color ?? 'gray') as any;
const sl = (s: string) => ORDER_STATUSES[s as keyof typeof ORDER_STATUSES]?.label ?? s;

const TIMELINE = [
  { status: 'pending',    icon: Clock,       label: 'في الانتظار' },
  { status: 'processing', icon: Package,     label: 'قيد التجهيز' },
  { status: 'shipped',    icon: Truck,       label: 'جاري الشحن' },
  { status: 'delivered',  icon: CheckCircle, label: 'تم التسليم' },
];

const statusOrder = ['pending','processing','shipped','delivered','cancelled'];

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || o.status === statusFilter;
    return matchQ && matchS;
  });

  const cols: Column<Order>[] = [
    { key: 'id',       header: 'رقم الطلب',   cell: r => <span className="font-mono text-sm font-semibold text-[var(--fg)]">{r.id}</span> },
    { key: 'customer', header: 'العميل',       cell: r => <span className="text-sm text-[var(--fg)]">{r.customer}</span> },
    { key: 'status',   header: 'الحالة',       cell: r => <Badge variant={sv(r.status)}>{sl(r.status)}</Badge> },
    { key: 'total',    header: 'الإجمالي',     cell: r => <span className="font-bold text-[var(--fg)]">{formatCurrency(r.total)}</span> },
    { key: 'date',     header: 'التاريخ',      cell: r => <span className="text-sm text-[var(--fg-muted)]">{formatDate(r.date)}</span> },
    { key: 'actions',  header: '',             cell: row => (
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(row)}>
        <Eye size={14} />
      </Button>
    )},
  ];

  const activeIdx = selected ? statusOrder.indexOf(selected.status) : -1;

  return (
    <DashboardLayout>
      <PageHeader title="الطلبات" description={`${filtered.length} طلب`} />

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="ابحث بالرقم أو الاسم..." className="w-64" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="كل الحالات" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            {Object.entries(ORDER_STATUSES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered} columns={cols} rowKey={r => r.id} />

      {/* Details modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب {selected?.id}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {selected && (
              <div className="space-y-5">
                {/* Timeline */}
                {selected.status !== 'cancelled' && (
                  <div className="flex items-center gap-0">
                    {TIMELINE.map((t, i) => {
                      const done = activeIdx >= i;
                      const Icon = t.icon;
                      return (
                        <div key={t.status} className="flex-1 flex flex-col items-center gap-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${done ? 'bg-[#059669] text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <Icon size={14} />
                          </div>
                          <span className={`text-xs font-medium ${done ? 'text-[#059669]' : 'text-[var(--fg-muted)]'}`}>{t.label}</span>
                          {i < TIMELINE.length - 1 && (
                            <div className="absolute" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <Separator />

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-[var(--fg-muted)]">العميل:</span> <span className="font-semibold text-[var(--fg)] mr-1">{selected.customer}</span></div>
                  <div><span className="text-[var(--fg-muted)]">التاريخ:</span> <span className="font-semibold text-[var(--fg)] mr-1">{formatDate(selected.date)}</span></div>
                  <div><span className="text-[var(--fg-muted)]">الحالة:</span> <Badge variant={sv(selected.status)} className="mr-1">{sl(selected.status)}</Badge></div>
                  <div><span className="text-[var(--fg-muted)]">الإجمالي:</span> <span className="font-bold text-[#059669] mr-1 text-base">{formatCurrency(selected.total)}</span></div>
                </div>

                <Separator />

                {/* Items */}
                <div>
                  <p className="font-semibold text-[var(--fg)] mb-3 text-sm">المنتجات</p>
                  <div className="space-y-2.5">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/70 dark:bg-slate-800/30 rounded-xl">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--fg)]">{item.name}</p>
                          <p className="text-xs text-[var(--fg-muted)]">الكمية: {item.qty}</p>
                        </div>
                        <span className="font-semibold text-[var(--fg)]">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <span className="font-bold text-[var(--fg)]">الإجمالي</span>
                  <span className="text-xl font-black text-[#059669]">{formatCurrency(selected.total)}</span>
                </div>
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
