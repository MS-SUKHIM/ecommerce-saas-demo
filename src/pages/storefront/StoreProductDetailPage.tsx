import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ChevronRight, Minus, Plus, Share2 } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import ProductCard from '../../components/shared/ProductCard';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { products, reviews } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['#111827', '#F9FAFB', '#059669', '#3B82F6', '#EF4444'];

export default function StoreProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [mainImg, setMainImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[var(--fg-muted)]">المنتج غير موجود</div>
    </StorefrontLayout>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const imgList = [product.img, ...products.slice(0, 3).map(p => p.img)];
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const addToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, img: product.img });
    }
    toast.success('تمت الإضافة إلى السلة');
  };

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-6">
          <Link to={ROUTES.STORE} className="hover:text-[#059669]">الرئيسية</Link>
          <ChevronRight size={14} />
          <Link to={ROUTES.STORE_PRODUCTS} className="hover:text-[#059669]">المنتجات</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--fg)] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-[var(--border)]">
              <img src={imgList[mainImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {imgList.map((img, i) => (
                <button key={i} onClick={() => setMainImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${mainImg === i ? 'border-[#059669]' : 'border-[var(--border)]'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-[#059669] font-semibold mb-1">{product.category}</p>
              <h1 className="text-2xl font-black text-[var(--fg)]">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[var(--fg)]">{product.rating}</span>
                <span className="text-sm text-[var(--fg-muted)]">({product.reviews} تقييم)</span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[var(--fg)]">{formatCurrency(product.price)}</span>
              {product.comparePrice && (
                <>
                  <span className="text-lg text-[var(--fg-muted)] line-through">{formatCurrency(product.comparePrice)}</span>
                  <Badge variant="red">خصم {discount}%</Badge>
                </>
              )}
            </div>

            {/* Size */}
            <div>
              <p className="text-sm font-semibold text-[var(--fg)] mb-2">المقاس: <span className="font-bold">{selectedSize}</span></p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-xl border-2 text-sm font-semibold transition-all ${selectedSize === s ? 'border-[#059669] bg-[#059669] text-white' : 'border-[var(--border)] text-[var(--fg)] hover:border-[#059669]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="text-sm font-semibold text-[var(--fg)] mb-2">اللون</p>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'ring-2 ring-[#059669] ring-offset-2' : 'border-[var(--border)]'}`}
                    style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[var(--fg)]">الكمية:</p>
              <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-[var(--fg-muted)]">{product.stock} متاح</span>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gap-2" onClick={addToCart} disabled={product.stock === 0}>
                <ShoppingCart size={18} />
                {product.stock === 0 ? 'نفذ المخزون' : 'أضف للسلة'}
              </Button>
              <Button size="lg" variant="outline" className="px-4" onClick={() => setWishlisted(!wishlisted)}>
                <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
              </Button>
              <Button size="lg" variant="outline" className="px-4" onClick={() => toast.info('تم نسخ رابط المنتج')}>
                <Share2 size={18} />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {['شحن سريع 24 ساعة', 'إرجاع مجاني 30 يوم', 'ضمان الجودة'].map(b => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
                  <Check size={12} className="text-[#059669]" />{b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details tabs */}
        <Tabs defaultValue="description" className="mb-14">
          <TabsList>
            <TabsTrigger value="description">الوصف</TabsTrigger>
            <TabsTrigger value="specs">المواصفات</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات ({productReviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 text-sm text-[var(--fg-muted)] leading-relaxed">
              <p>منتج عالي الجودة من مواد ممتازة، مصنوع بعناية فائقة لضمان راحتك وأناقتك. يناسب المناسبات الرسمية والعادية على حد سواء.</p>
              <ul className="mt-4 space-y-1 list-disc list-inside">
                <li>مادة قطن 100% ناعمة وتسمح للجلد بالتنفس</li>
                <li>مقاسات متعددة تناسب جميع الأجسام</li>
                <li>ألوان ثابتة لا تتأثر بالغسيل</li>
                <li>مصنوع وفق أعلى معايير الجودة</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
              <div className="divide-y divide-[var(--border)]">
                {[['الفئة', product.category], ['رمز المنتج', product.sku], ['المخزون', `${product.stock} وحدة`], ['التقييم', `${product.rating}/5`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 text-sm">
                    <span className="text-[var(--fg-muted)]">{k}</span>
                    <span className="font-semibold text-[var(--fg)]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-4">
              {productReviews.length === 0
                ? <p className="text-[var(--fg-muted)] text-center py-8">لا يوجد تقييمات بعد</p>
                : productReviews.map(r => (
                    <div key={r.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9"><AvatarFallback>{r.user[0]}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-[var(--fg)] text-sm">{r.user}</p>
                            <span className="text-xs text-[var(--fg-muted)]">{formatDate(r.date)}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}
                          </div>
                          <p className="text-sm text-[var(--fg-muted)]">{r.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </TabsContent>
        </Tabs>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-[var(--fg)] mb-5">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </StorefrontLayout>
  );
}
