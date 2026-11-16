import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import SearchBar from '../../components/shared/SearchBar';
import DataTable, { Column } from '../../components/shared/DataTable';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { products, categories } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';
import { PRODUCT_STATUSES } from '../../lib/constants';
import { ROUTES } from '../../lib/routes';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type Product = typeof products[number];

const statusVariant = (s: string) => PRODUCT_STATUSES[s as keyof typeof PRODUCT_STATUSES]?.color ?? 'gray';
const statusLabel  = (s: string) => PRODUCT_STATUSES[s as keyof typeof PRODUCT_STATUSES]?.label ?? s;

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchC = catFilter === 'all' || p.category === catFilter;
    return matchQ && matchC;
  });

  const cols: Column<Product>[] = [
    {
      key: 'name',
      header: 'المنتج',
      cell: row => (
        <div className="flex items-center gap-3">
          <img src={row.img} alt={row.name} className="w-10 h-10 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">{row.name}</p>
            <p className="text-xs text-[var(--fg-muted)] font-mono">{row.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'الفئة', cell: r => <span className="text-sm text-[var(--fg-muted)]">{r.category}</span> },
    { key: 'price', header: 'السعر', cell: r => <span className="font-semibold text-[var(--fg)]">{formatCurrency(r.price)}</span> },
    { key: 'stock', header: 'المخزون', cell: r => (
      <span className={`text-sm font-medium ${r.stock === 0 ? 'text-red-500' : r.stock <= 10 ? 'text-amber-600' : 'text-[var(--fg)]'}`}>{r.stock}</span>
    )},
    { key: 'status', header: 'الحالة', cell: r => <Badge variant={statusVariant(r.status) as any}>{statusLabel(r.status)}</Badge> },
    { key: 'actions', header: '', cell: row => (
      <div className="flex items-center gap-1 justify-end">
        <Link to={ROUTES.STORE_PRODUCT(row.id)}>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} /></Button>
        </Link>
        <Link to={ROUTES.PRODUCT_EDIT(row.id)}>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil size={14} /></Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteTarget(row)}>
          <Trash2 size={14} />
        </Button>
      </div>
    )},
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="المنتجات"
        description={`${filtered.length} منتج`}
        actions={
          <Link to={ROUTES.PRODUCT_NEW}>
            <Button className="gap-2"><Plus size={16} />إضافة منتج</Button>
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="ابحث بالاسم أو SKU..." className="w-64" />
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="كل الفئات" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الفئات</SelectItem>
            {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered} columns={cols} rowKey={r => r.id} />

      {/* Delete confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent size="sm">
          <DialogHeader><DialogTitle>حذف المنتج</DialogTitle></DialogHeader>
          <p className="text-sm text-[var(--fg-muted)] px-1">هل أنت متأكد من حذف <span className="font-semibold text-[var(--fg)]">{deleteTarget?.name}</span>؟ لا يمكن التراجع.</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">إلغاء</Button></DialogClose>
            <Button variant="danger" onClick={() => { toast.success('تم حذف المنتج'); setDeleteTarget(null); }}>حذف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
