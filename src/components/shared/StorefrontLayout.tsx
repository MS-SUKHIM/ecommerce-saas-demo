import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown, Phone, Mail, Share2, MessageCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../lib/routes';
import { cn } from '../../lib/utils';
import { categories } from '../../data/mockData';

interface Props { children: ReactNode }

export default function StorefrontLayout({ children }: Props) {
  const { itemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) navigate(`${ROUTES.STORE_PRODUCTS}?q=${encodeURIComponent(searchQ)}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]" dir="rtl">
      {/* Top bar */}
      <div className="bg-[#059669] text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={11} /> +966 50 123 4567</span>
          <span className="flex items-center gap-1"><Mail size={11} /> info@elegance.sa</span>
        </div>
        <span>شحن مجاني للطلبات فوق 200 ر.س 🎁</span>
      </div>

      {/* Main header */}
      <header className="bg-[var(--bg-card)] border-b border-[var(--border)] sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to={ROUTES.STORE} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#059669] flex items-center justify-center text-white font-black text-xl">أ</div>
              <div>
                <div className="font-black text-[var(--fg)] leading-tight">متجر الأناقة</div>
                <div className="text-[10px] text-[var(--fg-muted)] leading-tight">مدعوم بـ دكان</div>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:block max-w-lg">
              <div className="relative">
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
                <input
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-full pr-9 pl-4 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 mr-auto">
              <button onClick={toggleTheme} className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)] hover:border-[#059669] transition-colors">
                {isDark ? '☀️' : '🌙'}
              </button>
              <button className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)] hover:border-[#059669] transition-colors">
                <Heart size={16} />
              </button>
              <Link to={ROUTES.STORE_CART} className="relative flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
                <ShoppingCart size={16} />
                <span className="hidden sm:block">السلة</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">{itemCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center border border-[var(--border)] rounded-xl text-[var(--fg-muted)]">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Category nav */}
        <div className="border-t border-[var(--border)] hidden lg:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              <Link to={ROUTES.STORE_PRODUCTS} className="flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[#059669] px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all whitespace-nowrap">
                جميع المنتجات
              </Link>
              {categories.slice(0, 7).map(cat => (
                <Link
                  key={cat.id}
                  to={`${ROUTES.STORE_PRODUCTS}?category=${cat.slug}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[#059669] px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all whitespace-nowrap"
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 bg-[var(--bg-card)] shadow-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-[var(--fg)]">القائمة</span>
              <button onClick={() => setMobileOpen(false)}><X size={18} /></button>
            </div>
            <nav className="space-y-1">
              {categories.map(cat => (
                <Link key={cat.id} to={`${ROUTES.STORE_PRODUCTS}?category=${cat.slug}`} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--fg)] hover:bg-gray-100 dark:hover:bg-slate-800">
                  <span>{cat.icon}</span>{cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--sidebar-bg)] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white font-black">أ</div>
                <span className="font-black text-lg">متجر الأناقة</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">متجر الأزياء والإكسسوارات الراقية بأسعار تنافسية وجودة عالية.</p>
            </div>
            {[
              { title: 'روابط سريعة', links: ['الرئيسية', 'المنتجات', 'العروض', 'المدونة'] },
              { title: 'خدمة العملاء', links: ['اتصل بنا', 'الشحن والتوصيل', 'الإرجاع والاستبدال', 'الأسئلة الشائعة'] },
              { title: 'تابعنا', links: [] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold mb-3 text-sm">{col.title}</h4>
                {col.links.length > 0
                  ? <ul className="space-y-2">{col.links.map(l => <li key={l}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a></li>)}</ul>
                  : <div className="flex gap-2"><Share2 size={20} className="text-white/50 hover:text-white cursor-pointer" /><MessageCircle size={20} className="text-white/50 hover:text-white cursor-pointer" /></div>
                }
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
            <span>© 2026 متجر الأناقة. جميع الحقوق محفوظة</span>
            <span>مدعوم بـ <span className="text-[#059669] font-bold">دكان</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
