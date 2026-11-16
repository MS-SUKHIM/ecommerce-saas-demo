import { useState } from 'react';
import { User, ShoppingBag, MapPin, Heart, LogOut } from 'lucide-react';
import StorefrontLayout from '../../components/shared/StorefrontLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import ProductCard from '../../components/shared/ProductCard';
import { orders, products } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ORDER_STATUSES } from '../../lib/constants';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { toast } from 'sonner';

const ADDRESSES = [
  { id: 'a1', label: 'المنزل', city: 'الرياض', area: 'حي النخيل', street: 'شارع الملك فهد، مبنى 12', default: true },
  { id: 'a2', label: 'العمل',  city: 'الرياض', area: 'حي العليا', street: 'طريق العليا، برج المملكة', default: false },
];

const wishlistProducts = products.slice(0, 4);

export default function StoreAccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
    toast.success('تم تسجيل الخروج');
  };

  return (
    <StorefrontLayout>
      <div className="max-w-5xl mx-auto px-4 py-8" dir="rtl">
        {/* Profile header */}
        <div className="flex items-center gap-5 mb-8 p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl">
          <Avatar className="w-16 h-16 text-xl"><AvatarFallback>{user?.name?.[0] ?? 'ع'}</AvatarFallback></Avatar>
          <div>
            <h2 className="text-xl font-black text-[var(--fg)]">{user?.name ?? 'عميل دكان'}</h2>
            <p className="text-[var(--fg-muted)] text-sm">{user?.email}</p>
          </div>
          <Button variant="outline" className="mr-auto gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={handleLogout}>
            <LogOut size={14} />تسجيل الخروج
          </Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="gap-2"><ShoppingBag size={14} />طلباتي</TabsTrigger>
            <TabsTrigger value="profile" className="gap-2"><User size={14} />الملف الشخصي</TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2"><MapPin size={14} />عناويني</TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2"><Heart size={14} />قائمة الأمنيات</TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders">
            <div className="space-y-3">
              {orders.slice(0, 5).map(o => {
                const cfg = ORDER_STATUSES[o.status as keyof typeof ORDER_STATUSES];
                return (
                  <div key={o.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-mono font-bold text-[var(--fg)]">{o.id}</p>
                        <p className="text-xs text-[var(--fg-muted)] mt-0.5">{formatDate(o.date)}</p>
                      </div>
                      <Badge variant={(cfg?.color ?? 'gray') as any}>{cfg?.label ?? o.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[var(--fg-muted)]">{o.items.length} منتج</p>
                      <p className="font-bold text-[#059669]">{formatCurrency(o.total)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 space-y-4 max-w-lg">
              <h3 className="font-bold text-[var(--fg)]">المعلومات الشخصية</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>الاسم الكامل</Label><Input defaultValue={user?.name ?? ''} /></div>
                <div className="space-y-1.5"><Label>البريد الإلكتروني</Label><Input type="email" defaultValue={user?.email ?? ''} /></div>
                <div className="space-y-1.5"><Label>رقم الجوال</Label><Input type="tel" defaultValue="+966501234567" /></div>
              </div>
              <Separator />
              <h3 className="font-bold text-[var(--fg)]">تغيير كلمة المرور</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>الحالية</Label><Input type="password" /></div>
                <div className="space-y-1.5"><Label>الجديدة</Label><Input type="password" /></div>
              </div>
              <Button className="mt-2" onClick={() => toast.success('تم حفظ التغييرات')}>حفظ التغييرات</Button>
            </div>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses">
            <div className="space-y-3 max-w-lg">
              {ADDRESSES.map(a => (
                <div key={a.id} className={`bg-[var(--bg-card)] border-2 rounded-2xl p-5 ${a.default ? 'border-[#059669]' : 'border-[var(--border)]'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#059669]" />
                      <p className="font-bold text-[var(--fg)]">{a.label}</p>
                    </div>
                    {a.default && <Badge variant="green">افتراضي</Badge>}
                  </div>
                  <p className="text-sm text-[var(--fg-muted)]">{a.city}، {a.area}</p>
                  <p className="text-sm text-[var(--fg-muted)]">{a.street}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2" onClick={() => toast.info('سيتم فتح نافذة إضافة عنوان')}>
                <MapPin size={14} />إضافة عنوان جديد
              </Button>
            </div>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StorefrontLayout>
  );
}
