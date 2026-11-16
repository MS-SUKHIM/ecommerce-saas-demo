import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/shared/DashboardLayout';
import PageHeader from '../../components/shared/PageHeader';
import StatCard from '../../components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { salesChart, categories } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, ShoppingCart, Users, Package } from 'lucide-react';

const PIE_COLORS = ['#059669','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#06B6D4','#84CC16','#F97316'];

const catData = categories.map((c, i) => ({ name: c.name, value: Math.round(Math.random() * 8000 + 2000), fill: PIE_COLORS[i % PIE_COLORS.length] }));

const tooltipStyle = { borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.12)', fontFamily: 'Cairo', fontSize: 12 };

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="التقارير والتحليلات" description="رؤى شاملة عن أداء متجرك" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="إجمالي المبيعات" value={formatCurrency(842600)} icon={TrendingUp} trend={14.2} trendLabel="الشهر الماضي" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="إجمالي الطلبات" value="1,847" icon={ShoppingCart} trend={9.8} trendLabel="الشهر الماضي" iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="العملاء الجدد" value="312" icon={Users} trend={22.5} trendLabel="الشهر الماضي" iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="متوسط قيمة الطلب" value={formatCurrency(456)} icon={Package} trend={-2.1} trendLabel="الشهر الماضي" iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-5">
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="orders">الطلبات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader><CardTitle>المبيعات الشهرية</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesChart} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo', fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Cairo', fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={v => [`${Number(v).toLocaleString('ar-SA')} ر.س`, 'المبيعات']} />
                  <Area type="monotone" dataKey="sales" stroke="#059669" strokeWidth={2.5} fill="url(#rg1)" dot={false} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader><CardTitle>عدد الطلبات الشهرية</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesChart} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo', fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Cairo', fill: 'var(--fg-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={v => [Number(v).toLocaleString('ar-SA'), 'الطلبات']} />
                  <Bar dataKey="orders" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader><CardTitle>المبيعات حسب الفئة</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={catData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value">
                      {catData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={v => [`${Number(v).toLocaleString('ar-SA')} ر.س`, '']} />
                    <Legend formatter={(v) => <span style={{ fontFamily: 'Cairo', fontSize: 12 }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>أفضل الفئات</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {catData.sort((a, b) => b.value - a.value).slice(0, 6).map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-xs text-[var(--fg-muted)] w-4">{i + 1}</span>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.fill }} />
                    <span className="flex-1 text-sm text-[var(--fg)]">{c.name}</span>
                    <span className="text-sm font-bold text-[var(--fg)]">{formatCurrency(c.value)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
