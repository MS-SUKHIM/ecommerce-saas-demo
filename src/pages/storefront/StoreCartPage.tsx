import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

export default function StoreCartPage() {
  const { items, removeItem, updateQty, clear } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'DOKAN10') {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success('تم تطبيق كود الخصم: خصم 10%');
    } else {
      toast.error('كود الخصم غير صحيح');
    }
  };

  if (items.length === 0) {
    return (
      <StorefrontLayout>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center" dir="rtl">
          <ShoppingBag size={64} className="mx-auto mb-4 text-[var(--fg-muted)] opacity-30" />
          <h2 className="text-2xl font-black text-[var(--fg)] mb-2">السلة فارغة</h2>
          <p className="text-[var(--fg-muted)] mb-6">لم تضف أي منتجات بعد</p>
          <Link to={ROUTES.STORE_PRODUCTS}>
            <Button className="gap-2">تسوق الآن <ArrowLeft size={16} /></Button>
          </Link>
        </div>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-2xl font-black text-[var(--fg)] mb-6">سلة التسوق ({items.length} منتج)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex gap-4">
                <Link to={ROUTES.STORE_PRODUCT(item.id)}>
                  <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={ROUTES.STORE_PRODUCT(item.id)}>
                    <p className="font-semibold text-[var(--fg)] hover:text-[#059669] transition-colors">{item.name}</p>
                  </Link>
                  <p className="text-sm font-bold text-[#059669] mt-1">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeItem(item.id)}
                    className="text-[var(--fg-muted)] hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                  <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 text-[var(--fg)]">
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[var(--fg)]">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 text-[var(--fg)]">
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-[var(--fg)]">{formatCurrency(item.price * item.qty)}</span>
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Link to={ROUTES.STORE_PRODUCTS} className="flex-1">
                <Button variant="outline" className="w-full gap-2"><ArrowLeft size={14} />متابعة التسوق</Button>
              </Link>
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                onClick={() => clear()}>
                <Trash2 size={14} />إفراغ السلة
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4">
              <p className="font-semibold text-[var(--fg)] mb-3 flex items-center gap-2"><Tag size={14} />كود الخصم</p>
              <div className="flex gap-2">
                <Input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="DOKAN10" className="flex-1 text-xs" />
                <Button size="sm" variant="outline" onClick={applyCoupon}>تطبيق</Button>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-bold text-[var(--fg)] mb-4">ملخص الطلب</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--fg-muted)]">المجموع الفرعي</span>
                  <span className="font-medium text-[var(--fg)]">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>خصم الكوبون</span>
                    <span>- {formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[var(--fg-muted)]">الشحن</span>
                  <span className="font-medium text-[var(--fg)]">{formatCurrency(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-black">
                  <span className="text-[var(--fg)]">الإجمالي</span>
                  <span className="text-[#059669]">{formatCurrency(total)}</span>
                </div>
              </div>
              <Link to={ROUTES.STORE_CHECKOUT} className="block mt-5">
                <Button className="w-full h-11 text-base gap-2">المتابعة للدفع <ArrowLeft size={16} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
