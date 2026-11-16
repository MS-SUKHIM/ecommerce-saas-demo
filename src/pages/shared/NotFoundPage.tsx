import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ROUTES } from '../../lib/routes';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 text-center" dir="rtl">
      <div className="text-8xl font-black text-[#059669] mb-4">404</div>
      <h1 className="text-2xl font-black text-[var(--fg)] mb-2">الصفحة غير موجودة</h1>
      <p className="text-[var(--fg-muted)] mb-8 max-w-sm">يبدو أن الصفحة التي تبحث عنها قد انتقلت أو حُذفت</p>
      <div className="flex gap-3">
        <Link to={ROUTES.HOME}><Button className="gap-2"><Home size={16} /> الصفحة الرئيسية</Button></Link>
        <Button variant="outline" onClick={() => window.history.back()} className="gap-2"><ArrowRight size={16} /> العودة</Button>
      </div>
    </div>
  );
}
