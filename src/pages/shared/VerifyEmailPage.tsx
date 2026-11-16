import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailCheck, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setResending(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      toast.success('تم إرسال رابط التحقق بنجاح إلى بريدك الإلكتروني!');
    } catch {
      toast.error('حدث خطأ أثناء إعادة الإرسال، يجدر المحاولة لاحقاً.');
    } finally {
      setResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      toast.success('تم تفعيل البريد الإلكتروني بنجاح! 🎉');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('لم يتم تفعيل البريد بعد، يجدر النقر على الرابط في رسالة البريد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white" dir="rtl">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Verify Email Background" 
          className="w-full h-full object-cover filter brightness-95 contrast-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-white/80 to-slate-100/90 backdrop-blur-[2px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 py-12 relative z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#059669]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#059669]/30">م</div>
            <span className="font-black text-2xl text-slate-800 tracking-tight">متجرنا</span>
          </div>

          <div className="bg-white/80 border border-slate-200/85 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-[#059669] shadow-inner">
              <MailCheck size={40} className="animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
              تحقق من بريدك الإلكتروني
            </h1>
            
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8">
              لقد أرسلنا رابط تحقق إلى بريدك الإلكتروني المسجل. يرجى النقر على الرابط الموجود في الرسالة لتفعيل حسابك والبدء في إدارة متجرك.
            </p>

            <div className="space-y-3">
              <Button 
                onClick={handleCheckVerification}
                loading={loading}
                className="w-full h-14 text-base font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#059669]/20 rounded-2xl bg-gradient-to-r from-[#059669] via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                <span>تحقق من حالة التفعيل</span>
              </Button>

              <Button 
                onClick={handleResend}
                loading={resending}
                variant="outline"
                className="w-full h-14 text-sm font-bold border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <Send size={16} className="text-[#059669]" />
                <span>إعادة إرسال رابط التحقق</span>
              </Button>
            </div>
          </div>

          <div className="text-center mt-6">
            <button 
              onClick={() => navigate(ROUTES.LOGIN)} 
              className="inline-flex items-center gap-2 text-sm text-slate-600 font-semibold hover:text-[#059669] transition-colors"
            >
              <ArrowRight size={16} />
              <span>العودة لتسجيل الدخول</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}