import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !passwordConfirmation) {
      toast.error('يرجى تعبئة جميع الحقول');
      return;
    }
    if (password !== passwordConfirmation) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }

    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      toast.success('تم تغيير كلمة المرور بنجاح');
      navigate(ROUTES.LOGIN);
    } catch {
      toast.error('حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans relative selection:bg-[#059669] selection:text-white" dir="rtl">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Reset Password Background" 
          className="w-full h-full object-cover filter brightness-95 contrast-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 via-white/80 to-slate-100/90 backdrop-blur-[2px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#059669]/30">م</div>
            <span className="font-black text-2xl text-slate-800 tracking-tight">متجرنا</span>
          </div>

          <div className="bg-white/80 border border-slate-200/85 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-[#059669] shadow-inner">
              <Lock size={32} />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-2">إعادة تعيين كلمة المرور</h1>
            <p className="text-slate-600 text-xs text-center font-medium leading-relaxed mb-8">
              الرجاء إدخال كلمة المرور الجديدة لحسابك لتأكيد التغيير.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1.5 text-right">
                <Label className="text-xs font-bold text-slate-700">كلمة المرور الجديدة</Label>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-2xl border-slate-200 bg-white/50"
                />
              </div>

              <div className="space-y-1.5 text-right">
                <Label className="text-xs font-bold text-slate-700">تأكيد كلمة المرور</Label>
                <Input 
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-2xl border-slate-200 bg-white/50"
                />
              </div>

              <Button 
                type="submit"
                loading={loading}
                className="w-full h-12 text-sm font-bold transition-all shadow-xl shadow-[#059669]/20 rounded-2xl bg-gradient-to-r from-[#059669] to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white mt-2"
              >
                <span>حفظ كلمة المرور الجديدة</span>
              </Button>
            </form>
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