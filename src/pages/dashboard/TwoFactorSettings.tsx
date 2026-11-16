import { useState } from 'react';
import { ShieldCheck, QrCode, KeyRound, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function TwoFactorSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  const handleToggle2FA = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      const newState = !is2FAEnabled;
      setIs2FAEnabled(newState);
      setShowQR(newState);
      if (newState) {
        toast.success('تم تفعيل المصادقة الثنائية بنجاح، يرجى مسح رمز الـ QR');
      } else {
        toast.info('تم إيقاف المصادقة الثنائية');
        setRecoveryCodes([]);
      }
    } catch {
      toast.error('حدث خطأ، يجدر المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecoveryCodes = async () => {
    try {
      await new Promise(r => setTimeout(r, 800));
      const mockCodes = [
        '9h8f-4d2a', '1b2c-3d4e', '5f6g-7h8i', '9j0k-1l2m',
        '3n4o-5p6q', '7r8s-9t0u', '1v2w-3x4y', '5z6a-7b8c'
      ];
      setRecoveryCodes(mockCodes);
      toast.success('تم توليد أكواد الاسترداد الاحتياطية بنجاح');
    } catch {
      toast.error('فشل توليد الأكواد');
    }
  };

  const copyCodesToClipboard = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
    toast.success('تم نسخ الأكواد إلى الحافظة بنجاح!');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${is2FAEnabled ? 'bg-emerald-500/10 text-[#059669] border border-emerald-500/20' : 'bg-slate-100 text-slate-500'}`}>
              <ShieldCheck size={30} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">المصادقة الثنائية (2FA)</h3>
              <p className="text-sm text-slate-600 font-medium">
                {is2FAEnabled 
                  ? 'حسابك محمي حالياً بواسطة المصادقة الثنائية عبر تطبيقات المصادقة (Google Authenticator).' 
                  : 'أضف طبقة حماية إضافية لحسابك التجاري عبر تفعيل المصادقة الثنائية.'}
              </p>
            </div>
          </div>

          <Button 
            onClick={handleToggle2FA}
            loading={loading}
            className={`h-12 px-6 rounded-2xl font-bold transition-all shadow-md ${
              is2FAEnabled 
                ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-red-100' 
                : 'bg-gradient-to-r from-[#059669] to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-[#059669]/20'
            }`}
          >
            {is2FAEnabled ? 'إيقاف المصادقة الثنائية' : 'تفعيل المصادقة الثنائية'}
          </Button>
        </div>

        {is2FAEnabled && showQR && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-6 animate-fadeIn">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-inner shrink-0">
                <QrCode size={110} className="text-slate-800" />
              </div>
              <div className="space-y-2 text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-[#059669] text-xs font-black">
                  <CheckCircle2 size={14} />
                  <span>خطوة المسح</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">مسح رمز الاستجابة السريعة (QR)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  استخدم تطبيق مصادقة مثل Google Authenticator أو Authy لمسح الرمز أعلاه، ثم أدخل رمز التحقق المؤلف من 6 أرقام لتأكيد الربط.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <KeyRound size={20} className="text-[#059669]" />
                  <span>أكواد الاسترداد الاحتياطية (Recovery Codes)</span>
                </div>
                <Button 
                  onClick={handleGenerateRecoveryCodes}
                  variant="outline"
                  className="h-10 px-4 rounded-xl border-emerald-500/30 bg-white text-[#059669] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  <span>توليد الأكواد</span>
                </Button>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                تتيح لك هذه الأكواد تسجيل الدخول في حال فقدان الوصول إلى هاتفك. احفظها في مكان آمن ولن تظهر مرة أخرى.
              </p>

              {recoveryCodes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs font-bold text-slate-800 bg-white p-4 rounded-xl border border-emerald-500/20 text-center shadow-inner">
                    {recoveryCodes.map((code, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        {code}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={copyCodesToClipboard}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Copy size={14} />
                    <span>نسخ جميع الأكواد</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}