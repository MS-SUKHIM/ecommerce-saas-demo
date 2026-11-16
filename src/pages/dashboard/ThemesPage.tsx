import { useState } from 'react';
import { Eye, Download, Check } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { themes } from '../../data/mockData';
import { toast } from 'sonner';

export default function ThemesPage() {
  const [active, setActive] = useState(themes[0].id);

  return (
    <DashboardLayout>
      <PageHeader title="الثيمات" description="اختر تصميم متجرك من مجموعة ثيمات احترافية" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {themes.map(theme => (
          <div key={theme.id} className={`bg-[var(--bg-card)] border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg ${active === theme.id ? 'border-[#059669] shadow-md shadow-emerald-100 dark:shadow-emerald-900/20' : 'border-[var(--border)]'}`}>
            {/* Preview */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img src={theme.preview} alt={theme.name} className="w-full h-full object-cover" />
              {theme.price > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge variant="purple">مدفوع</Badge>
                </div>
              )}
              {active === theme.id && (
                <div className="absolute inset-0 bg-[#059669]/10 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg">
                    <Check size={20} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-[var(--fg)]">{theme.arabicName}</h3>
                  <p className="text-xs text-[var(--fg-muted)] mt-0.5">{theme.category}</p>
                </div>
                {active === theme.id && <Badge variant="green">مفعّل</Badge>}
              </div>

              <p className="text-xs text-[var(--fg-muted)] leading-relaxed mb-4">ثيم {theme.arabicName} — مصمم لمتاجر {theme.category} • تقييم {theme.rating}</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => toast.info('سيتم فتح معاينة الثيم')}>
                  <Eye size={13} />معاينة
                </Button>
                {active === theme.id
                  ? <Button size="sm" variant="secondary" className="flex-1" disabled>مفعّل حالياً</Button>
                  : <Button size="sm" className="flex-1 gap-1" onClick={() => { setActive(theme.id); toast.success(`تم تفعيل ثيم "${theme.name}"`); }}>
                      <Download size={13} />تفعيل
                    </Button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
