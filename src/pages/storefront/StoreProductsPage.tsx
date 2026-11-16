import { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import ProductCard from '../../components/shared/ProductCard';
import SearchBar from '../../components/shared/SearchBar';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { products, categories } from '../../data/mockData';
import { cn } from '../../lib/utils';

const SORT_OPTIONS = [
  { value: 'default',     label: 'الأحدث' },
  { value: 'price_asc',   label: 'السعر: من الأقل' },
  { value: 'price_desc',  label: 'السعر: من الأعلى' },
  { value: 'rating',      label: 'الأعلى تقييماً' },
];

export default function StoreProductsPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>(params.get('cat') ? [params.get('cat')!] : []);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCat = (id: string) =>
    setSelectedCats(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filtered = useMemo(() => {
    let list = products.filter(p => p.status === 'active');
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedCats.length) list = list.filter(p => selectedCats.some(c => categories.find(cat => cat.id === c)?.name === p.category));
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'price_asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, selectedCats, maxPrice, sort]);

  const Sidebar = () => (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-[var(--fg)] mb-3 text-sm">الفئات</h3>
        <div className="space-y-2">
          {categories.map(c => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox id={c.id} checked={selectedCats.includes(c.id)} onCheckedChange={() => toggleCat(c.id)} />
              <Label htmlFor={c.id} className="text-sm cursor-pointer">{c.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-bold text-[var(--fg)] mb-3 text-sm">الحد الأقصى للسعر</h3>
        <input type="range" min={0} max={5000} step={50} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#059669]" />
        <div className="flex justify-between text-xs text-[var(--fg-muted)] mt-1">
          <span>0 ر.س</span>
          <span className="font-semibold text-[#059669]">{maxPrice.toLocaleString('ar-SA')} ر.س</span>
        </div>
      </div>
      {(selectedCats.length > 0 || maxPrice < 5000) && (
        <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCats([]); setMaxPrice(5000); }}>
          إعادة ضبط الفلاتر
        </Button>
      )}
    </div>
  );

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="text-2xl font-black text-[var(--fg)] flex-1">جميع المنتجات</h1>
          <SearchBar value={search} onChange={setSearch} placeholder="ابحث في المنتجات..." className="w-56" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <SlidersHorizontal size={14} />فلترة
            </Button>
            <div className="relative group">
              <Button variant="outline" size="sm" className="gap-2">
                {SORT_OPTIONS.find(o => o.value === sort)?.label} <ChevronDown size={12} />
              </Button>
              <div className="absolute top-full mt-1 left-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg z-20 min-w-44 py-1 hidden group-hover:block">
                {SORT_OPTIONS.map(o => (
                  <button key={o.value} onClick={() => setSort(o.value)}
                    className={cn('w-full px-4 py-2 text-sm text-right hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors', sort === o.value && 'text-[#059669] font-semibold')}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {selectedCats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCats.map(id => {
              const c = categories.find(x => x.id === id);
              return c ? <Badge key={id} variant="outline" className="gap-1 cursor-pointer" onClick={() => toggleCat(id)}>{c.name} ×</Badge> : null;
            })}
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 sticky top-20">
              <Sidebar />
            </div>
          </aside>

          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--bg-card)] p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--fg-muted)] mb-4">{filtered.length} منتج</p>
            {filtered.length === 0
              ? <div className="text-center py-20 text-[var(--fg-muted)]">لا توجد منتجات تطابق الفلترة</div>
              : <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            }
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
