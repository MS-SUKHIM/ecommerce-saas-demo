import { useState } from 'react';
import { Check, CreditCard, Download } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { PLANS } from '../../lib/constants';
import { billingHistory } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { toast } from 'sonner';

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);
  const current = PLANS[1];

  return (
    <DashboardLayout>
      <PageHeader title="الاشتراك والفوترة" description="إدارة خطتك ومدفوعاتك" />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Current plan */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle>خطتك الحالية</CardTitle>
            <Badge variant="green">نشطة</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <span className="text-2xl font-black text-[#059669]">م</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[var(--fg)]">خطة {current.name}</h3>
                <p className="text-[var(--fg-muted)] text-sm">تتجدد في 15 أكتوبر 2026</p>
              </div>
              <div className="mr-auto text-left">
                <span className="text-3xl font-black text-[var(--fg)]">{current.price}</span>
                <span className="text-[var(--fg-muted)] text-sm">ر.س/شهر</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'المنتجات', used: 64, total: current.products },
                { label: 'التخزين', used: 40, total: 100 },
                { label: 'التطبيقات', used: 3, total: current.apps },
              ].map(r => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--fg-muted)]">{r.label}</span>
                    <span className="font-medium text-[var(--fg)]">{r.used}/{r.total === -1 ? '∞' : r.total}</span>
                  </div>
                  <Progress value={r.total === -1 ? 30 : (r.used / r.total) * 100} />
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="gap-2" onClick={() => toast.info('سيتم فتح صفحة ترقية الخطة')}>
                ترقية الخطة
              </Button>
              <Button variant="outline" onClick={() => toast.info('سيتم فتح نافذة الإلغاء')}>إلغاء الاشتراك</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card>
          <CardHeader><CardTitle>طريقة الدفع</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 border border-[#059669] bg-emerald-50/50 rounded-xl">
              <CreditCard size={20} className="text-[#059669]" />
              <div>
                <p className="font-semibold text-[var(--fg)] text-sm">Visa •••• 4242</p>
                <p className="text-xs text-[var(--fg-muted)]">تنتهي 12/2028</p>
              </div>
              <Badge variant="green" className="mr-auto text-[10px]">افتراضية</Badge>
            </div>
            <Button variant="outline" className="w-full" onClick={() => toast.info('سيتم فتح نافذة تحديث البطاقة')}>
              تحديث البطاقة
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Plans */}
      <Card className="mb-6">
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle>الخطط المتاحة</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <span className={!yearly ? 'font-bold text-[var(--fg)]' : 'text-[var(--fg-muted)]'}>شهري</span>
            <button onClick={() => setYearly(!yearly)} className={`w-10 h-5 rounded-full relative transition-colors ${yearly ? 'bg-[#059669]' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${yearly ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className={yearly ? 'font-bold text-[var(--fg)]' : 'text-[var(--fg-muted)]'}>سنوي <span className="text-[10px] text-emerald-600 font-bold">وفّر 20%</span></span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className={`rounded-2xl border-2 p-5 ${plan.id === current.id ? 'border-[#059669] bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-[var(--border)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[var(--fg)]">{plan.name}</h4>
                  {plan.id === current.id && <Badge variant="green">حالي</Badge>}
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-black text-[var(--fg)]">{yearly ? plan.price - 20 : plan.price}</span>
                  <span className="text-[var(--fg-muted)] text-sm mb-1">ر.س/شهر</span>
                </div>
                <ul className="space-y-1.5 mb-4 text-xs text-[var(--fg-muted)]">
                  {[`${plan.products === -1 ? 'غير محدود' : plan.products} منتج`, plan.storage + ' تخزين'].map(f => (
                    <li key={f} className="flex items-center gap-1.5"><Check size={11} className="text-[#059669]" />{f}</li>
                  ))}
                </ul>
                <Button size="sm" variant={plan.id === current.id ? 'secondary' : i > 1 ? 'default' : 'outline'} className="w-full" disabled={plan.id === current.id}
                  onClick={() => toast.success(`تم الانتقال إلى خطة ${plan.name}`)}>
                  {plan.id === current.id ? 'خطتك الحالية' : i > 1 ? 'ترقية' : 'تغيير'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing history */}
      <Card>
        <CardHeader><CardTitle>سجل الفواتير</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--border)]">
            {billingHistory.map((b, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--fg)]">خطة {b.plan}</p>
                  <p className="text-xs text-[var(--fg-muted)]">{formatDate(b.date)}</p>
                </div>
                <Badge variant={b.status === 'paid' ? 'green' : 'yellow'}>{b.status === 'paid' ? 'مدفوعة' : 'معلقة'}</Badge>
                <span className="font-bold text-[var(--fg)]">{formatCurrency(b.amount)}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info('سيتم تنزيل الفاتورة')}>
                  <Download size={14} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
