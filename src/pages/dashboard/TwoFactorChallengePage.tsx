import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, ArrowRight, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

export default function TwoFactorChallengePage() {
  const [code, setCode] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('يرجى إدخال الرمز المطلوب');
      return;
    }

    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      toast.success('تم التحقق بنجاح، جاري توجيهك...');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('الرمز غير صحيح، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white" dir="rtl">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="2FA Challenge Background" 
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

          <div className="bg-white/80 border border-slate-200/85 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-[#059669] shadow-inner">
              <ShieldAlert size={32} />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-2">
              {recoveryMode ? 'رمز الاسترداد الاحتياطي' : 'المصادقة الثنائية'}
            </h1>
            
            <p className="text-slate-600 text-xs text-center font-medium leading-relaxed mb-8">
              {recoveryMode 
                ? 'يرجى إدخال أحد أكواد الاسترداد الاحتياطية الخاصة بك لتسجيل الدخول.' 
                : 'يرجى إدخال رمز التحقق المكون من 6 أرقام الظاهر في تطبيق المصادقة الخاص بك.'}
            </p>

            <form onSubmit={handleVerify} className="space-y-5">
              <div className="space-y-1.5">
                <div className="relative">
                  <Input 
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={recoveryMode ? "1234-5678" : "000000"}
                    maxLength={recoveryMode ? 20 : 6}
                    className="h-14 text-center text-xl font-mono tracking-widest rounded-2xl border-slate-200 bg-white/50 focus:border-[#059669] focus:ring-[#059669]/20"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    {recoveryMode ? <KeyRound size={20} /> : <Lock size={20} />}
                  </div>
                </div>
              </div>

              <Button 
                type="submit"
                loading={loading}
                className="w-full h-14 text-base font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#059669]/20 rounded-2xl bg-gradient-to-r from-[#059669] via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center gap-2"
              >
                <span>تأكيد وتسجيل الدخول</span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button 
                type="button"
                onClick={() => { setRecoveryMode(!recoveryMode); setCode(''); }}
                className="text-xs font-bold text-[#059669] hover:underline"
              >
                {recoveryMode ? 'العودة لتطبيق المصادقة (رمز 6 أرقام)' : 'فقدت هاتفك؟ استخدم كود الاسترداد'}
              </button>
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