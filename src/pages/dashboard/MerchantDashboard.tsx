import { DollarSign, ShoppingCart, Package, Users, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardLayout from '../../components/shared/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import PageHeader from '../../components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { salesChart, orders, products } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ORDER_STATUSES } from '../../lib/constants';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';

const statusBadge = (s: string) => {
  const cfg = ORDER_STATUSES[s as keyof typeof ORDER_STATUSES];
  return <Badge variant={cfg?.color as any}>{cfg?.label ?? s}</Badge>;
};

const lowStock = products.filter(p => p.stock > 0 && p.stock <= 20);

export default function MerchantDashboard() {
  return (
    <DashboardLayout>
      <PageHeader title="لوحة التحكم" description="مرحباً! إليك ملخص متجرك اليوم" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="مبيعات الشهر" value={formatCurrency(134200)} icon={DollarSign} trend={18.3} trendLabel="الشهر الماضي" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="الطلبات المعلقة" value={orders.filter(o => o.status === 'pending').length} icon={ShoppingCart} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="المنتجات النشطة" value={products.filter(p => p.status === 'active').length} icon={Package} trend={5.2} trendLabel="هذا الأسبوع" iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="إجمالي العملاء" value="1,284" icon={Users} trend={12.1} trendLabel="هذا الشهر" iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4 flex-row items-center justify-between">
            <CardTitle>المبيعات الشهرية</CardTitle>
            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
              <TrendingUp size={12} /> +12.5%
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salesChart} margin={{ top:0, right:0, left:-20, bottom:0 }}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize:10, fontFamily:'Cairo', fill:'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:9, fontFamily:'Cairo', fill:'var(--fg-muted)' }} axisLine={false} tickLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius:10, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,.12)', fontFamily:'Cairo', fontSize:12 }} formatter={v=>[`${Number(v).toLocaleString('ar-SA')} ر.س`,'المبيعات']} />
                <Area type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2.5} fill="url(#sg)" dot={false} activeDot={{ r:4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الطلبات هذا الأسبوع</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesChart.slice(-7)} margin={{ top:0, right:0, left:-25, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize:9, fontFamily:'Cairo', fill:'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:9, fontFamily:'Cairo', fill:'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius:10, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,.12)', fontFamily:'Cairo', fontSize:12 }} formatter={v=>[Number(v).toLocaleString('ar-SA'),'الطلبات']} />
                <Bar dataKey="orders" radius={[4,4,0,0]}>
                  {salesChart.slice(-7).map((_,i,a) => <Cell key={i} fill={i===a.length-1 ? '#059669' : '#D1FAE5'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle>أحدث الطلبات</CardTitle>
            <Link to={ROUTES.ORDERS} className="text-xs text-[#059669] font-semibold flex items-center gap-1 hover:underline">
              عرض الكل <ArrowUpRight size={12} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {orders.slice(0,5).map(o => (
                <div key={o.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--fg)] font-mono">{o.id}</p>
                    <p className="text-xs text-[var(--fg-muted)]">{o.customer}</p>
                  </div>
                  {statusBadge(o.status)}
                  <div className="text-left">
                    <p className="text-sm font-bold text-[var(--fg)]">{formatCurrency(o.total)}</p>
                    <p className="text-xs text-[var(--fg-muted)]">{formatDate(o.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low stock */}
        <Card>
          <CardHeader className="flex-row items-center gap-2 pb-4">
            <AlertTriangle size={16} className="text-amber-500" />
            <CardTitle>مخزون منخفض</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {lowStock.length === 0
              ? <p className="px-5 pb-4 text-sm text-[var(--fg-muted)]">المخزون بخير ✓</p>
              : <div className="divide-y divide-[var(--border)]">
                  {lowStock.slice(0,5).map(p => (
                    <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                      <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[var(--fg)] truncate">{p.name}</p>
                        <p className="text-xs text-[var(--fg-muted)]">SKU: {p.sku}</p>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{p.stock} متبقي</span>
                    </div>
                  ))}
                </div>
            }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
