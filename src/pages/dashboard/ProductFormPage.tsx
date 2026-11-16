import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, ChevronRight, Upload, Plus, X } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { products, categories } from '../../data/mockData';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const schema = z.object({
  name:        z.string().min(3, 'الاسم مطلوب'),
  description: z.string().optional(),
  sku:         z.string().min(2, 'رمز المنتج مطلوب'),
  price:       z.number().positive('السعر يجب أن يكون أكبر من صفر'),
  comparePrice:z.number().optional(),
  cost:        z.number().optional(),
  category:    z.string().min(1, 'اختر فئة'),
  stock:       z.number().int().min(0),
  trackStock:  z.boolean(),
});
type Form = z.infer<typeof schema>;

const STEPS = ['المعلومات الأساسية', 'التسعير', 'الصور', 'الخيارات والنشر'];

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? products.find(p => p.id === id) : null;
  const isEdit = !!existing;
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<string[]>(existing ? [existing.img] : []);
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [tagInput, setTagInput] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: existing?.name ?? '',
      sku: existing?.sku ?? '',
      price: existing?.price ?? 0,
      category: existing?.category ?? '',
      stock: existing?.stock ?? 0,
      trackStock: true,
    },
  });

  const onSubmit = async (data: Form) => {
    await new Promise(r => setTimeout(r, 600));
    toast.success(isEdit ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
    navigate(ROUTES.PRODUCTS);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        description={isEdit ? existing?.name : 'أضف منتجاً جديداً إلى متجرك'}
        actions={<Button variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)} className="gap-2"><ChevronRight size={16} />العودة للمنتجات</Button>}
      />

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => setStep(i)} className="flex items-center gap-2 flex-shrink-0">
            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors', step === i ? 'bg-[#059669] text-white' : i < step ? 'bg-emerald-100 text-[#059669]' : 'bg-gray-100 text-gray-400')}>
              {i + 1}
            </div>
            <span className={cn('text-sm font-medium', step === i ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]')}>{s}</span>
            {i < STEPS.length - 1 && <ChevronLeft size={14} className="text-[var(--border)] mx-1" />}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {/* Step 0 */}
            {step === 0 && (
              <Card>
                <CardHeader><CardTitle>المعلومات الأساسية</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>اسم المنتج <span className="text-red-500">*</span></Label>
                    <Input {...register('name')} placeholder="مثال: حذاء رياضي نايك" error={errors.name?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>وصف المنتج</Label>
                    <Textarea {...register('description')} rows={4} placeholder="وصف تفصيلي للمنتج..." className="resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>رمز المنتج (SKU) <span className="text-red-500">*</span></Label>
                      <Input {...register('sku')} placeholder="SKU-001" error={errors.sku?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>الفئة <span className="text-red-500">*</span></Label>
                      <Select defaultValue={watch('category')} onValueChange={v => setValue('category', v)}>
                        <SelectTrigger><SelectValue placeholder="اختر فئة" /></SelectTrigger>
                        <SelectContent>
                          {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <Card>
                <CardHeader><CardTitle>التسعير والمخزون</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>السعر (ر.س) <span className="text-red-500">*</span></Label>
                      <Input {...register('price', {valueAsNumber:true})} type="number" step="0.01" placeholder="0.00" error={errors.price?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>سعر المقارنة (ر.س)</Label>
                      <Input {...register('comparePrice', {valueAsNumber:true})} type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>التكلفة (ر.س)</Label>
                      <Input {...register('cost', {valueAsNumber:true})} type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>الكمية المتاحة</Label>
                      <Input {...register('stock', {valueAsNumber:true})} type="number" min="0" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border border-[var(--border)] rounded-xl p-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--fg)]">تتبع المخزون</p>
                      <p className="text-xs text-[var(--fg-muted)]">ضبط الكمية تلقائياً عند كل طلب</p>
                    </div>
                    <Switch checked={watch('trackStock')} onCheckedChange={v => setValue('trackStock', v)} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <Card>
                <CardHeader><CardTitle>الصور</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border)] group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setImages(imgs => imgs.filter((_, j) => j !== i))}
                          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={12} />
                        </button>
                        {i === 0 && <span className="absolute bottom-1 right-1 text-[10px] bg-[#059669] text-white px-1.5 py-0.5 rounded-full">رئيسية</span>}
                      </div>
                    ))}
                    <button type="button" onClick={() => setImages(i => [...i, `https://picsum.photos/400/400?random=${Date.now()}`])}
                      className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-2 text-[var(--fg-muted)] hover:border-[#059669] hover:text-[#059669] transition-colors">
                      <Upload size={20} />
                      <span className="text-xs">إضافة صورة</span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--fg-muted)]">الصورة الأولى ستكون الصورة الرئيسية للمنتج.</p>
                </CardContent>
              </Card>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <Card>
                <CardHeader><CardTitle>الوسوم والنشر</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>الوسوم</Label>
                    <div className="flex gap-2">
                      <Input value={tagInput} onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
                        placeholder="أضف وسماً..." className="flex-1" />
                      <Button type="button" variant="outline" onClick={addTag} className="gap-1"><Plus size={14} />إضافة</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(t => (
                        <Badge key={t} variant="outline" className="gap-1 cursor-pointer" onClick={() => setTags(ts => ts.filter(x => x !== t))}>
                          {t} <X size={10} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>حالة النشر</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--fg)]">نشر المنتج</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--fg)]">ظاهر في الكتالوج</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button type="submit" loading={isSubmitting} className="w-full">
                {isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </Button>
              {step > 0 && <Button type="button" variant="outline" className="w-full gap-1" onClick={() => setStep(s => s - 1)}><ChevronRight size={14} />السابق</Button>}
              {step < STEPS.length - 1 && <Button type="button" variant="outline" className="w-full gap-1" onClick={() => setStep(s => s + 1)}>التالي<ChevronLeft size={14} /></Button>}
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
