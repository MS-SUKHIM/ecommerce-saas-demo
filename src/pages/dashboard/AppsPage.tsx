import { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import SearchBar from '../../components/shared/SearchBar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { apps } from '../../data/mockData';
import { toast } from 'sonner';

export default function AppsPage() {
  const [search, setSearch] = useState('');
  const [installed, setInstalled] = useState<string[]>(['app-1', 'app-3']);

  const filtered = apps.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search));

  const toggle = (id: string, name: string) => {
    if (installed.includes(id)) {
      setInstalled(prev => prev.filter(x => x !== id));
      toast.success(`تم إلغاء تثبيت "${name}"`);
    } else {
      setInstalled(prev => [...prev, id]);
      toast.success(`تم تثبيت "${name}" بنجاح`);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader title="سوق التطبيقات" description="وسّع إمكانيات متجرك بأفضل التطبيقات" />

      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="ابحث عن تطبيق..." className="w-64" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(app => {
          const isInstalled = installed.includes(app.id);
          return (
            <div key={app.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col">
              {/* Icon + title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[var(--fg)] text-sm leading-snug">{app.name}</h3>
                  <p className="text-xs text-[var(--fg-muted)]">{app.price === 0 ? 'مجاني' : `${app.price} ر.س/شهر`}</p>
                </div>
              </div>

              <p className="text-xs text-[var(--fg-muted)] leading-relaxed flex-1 mb-3">{app.desc}</p>

              {/* Rating + category */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-[var(--fg)]">{app.rating}</span>
                </div>
                <Badge variant="outline" className="text-[10px]">{app.category}</Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isInstalled ? 'secondary' : 'default'}
                  className="flex-1 text-xs"
                  onClick={() => toggle(app.id, app.name)}
                >
                  {isInstalled ? 'إلغاء التثبيت' : 'تثبيت'}
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toast.info('سيتم فتح صفحة التطبيق')}>
                  <ExternalLink size={13} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
