import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Globe, Palette, Bell, Shield, QrCode, KeyRound, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { stores } from '../../data/mockData';
import { toast } from 'sonner';

const store = stores[0];

export default function StoreSettingsPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: store.name,
      domain: store.slug,
      description: 'متجر متخصص في الملابس والأزياء العصرية بأسعار تنافسية وجودة عالية.',
      phone: '+966501234567',
      email: `${store.slug}@dokan.com`,
      address: 'الرياض، المملكة العربية السعودية',
    },
  });

  const save = async () => {
    await new Promise(r => setTimeout(r, 500));
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const handleToggle2FA = async (checked: boolean) => {
    setLoading2FA(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setIs2FAEnabled(checked);
      setShowQR(checked);
      if (checked) {
        toast.success('تم تفعيل المصادقة الثنائية بنجاح، يرجى مسح رمز الـ QR');
      } else {
        toast.info('تم إيقاف المصادقة الثنائية');
        setRecoveryCodes([]);
      }
    } catch {
      toast.error('حدث خطأ، يجدر المحاولة لاحقاً');
    } finally {
      setLoading2FA(false);
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
    <DashboardLayout>
      <PageHeader title="إعدادات المتجر" description="تخصيص معلومات وإعدادات متجرك"
        actions={<Button className="gap-2" onClick={save} loading={isSubmitting}><Save size={16} />حفظ التغييرات</Button>} />

      <Tabs defaultValue="general">
        <TabsList className="mb-5">
          <TabsTrigger value="general" className="gap-2"><Globe size={14} />عام</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2"><Palette size={14} />المظهر</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell size={14} />الإشعارات</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield size={14} />الأمان</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>معلومات المتجر</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>اسم المتجر</Label>
                    <Input {...register('name')} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>رابط المتجر</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-gray-50 dark:bg-slate-800 border border-[var(--border)] border-l-0 rounded-r-lg text-xs text-[var(--fg-muted)] flex-shrink-0">dokan.com/</span>
                      <Input {...register('domain')} className="rounded-r-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>وصف المتجر</Label>
                  <Textarea {...register('description')} rows={3} className="resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>رقم الجوال</Label>
                    <Input {...register('phone')} type="tel" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>البريد الإلكتروني</Label>
                    <Input {...register('email')} type="email" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>العنوان</Label>
                  <Input {...register('address')} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle>شعار المتجر</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#059669] flex items-center justify-center text-white font-black text-4xl">
                      {store.name[0]}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info('سيتم فتح مستعرض الملفات')}>
                      تغيير الشعار
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>العملة واللغة</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label>العملة</Label>
                    <Select defaultValue="SAR">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                        <SelectItem value="AED">درهم إماراتي</SelectItem>
                        <SelectItem value="KWD">دينار كويتي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>اللغة</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader><CardTitle>تخصيص المظهر</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="mb-3 block">لون المتجر الرئيسي</Label>
                <div className="flex gap-3 flex-wrap">
                  {['#059669','#3B82F6','#8B5CF6','#EF4444','#F59E0B','#EC4899','#0EA5E9','#14B8A6'].map(c => (
                    <button key={c} className="w-10 h-10 rounded-xl shadow-sm border-2 border-white ring-2 ring-transparent hover:ring-gray-300 transition-all first:ring-[#059669]" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                {[
                  { label: 'إظهار شريط الإعلانات', desc: 'عرض رسالة ترويجية في أعلى المتجر' },
                  { label: 'تفعيل العروض في الصفحة الرئيسية', desc: 'إظهار قسم المنتجات المميزة' },
                  { label: 'إظهار تقييمات العملاء', desc: 'عرض نجوم التقييم على بطاقات المنتجات' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--fg)]">{s.label}</p>
                      <p className="text-xs text-[var(--fg-muted)]">{s.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle>إعدادات الإشعارات</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'إشعارات الطلبات الجديدة', desc: 'استلم إشعاراً عند كل طلب جديد' },
                { label: 'تنبيهات المخزون المنخفض', desc: 'عند وصول المنتج لأقل من 10 وحدات' },
                { label: 'إشعارات الدفع', desc: 'عند استلام أي مدفوعة' },
                { label: 'تقرير أسبوعي بالبريد', desc: 'ملخص أسبوعي لأداء المتجر' },
                { label: 'إشعارات التقييمات الجديدة', desc: 'عند كتابة عميل تقييماً لمنتج' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--fg)]">{s.label}</p>
                    <p className="text-xs text-[var(--fg-muted)]">{s.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-5">
            <Card>
              <CardHeader><CardTitle>كلمة المرور</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>كلمة المرور الحالية</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div />
                  <div className="space-y-1.5">
                    <Label>كلمة المرور الجديدة</Label>
                    <Input type="password" placeholder="8 أحرف على الأقل" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>تأكيد كلمة المرور</Label>
                    <Input type="password" placeholder="كرر كلمة المرور" />
                  </div>
                </div>
                <Button variant="outline" onClick={() => toast.success('تم تغيير كلمة المرور')}>تغيير كلمة المرور</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>المصادقة الثنائية</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--fg)] text-sm">تفعيل المصادقة الثنائية</p>
                    <p className="text-xs text-[var(--fg-muted)]">أضف طبقة حماية إضافية لحسابك عبر تطبيقات المصادقة</p>
                  </div>
                  <Switch 
                    checked={is2FAEnabled} 
                    onCheckedChange={handleToggle2FA} 
                    disabled={loading2FA}
                  />
                </div>

                {is2FAEnabled && showQR && (
                  <div className="pt-6 border-t border-slate-200/80 space-y-6 animate-fadeIn">
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}