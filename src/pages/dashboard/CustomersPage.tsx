import { useState } from 'react';
import { User, ShoppingBag, DollarSign, Mail, Phone, MapPin } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import SearchBar from '../../components/shared/SearchBar';
import DataTable, { Column } from '../../components/shared/DataTable';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '../../components/ui/dialog';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { customers, orders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ORDER_STATUSES } from '../../lib/constants';

type Customer = typeof customers[number];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const customerOrders = selected ? orders.filter(o => o.customer === selected.name) : [];

  const cols: Column<Customer>[] = [
    { key: 'name', header: 'العميل', cell: r => (
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8"><AvatarFallback>{r.name[0]}</AvatarFallback></Avatar>
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">{r.name}</p>
          <p className="text-xs text-[var(--fg-muted)]">{r.email}</p>
        </div>
      </div>
    )},
    { key: 'city',    header: 'المدينة', cell: r => <span className="text-sm text-[var(--fg-muted)]">{r.city}</span> },
    { key: 'orders',  header: 'الطلبات', cell: r => <span className="font-semibold text-[var(--fg)]">{r.orders}</span> },
    { key: 'total',   header: 'إجمالي المشتريات', cell: r => <span className="font-semibold text-[#059669]">{formatCurrency(r.spent)}</span> },
    { key: 'since',   header: 'عميل منذ', cell: r => <span className="text-sm text-[var(--fg-muted)]">{formatDate(r.since)}</span> },
    { key: 'actions', header: '', cell: row => (
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(row)}>
        <User size={14} />
      </Button>
    )},
  ];

  return (
    <DashboardLayout>
      <PageHeader title="العملاء" description={`${filtered.length} عميل`} />

      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="ابحث بالاسم أو البريد..." className="w-64" />
      </div>

      <DataTable data={filtered} columns={cols} rowKey={r => r.id} />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent size="lg">
          <DialogHeader><DialogTitle>ملف العميل</DialogTitle></DialogHeader>
          <DialogBody>
            {selected && (
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 text-xl"><AvatarFallback>{selected.name[0]}</AvatarFallback></Avatar>
                  <div>
                    <h3 className="text-xl font-black text-[var(--fg)]">{selected.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[var(--fg-muted)]">
                      <span className="flex items-center gap-1"><Mail size={13} />{selected.email}</span>
                      {selected.phone && <span className="flex items-center gap-1"><Phone size={13} />{selected.phone}</span>}
                      <span className="flex items-center gap-1"><MapPin size={13} />{selected.city}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: ShoppingBag, label: 'الطلبات', value: selected.orders, color: 'text-blue-600 bg-blue-50' },
                    { icon: DollarSign, label: 'إجمالي الإنفاق', value: formatCurrency(selected.spent), color: 'text-emerald-600 bg-emerald-50' },
                  ].map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className={`flex items-center gap-3 p-4 rounded-xl ${s.color.split(' ')[1]}`}>
                        <Icon size={18} className={s.color.split(' ')[0]} />
                        <div>
                          <p className="text-xs text-[var(--fg-muted)]">{s.label}</p>
                          <p className="font-bold text-[var(--fg)]">{s.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div>
                  <p className="font-semibold text-[var(--fg)] mb-3 text-sm">آخر الطلبات</p>
                  {customerOrders.length === 0
                    ? <p className="text-sm text-[var(--fg-muted)]">لا توجد طلبات مرتبطة</p>
                    : <div className="space-y-2">
                        {customerOrders.slice(0,4).map(o => (
                          <div key={o.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/30 rounded-xl">
                            <span className="font-mono text-xs font-semibold text-[var(--fg)]">{o.id}</span>
                            <Badge variant={(ORDER_STATUSES[o.status as keyof typeof ORDER_STATUSES]?.color ?? 'gray') as any} className="text-xs">
                              {ORDER_STATUSES[o.status as keyof typeof ORDER_STATUSES]?.label ?? o.status}
                            </Badge>
                            <span className="flex-1 text-xs text-[var(--fg-muted)]">{formatDate(o.date)}</span>
                            <span className="font-bold text-[var(--fg)] text-sm">{formatCurrency(o.total)}</span>
                          </div>
                        ))}
                      </div>
                  }
                </div>
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
