import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const STEPS = [
  { id: 'address', label: 'العنوان',   icon: MapPin },
  { id: 'payment', label: 'الدفع',     icon: CreditCard },
  { id: 'confirm', label: 'التأكيد',   icon: CheckCircle },
];

const addressSchema = z.object({
  name:    z.string().min(2),
  phone:   z.string().min(10),
  city:    z.string().min(2),
  area:    z.string().min(2),
  street:  z.string().min(3),
  zip:     z.string().optional(),
});

export default function StoreCheckoutPage() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [orderNo] = useState(`ORD-${Math.floor(Math.random() * 90000 + 10000)}`);
  const { items, clear } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const total = subtotal + 25;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(addressSchema) });

  const placeOrder = async () => {
    await new Promise(r => setTimeout(r, 1000));
    clear();
    setPlaced(true);
  };

  if (placed) return (
    <StorefrontLayout>
      <div className="max-w-lg mx-auto px-4 py-24 text-center" dir="rtl">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={40} className="text-[#059669]" />
        </div>
        <h2 className="text-2xl font-black text-[var(--fg)] mb-2">تم تأكيد طلبك!</h2>
        <p className="text-[var(--fg-muted)] mb-2">رقم الطلب: <span className="font-mono font-bold text-[var(--fg)]">{orderNo}</span></p>
        <p className="text-sm text-[var(--fg-muted)] mb-8">سنرسل تأكيداً على بريدك الإلكتروني قريباً</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate(ROUTES.STORE_TRACK)}>تتبع الطلب</Button>
          <Button variant="outline" onClick={() => navigate(ROUTES.STORE)}>العودة للمتجر</Button>
        </div>
      </div>
    </StorefrontLayout>
  );

  return (
    <StorefrontLayout>
      <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-2xl font-black text-[var(--fg)] mb-6">إتمام الطلب</h1>

        {/* Steps indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn('w-9 h-9 rounded-full flex items-center justify-center transition-colors', step > i ? 'bg-[#059669] text-white' : step === i ? 'bg-[#059669] text-white' : 'bg-gray-100 text-gray-400')}>
                    <Icon size={16} />
                  </div>
                  <span className={cn('text-xs font-medium', step >= i ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]')}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={cn('h-0.5 flex-1 mx-2 rounded-full mb-5 transition-colors', step > i ? 'bg-[#059669]' : 'bg-[var(--border)]')} />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <form onSubmit={handleSubmit(() => setStep(1))} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-[var(--fg)] text-lg mb-2">عنوان التسليم</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>الاسم الكامل</Label>
                    <Input {...register('name')} placeholder="اسمك" error={errors.name?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>رقم الجوال</Label>
                    <Input {...register('phone')} type="tel" placeholder="05XXXXXXXX" error={errors.phone?.message} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>المدينة</Label>
                    <Select onValueChange={v => setValue('city', v)}>
                      <SelectTrigger><SelectValue placeholder="اختر المدينة" /></SelectTrigger>
                      <SelectContent>
                        {['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','أبها','تبوك'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>الحي</Label>
                    <Input {...register('area')} placeholder="اسم الحي" error={errors.area?.message} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>الشارع والرقم</Label>
                  <Input {...register('street')} placeholder="اسم الشارع، رقم المبنى" error={errors.street?.message} />
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" className="gap-2">التالي: الدفع <ChevronLeft size={16} /></Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-[var(--fg)] text-lg mb-2">طريقة الدفع</h3>
                {[
                  { id: 'card',   label: 'بطاقة ائتمانية / مدى', icon: '💳' },
                  { id: 'apple',  label: 'Apple Pay',              icon: '' },
                  { id: 'cod',    label: 'الدفع عند الاستلام',    icon: '💵' },
                ].map(m => (
                  <label key={m.id} className="flex items-center gap-3 p-4 border-2 border-[var(--border)] rounded-xl cursor-pointer hover:border-[#059669] transition-colors has-[:checked]:border-[#059669] has-[:checked]:bg-emerald-50/30">
                    <input type="radio" name="payment" defaultChecked={m.id === 'card'} className="accent-[#059669]" />
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-medium text-[var(--fg)]">{m.label}</span>
                  </label>
                ))}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800/30 rounded-xl space-y-3">
                  <div className="space-y-1.5">
                    <Label>رقم البطاقة</Label>
                    <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>تاريخ الانتهاء</Label><Input placeholder="MM/YY" /></div>
                    <div className="space-y-1.5"><Label>CVV</Label><Input placeholder="123" type="password" maxLength={3} /></div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between pt-2">
                  <Button variant="outline" className="gap-2" onClick={() => setStep(0)}><ChevronRight size={16} />السابق</Button>
                  <Button className="gap-2" onClick={() => setStep(2)}>التالي: التأكيد <ChevronLeft size={16} /></Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-5">
                <h3 className="font-bold text-[var(--fg)] text-lg">مراجعة الطلب</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--fg)] truncate">{item.name}</p>
                        <p className="text-xs text-[var(--fg-muted)]">الكمية: {item.qty}</p>
                      </div>
                      <span className="font-bold text-[var(--fg)] text-sm">{formatCurrency(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-black text-lg">
                  <span>الإجمالي</span>
                  <span className="text-[#059669]">{formatCurrency(total)}</span>
                </div>
                <div className="flex gap-3 justify-between">
                  <Button variant="outline" className="gap-2" onClick={() => setStep(1)}><ChevronRight size={16} />السابق</Button>
                  <Button className="gap-2 flex-1" onClick={placeOrder}>تأكيد الطلب ✓</Button>
                </div>
              </div>
            )}
          </div>

          {/* Cart summary */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 h-fit">
            <h3 className="font-bold text-[var(--fg)] mb-4 flex items-center gap-2"><ShoppingBag size={16} />ملخص الطلب</h3>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[var(--fg-muted)] truncate flex-1">{item.name} ×{item.qty}</span>
                  <span className="font-medium text-[var(--fg)] mr-2">{formatCurrency(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2 mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--fg-muted)]">المجموع</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-muted)]">الشحن</span>
                <span>{formatCurrency(25)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-black text-base">
                <span className="text-[var(--fg)]">الإجمالي</span>
                <span className="text-[#059669]">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
