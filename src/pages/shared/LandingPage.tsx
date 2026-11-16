import { Link } from 'react-router-dom';
import { ArrowLeft, Package, ShoppingCart, BarChart3, Globe, Star, Check, ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ROUTES } from '../../lib/routes';
import { PLANS } from '../../lib/constants';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const features = [
  { icon: Package, title: 'إدارة المنتجات', desc: 'أضف وعدّل منتجاتك بسهولة مع دعم المتغيرات والصور المتعددة والمخزون التلقائي.', color: 'bg-blue-50 text-blue-600' },
  { icon: ShoppingCart, title: 'معالجة الطلبات', desc: 'تتبع كل طلب من اللحظة الأولى حتى التسليم مع إشعارات فورية للعملاء.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: BarChart3, title: 'تقارير وتحليلات', desc: 'احصل على رؤى عميقة حول مبيعاتك وعملائك وأفضل منتجاتك أداءً.', color: 'bg-purple-50 text-purple-600' },
  { icon: Globe, title: 'متجر احترافي', desc: 'ثيمات جاهزة متجاوبة مع الجوال وسريعة التحميل تُبهر عملاءك في أول نظرة.', color: 'bg-amber-50 text-amber-600' },
];

const testimonials = [
  { name: 'نورة العتيبي',  store: 'متجر الأناقة',   text: 'دكان غير طريقة إدارة متجري بالكامل. الآن أتابع كل شيء من مكان واحد!', rating: 5, avatar: 'ن' },
  { name: 'محمد الدوسري', store: 'عالم التقنية',    text: 'واجهة سهلة الاستخدام والتقارير مفيدة جداً لاتخاذ قرارات أفضل.', rating: 5, avatar: 'م' },
  { name: 'فهد الزهراني', store: 'دكان الرياضة',    text: 'أفضل منصة عربية لإدارة المتاجر. الدعم الفني رائع ومتجاوب.', rating: 5, avatar: 'ف' },
];

export default function LandingPage() {
  const [yearly, setYearly] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)]" dir="rtl">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-[var(--bg-card)]/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white font-black text-lg">د</div>
            <span className="font-black text-lg text-[var(--fg)]">دكان</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--fg-muted)]">
            {['المزايا','الأسعار','الشهادات'].map(l => <a key={l} href={`#${l}`} className="hover:text-[var(--fg)] transition-colors">{l}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link to={ROUTES.LOGIN}><Button variant="outline" size="sm">دخول</Button></Link>
            <Link to={ROUTES.REGISTER}><Button size="sm">ابدأ مجاناً</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-[#ECFDF5] text-[#059669] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          🚀 منصة التجارة الإلكترونية رقم 1 في السعودية
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-[var(--fg)] leading-tight mb-6">
          ابنِ متجرك الإلكتروني<br />
          <span className="text-[#059669]">وحقق نجاحك</span>
        </h1>
        <p className="text-xl text-[var(--fg-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          منصة متكاملة لإنشاء وإدارة متجرك الإلكتروني من المنتجات حتى التوصيل — بدون خبرة تقنية
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to={ROUTES.REGISTER}><Button size="lg" className="gap-2">ابدأ تجربتك المجانية <ArrowLeft size={16} /></Button></Link>
          <Link to={ROUTES.STORE}><Button variant="outline" size="lg">معاينة متجر تجريبي</Button></Link>
        </div>
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-[var(--fg-muted)]">
          {['لا حاجة لبطاقة ائتمان','14 يوم مجانياً','إلغاء في أي وقت'].map(t => (
            <div key={t} className="flex items-center gap-1.5"><Check size={13} className="text-[#059669]" />{t}</div>
          ))}
        </div>
      </section>

      {/* Feature image */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)]">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt="لقطة لوحة التحكم" className="w-full" />
        </div>
      </div>

      {/* Features */}
      <section id="المزايا" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[var(--fg)] mb-3">كل ما تحتاجه في مكان واحد</h2>
          <p className="text-[var(--fg-muted)] max-w-xl mx-auto">أدوات قوية تساعدك على بناء وتنمية متجرك الإلكتروني</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}><Icon size={22} /></div>
                <h3 className="font-bold text-[var(--fg)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="الأسعار" className="bg-gray-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[var(--fg)] mb-3">أسعار شفافة بدون مفاجآت</h2>
            <div className="inline-flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-1 mt-4">
              {['شهري','سنوي'].map((t, i) => (
                <button key={t} onClick={() => setYearly(i === 1)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${(i === 1) === yearly ? 'bg-[#059669] text-white' : 'text-[var(--fg-muted)]'}`}>
                  {t} {i === 1 && <span className="text-[10px] opacity-80">وفّر 20%</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className={`bg-[var(--bg-card)] rounded-2xl border-2 overflow-hidden ${i === 1 ? 'border-[#059669] shadow-xl shadow-emerald-100 dark:shadow-emerald-900/20' : 'border-[var(--border)]'}`}>
                {i === 1 && <div className="bg-[#059669] text-white text-xs font-bold text-center py-1.5">الأكثر شيوعاً ⭐</div>}
                <div className="p-7">
                  <h3 className="text-xl font-black text-[var(--fg)]">{plan.name}</h3>
                  <div className="flex items-end gap-1 my-4">
                    <span className="text-4xl font-black text-[var(--fg)]">{yearly ? plan.price - 20 : plan.price}</span>
                    <span className="text-[var(--fg-muted)] mb-1.5">ر.س/شهر</span>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {[`${plan.products === -1 ? 'غير محدود' : plan.products} منتج`, `${plan.storage} تخزين`, `${plan.apps === -1 ? 'تطبيقات غير محدودة' : plan.apps > 0 ? `${plan.apps} تطبيقات` : 'تطبيقات أساسية'}`].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--fg)]"><Check size={14} className="text-[#059669]" />{f}</li>
                    ))}
                  </ul>
                  <Link to={ROUTES.REGISTER}>
                    <Button variant={i === 1 ? 'default' : 'outline'} className="w-full">ابدأ الآن</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="الشهادات" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[var(--fg)] mb-3">ماذا يقول عملاؤنا</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {Array.from({length:5},(_,i)=><Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-[var(--fg)] leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#059669] text-white font-bold text-sm flex items-center justify-center">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-[var(--fg)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--fg-muted)]">{t.store}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12 pb-20">
        <div className="bg-[#059669] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 80% 50%,white 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <h2 className="text-3xl font-black mb-3 relative z-10">ابدأ رحلتك اليوم مجاناً</h2>
          <p className="text-white/70 mb-8 relative z-10">انضم لآلاف التجار الذين يثقون بدكان لبناء متاجرهم</p>
          <Link to={ROUTES.REGISTER} className="relative z-10">
            <Button size="lg" className="bg-white text-[#059669] hover:bg-gray-50 gap-2">ابدأ تجربتك المجانية <ArrowLeft size={16} /></Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--fg-muted)]">
        © 2026 <span className="font-bold text-[#059669]">دكان</span> — منصة التجارة الإلكترونية العربية
      </footer>
    </div>
  );
}
