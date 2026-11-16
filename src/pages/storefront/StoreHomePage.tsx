import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import ProductCard from '../../components/shared/ProductCard';
import { Button } from '../../components/ui/button';
import { products, categories } from '../../data/mockData';
import { ROUTES } from '../../lib/routes';

const featured = products.filter(p => p.status === 'active').slice(0, 4);
const newArrivals = products.filter(p => p.status === 'active').slice(4, 8);

export default function StoreHomePage() {
  return (
    <StorefrontLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#065F46] text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #059669 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-5">
              🎉 عروض نهاية الموسم — خصم حتى 40%
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              أحدث الأزياء<br />
              <span className="text-[#34D399]">بأفضل الأسعار</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              اكتشف تشكيلة واسعة من الملابس والأكسسوارات المختارة بعناية لتجعلك مميزاً
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to={ROUTES.STORE_PRODUCTS}>
                <Button size="lg" className="gap-2 bg-[#059669] hover:bg-[#047857]">
                  تسوق الآن <ArrowLeft size={16} />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                اكتشف العروض
              </Button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
            {featured.slice(0, 4).map((p, i) => (
              <div key={p.id} className={`rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[var(--fg)]">تسوق حسب الفئة</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link key={cat.id} to={`${ROUTES.STORE_PRODUCTS}?cat=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl hover:border-[#059669] hover:shadow-md transition-all group">
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-[var(--fg)] text-center group-hover:text-[#059669] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[var(--fg)]">المنتجات المميزة</h2>
          <Link to={ROUTES.STORE_PRODUCTS} className="text-sm font-semibold text-[#059669] hover:underline flex items-center gap-1">
            عرض الكل <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-[#059669] to-[#0D9488] rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm opacity-80 font-semibold mb-2">عرض محدود</p>
              <h3 className="text-3xl font-black mb-2">شحن مجاني على الطلبات</h3>
              <p className="text-white/70">عند شراء منتجين أو أكثر من أي فئة</p>
            </div>
            <Link to={ROUTES.STORE_PRODUCTS}>
              <Button size="lg" className="bg-white text-[#059669] hover:bg-gray-50 whitespace-nowrap">
                تسوق الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[var(--fg)]">وصل حديثاً</h2>
          <Link to={ROUTES.STORE_PRODUCTS} className="text-sm font-semibold text-[#059669] hover:underline flex items-center gap-1">
            عرض الكل <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </StorefrontLayout>
  );
}
