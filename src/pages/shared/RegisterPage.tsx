import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../lib/routes';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Check, User, Store, Mail, Lock, Eye, EyeOff, AtSign } from 'lucide-react';

const schema = z.object({
  name:     z.string().min(3, 'الاسم 3 أحرف على الأقل'),
  username: z.string().min(3, 'اسم المستخدم 3 أحرف على الأقل'),
  store:    z.string().min(3, 'اسم المتجر 3 أحرف على الأقل'),
  email:    z.string().email('بريد إلكتروني غير صحيح'),
  password: z.string().min(8, '8 أحرف على الأقل'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, { message: 'كلمتا المرور غير متطابقتين', path: ['confirm'] });
type Form = z.infer<typeof schema>;

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [lang] = useState<'ar' | 'en'>('ar');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    const mappedEmail = `${data.username.trim()}@matjarna.com`;
    await login(mappedEmail, data.password, 'merchant_owner');
    toast.success('تم إنشاء متجرك بنجاح! 🎉');
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white" dir="rtl">
      
      {/* خلفية صورة حقيقية ثابتة فاتحة وراقية بدون أي وميض */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Light E-Commerce Background" 
          className="w-full h-full object-cover filter brightness-95 contrast-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-white/80 to-slate-100/90 backdrop-blur-[2px]" />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 py-12 relative z-10">
        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#059669]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-xl mt-6">
          <div className="text-center mb-8">
            {/* اسم المنصة في المنتصف فوق جملة انضم إلى نخبة التجار وبدون أي علامات */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#059669]/30">م</div>
              <span className="font-black text-2xl text-slate-800 tracking-tight">متجرنا</span>
            </div>

            <div className="inline-flex items-center px-4.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-black mb-4 backdrop-blur-xl shadow-sm">
              <span>انضم إلى نخبة التجار</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2 drop-shadow-sm">
              ابدأ رحلتك مع متجرنا
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              أنشئ متجرك الإلكتروني الاحترافي مجاناً في دقيقتين
            </p>
          </div>

          {/* بطاقة بتصميم عصري فاتح وناعم */}
          <div className="bg-white/80 border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* حقل الاسم الكامل */}
                <div className="space-y-1.5 text-right">
                  <Label className="text-xs font-bold text-slate-700 tracking-wider">الاسم الكامل</Label>
                  <div className="relative group">
                    <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                    <input 
                      {...register('name')} 
                      type="text" 
                      autoComplete="off"
                      className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-10 pl-3 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.name.message}</p>}
                </div>

                {/* حقل اسم المستخدم */}
                <div className="space-y-1.5 text-right">
                  <Label className="text-xs font-bold text-slate-700 tracking-wider">اسم المستخدم</Label>
                  <div className="relative group">
                    <AtSign size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                    <input 
                      {...register('username')} 
                      type="text" 
                      autoComplete="off"
                      dir="ltr"
                      className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-10 pl-3 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                    />
                  </div>
                  {errors.username && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.username.message}</p>}
                </div>
              </div>

              {/* حقل اسم المتجر */}
              <div className="space-y-1.5 text-right">
                <Label className="text-xs font-bold text-slate-700 tracking-wider">اسم المتجر</Label>
                <div className="relative group">
                  <Store size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                  <input 
                    {...register('store')} 
                    type="text" 
                    autoComplete="off"
                    className="flex h-13 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-12 pl-4 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                  />
                </div>
                {errors.store && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.store.message}</p>}
              </div>

              {/* حقل البريد الإلكتروني */}
              <div className="space-y-1.5 text-right">
                <Label className="text-xs font-bold text-slate-700 tracking-wider">البريد الإلكتروني</Label>
                <div className="relative group">
                  <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                  <input 
                    {...register('email')} 
                    type="email" 
                    autoComplete="off"
                    dir="ltr"
                    className="flex h-13 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-12 pl-4 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* حقل كلمة المرور */}
                <div className="space-y-1.5 text-right">
                  <Label className="text-xs font-bold text-slate-700 tracking-wider">كلمة المرور</Label>
                  <div className="relative group">
                    <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                    <input 
                      {...register('password')} 
                      type={showPass ? 'text' : 'password'} 
                      autoComplete="new-password"
                      dir="ltr"
                      className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-10 pl-10 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.password.message}</p>}
                </div>

                {/* حقل تأكيد كلمة المرور */}
                <div className="space-y-1.5 text-right">
                  <Label className="text-xs font-bold text-slate-700 tracking-wider">تأكيد كلمة المرور</Label>
                  <div className="relative group">
                    <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                    <input 
                      {...register('confirm')} 
                      type={showConfirmPass ? 'text' : 'password'} 
                      autoComplete="new-password"
                      dir="ltr"
                      className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-10 pl-10 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all" 
                    />
                    <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                      {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirm && <p className="text-[11px] text-red-500 font-bold pr-1">{errors.confirm.message}</p>}
                </div>
              </div>

              <Button 
                type="submit" 
                loading={isSubmitting} 
                className="w-full h-14 text-base font-bold mt-4 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#059669]/20 rounded-2xl bg-gradient-to-r from-[#059669] via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center gap-2 group"
              >
                <span>إنشاء الحساب الان</span>
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                '14 يوم تجريبي مجاني',
                'لا حاجة لبطاقة ائتمان',
                'إلغاء في أي وقت'
              ].map(f => (
                <div key={f} className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600 font-medium">
                  <Check size={14} className="text-[#059669] flex-shrink-0" /> 
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-600 mt-6 font-medium">
            لديك حساب بالفعل؟{' '}
            <Link to={ROUTES.LOGIN} className="text-[#059669] font-black hover:underline transition-colors">
              سجّل دخولك
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}