import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight, Moon, Sun, Globe, ShieldCheck, Zap, Headphones, BarChart3, TrendingUp, Star, Award, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../lib/routes';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

const schema = z.object({
  username: z.string().min(3, 'اسم المستخدم قصير جداً'),
  password: z.string().min(6, 'كلمة المرور 6 أحرف على الأقل'),
});
type Form = z.infer<typeof schema>;

const slides = [
  {
    icon: Zap,
    titleAr: "إدارة متجرك باحترافية وسرعة",
    titleEn: "Manage Your Store with Speed & Professionalism",
    descAr: "أضف، عدل، وتابع مخزون متجرك الإلكتروني بلحظات وبدون أي تعقيد.",
    descEn: "Add, edit, and track your online store inventory in seconds with zero friction.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    stat: "+5,000 متجر نشط"
  },
  {
    icon: ShieldCheck,
    titleAr: "معاملات رقمية آمنة وموثوقة",
    titleEn: "Secure & Reliable Digital Transactions",
    descAr: "معاملات تجارية مشفرة بالكامل وحماية قصوى لبياناتك وعملائك.",
    descEn: "Fully encrypted commercial transactions and maximum protection for your data.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    stat: "98% نسبة الرضا"
  },
  {
    icon: BarChart3,
    titleAr: "تحليلات وأرباح فورية ومباشرة",
    titleEn: "Instant Reports & Direct Profits",
    descAr: "راقب نمو مبيعاتك وأرباحك الشهرية بدقة وموثوقية عالية.",
    descEn: "Monitor your sales growth and monthly profits with high accuracy.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    stat: "+2M طلب شهرياً"
  },
  {
    icon: Headphones,
    titleAr: "دعم فني متاح على مدار الساعة",
    titleEn: "Dedicated Merchant Support 24/7",
    descAr: "فريق مختص لمساعدتك في كل خطوة لضمان نمو متجرك وراحة بالك.",
    descEn: "A specialized team to assist you every step of the way to ensure your store's growth.",
    image: "https://images.unsplash.com/photo-1556742049-0a67d553c2a5?q=80&w=1200&auto=format&fit=crop",
    stat: "خدمة متواصلة 24/7"
  }
];

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { login, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ 
    resolver: zodResolver(schema) 
  });

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const onSubmit = async (data: Form) => {
    try {
      const mappedEmail = `${data.username.trim()}@matjarna.com`;
      await login(mappedEmail, data.password);
      toast.success(lang === 'ar' ? 'مرحباً بعودتك إلى متجرنا!' : 'Welcome back to our store!');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error(lang === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid login credentials');
    }
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <div className={`min-h-screen flex bg-[var(--bg)] overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* الشق الأيمن: نموذج تسجيل الدخول وشعار المنصة في الأعلى */}
      <div className="flex-1 lg:max-w-xl flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 order-2 lg:order-1 text-right relative bg-[var(--card-bg)] shadow-[0_0_80px_rgba(0,0,0,0.15)] z-10 backdrop-blur-3xl border-l border-white/10">
        
        {/* اسم المنصة وأزرار التبديل متناسقة في أعلى الشق الأيمن */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 group cursor-pointer bg-[var(--bg)] px-4 py-2 rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-emerald-400 flex items-center justify-center font-black text-lg text-white shadow-md shadow-[#059669]/30">م</div>
            <span className="font-black text-xl text-[var(--fg)] tracking-tight">{lang === 'ar' ? 'متجرنا' : 'Matjarna'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={toggleTheme}
              className="h-10 px-3.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--card-bg)] border border-[var(--border)] text-[var(--fg)] text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-emerald-600" />}
              <span>{theme === 'dark' ? (lang === 'ar' ? 'فاتح' : 'Light') : (lang === 'ar' ? 'داكن' : 'Dark')}</span>
            </button>

            <button 
              type="button"
              onClick={toggleLanguage}
              className="h-10 px-3.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--card-bg)] border border-[var(--border)] text-[var(--fg)] text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Globe size={14} className="text-[#059669]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
            {lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back'}
          </h1>
          <p className="text-[var(--fg-muted)] text-sm font-medium leading-relaxed">
            {lang === 'ar' ? 'سجّل دخولك لإدارة متجرك، متابعة طلبياتك، ومضاعفة أرباحك بكل سهولة' : 'Log in to manage your store, track orders, and boost your revenue effortlessly.'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-[var(--fg)] tracking-wider">{lang === 'ar' ? 'اسم المستخدم' : 'Username'}</Label>
            <div className="relative group">
              <User size={18} className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[var(--fg-muted)] group-focus-within:text-[#059669] transition-colors`} />
              <input 
                {...register('username')} 
                type="text" 
                autoComplete="off"
                dir="ltr"
                className={`flex h-13 w-full rounded-2xl border border-[var(--border)] bg-[var(--input-bg)] ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-sm font-semibold text-[var(--fg)] focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 transition-all shadow-sm`} 
              />
            </div>
            {errors.username && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.username.message}</p>}
          </div>

          <div className="space-y-1.5 text-right">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-[var(--fg)] tracking-wider">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</Label>
              <Link to={ROUTES.FORGOT} className="text-xs text-[#059669] font-bold hover:underline transition-colors">
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </Link>
            </div>
            <div className="relative group">
              <Lock size={18} className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[var(--fg-muted)] group-focus-within:text-[#059669] transition-colors`} />
              <input 
                {...register('password')} 
                type={showPass ? 'text' : 'password'} 
                autoComplete="new-password"
                dir="ltr"
                className={`flex h-13 w-full rounded-2xl border border-[var(--border)] bg-[var(--input-bg)] ${lang === 'ar' ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} text-sm font-semibold text-[var(--fg)] focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 transition-all shadow-sm`} 
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors`}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" loading={isLoading} className="w-full h-13 text-base font-bold mt-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#059669]/30 rounded-2xl bg-gradient-to-r from-[#059669] via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center gap-2 group">
            <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            <ArrowRight size={18} className={`transform ${lang === 'ar' ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'} transition-transform`} />
          </Button>

        </form>

        <p className="text-center text-sm text-[var(--fg-muted)] mt-6 font-medium">
          {lang === 'ar' ? 'ليس لديك متجر بعد؟ ' : "Don't have a store yet? "}
          <Link to={ROUTES.REGISTER} className="text-[#059669] font-black hover:underline transition-colors">
            {lang === 'ar' ? 'أنشئ متجرك مجاناً' : 'Create your store for free'}
          </Link>
        </p>
      </div>

      {/* الشق الأيسر: إضافات إبداعية، شارة التقييم المباشر، والبطاقة التفاعلية المتحركة */}
      <div 
        className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-100 order-1 lg:order-2 items-center justify-center p-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" alt="Light Background" className="w-full h-full object-cover filter brightness-95 contrast-105" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(5,150,105,0.3),transparent_65%)]" />

        <div className="relative z-10 flex flex-col justify-between w-full h-full max-w-xl text-right">
          
          {/* الإضافة الإبداعية الأولى في الأعلى: شارة موثقة وشارة تقييم التاجر */}
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg text-white text-xs font-bold">
              <Award size={16} className="text-amber-400" />
              <span>{lang === 'ar' ? 'منصة التجارة الإلكترونية الأولى موثوقة رسمياً' : 'Official Certified E-Commerce Platform'}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3.5 py-2 rounded-2xl border border-emerald-500/30 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 (أعلى تقييم)</span>
            </div>
          </div>
          
          {/* البطاقة التفاعلية المتحركة مع شريط التقدم */}
          <div className="space-y-6 my-auto py-10">
            <div className="relative h-[330px] overflow-hidden rounded-3xl shadow-2xl">
              {slides.map((slide, index) => {
                const IconComponent = slide.icon;
                const isActive = index === currentSlide;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-between p-8 rounded-3xl bg-black/50 border border-white/20 backdrop-blur-2xl shadow-2xl transform ${
                      isActive ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 translate-y-4 pointer-events-none scale-95'
                    }`}
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-20">
                      <img src={slide.image} alt="Slide background" className="w-full h-full object-cover transform scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600/40 to-emerald-400/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                        <IconComponent size={28} />
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                        <TrendingUp size={14} />
                        {slide.stat}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <h2 className="text-2xl lg:text-3xl font-black leading-tight text-white tracking-tight">
                        {lang === 'ar' ? slide.titleAr : slide.titleEn}
                      </h2>
                      <p className="text-slate-200 text-sm lg:text-base font-medium leading-relaxed">
                        {lang === 'ar' ? slide.descAr : slide.descEn}
                      </p>
                    </div>

                    {/* أشرطة التقدم المتحركة */}
                    <div className="relative z-10 pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        {slides.map((_, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setCurrentSlide(idx)}
                            className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer group"
                          >
                            <div 
                              className={`h-full bg-emerald-400 transition-all duration-500 ${
                                idx === index 
                                  ? (isPaused ? 'w-full' : 'w-full animate-[pulse_1s_infinite]') 
                                  : idx < index ? 'w-full opacity-60' : 'w-0'
                              }`}
                              style={{
                                animationDuration: isActive && !isPaused ? '5s' : '0s'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs font-black text-emerald-400">
                        <span>{lang === 'ar' ? `شريحة 0${index + 1}` : `Slide 0${index + 1}`}</span>
                        <span>{`0${index + 1} / 0${slides.length}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* الإضافة الابداعية الثانية في الأسفل: مميزات إضافية سريعة */}
          <div className="flex items-center justify-between text-slate-300 text-xs pt-4 border-t border-white/10 font-medium px-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>{lang === 'ar' ? 'تشفير بيانات SSL 256' : 'SSL 256 Encryption'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>{lang === 'ar' ? 'نسخ احتياطي سحابي' : 'Cloud Backup'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>{lang === 'ar' ? 'تحديثات مجانية مستمرة' : 'Free Updates'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}