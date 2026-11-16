import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, KeyRound, CheckCircle2, WalletCards } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('يرجى إدخال البريد الإلكتروني');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('تم إرسال رابط إعادة التعيين بنجاح');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white" dir="rtl">
      
      {/* خلفية صورة حقيقية فاتحة وراقية مريحة للعين وبدون وميض */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Light Background" 
          className="w-full h-full object-cover filter brightness-95 contrast-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-white/80 to-slate-100/90 backdrop-blur-[2px]" />
      </div>

      {/* قسم الفورم الرئيسي */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-12 relative z-10">
        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#059669]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md mt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-black mb-5 backdrop-blur-xl shadow-sm">
              <WalletCards size={16} />
              <span>المعاملات المالية والمدفوعات</span>
            </div>
            
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#059669] to-emerald-400 text-white font-black text-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#059669]/20 transform hover:scale-105 transition-transform">
              <KeyRound size={30} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              لا تقلق! أدخل بريدك الإلكتروني المسجل وسنرسل لك فوراً رابطاً آمناً لإعادة تعيين كلمة المرور.
            </p>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            {sent ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <CheckCircle2 size={40} className="text-[#059669] animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">تم إرسال الرابط بنجاح!</h3>
                <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
                  يرجى التحقق من صندوق البريد الوارد أو الرسائل غير المرغوب فيها واتبع التعليمات.
                </p>
                <Button 
                  onClick={() => setSent(false)} 
                  variant="outline" 
                  className="w-full h-12 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition-all"
                >
                  إرسال إلى بريد آخر
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5 text-right">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 tracking-wider">البريد الإلكتروني</Label>
                  <div className="relative group">
                    <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#059669] transition-colors" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      autoComplete="off"
                      dir="ltr"
                      className="flex h-13 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-12 pl-4 text-right text-sm font-medium text-slate-800 focus:outline-none focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20 transition-all shadow-sm" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  loading={loading} 
                  className="w-full h-14 text-base font-bold mt-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#059669]/20 rounded-2xl bg-gradient-to-r from-[#059669] via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center gap-2 group"
                >
                  <span>إرسال رابط الاستعادة</span>
                  <ArrowRight size={18} className="transform group-hover:-translate-x-1.5 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          <div className="text-center mt-8">
            <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-[#059669] font-black hover:underline transition-all group">
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              <span>العودة إلى تسجيل الدخول</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}