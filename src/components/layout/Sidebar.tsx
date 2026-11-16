import {
  LayoutDashboard, Store, Package, ShoppingCart, Warehouse,
  CreditCard, Puzzle, Palette, Ticket, Settings, LogOut,
  ChevronLeft, BarChart3, Bell, Users, Globe
} from 'lucide-react';

type Page =
  | 'platform-dashboard' | 'tenants' | 'plans' | 'subscriptions' | 'audit-logs'
  | 'merchant-dashboard' | 'products' | 'orders' | 'inventory'
  | 'apps' | 'themes' | 'storefront' | 'support' | 'store-settings' | 'notifications';

interface NavItem {
  id: Page;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  group?: string;
}

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  role: 'platform_admin' | 'merchant_owner';
  collapsed: boolean;
  onToggle: () => void;
}

const platformNav: NavItem[] = [
  { id: 'platform-dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, group: 'رئيسي' },
  { id: 'tenants', label: 'المتاجر', icon: Store, group: 'رئيسي' },
  { id: 'plans', label: 'خطط الاشتراك', icon: CreditCard, group: 'الاشتراكات' },
  { id: 'subscriptions', label: 'المشتركون', icon: Users, group: 'الاشتراكات' },
  { id: 'apps', label: 'سوق التطبيقات', icon: Puzzle, group: 'السوق' },
  { id: 'themes', label: 'سوق الثيمات', icon: Palette, group: 'السوق' },
  { id: 'support', label: 'تذاكر الدعم', icon: Ticket, group: 'الدعم' },
  { id: 'audit-logs', label: 'سجل الأحداث', icon: BarChart3, group: 'الدعم' },
  { id: 'notifications', label: 'الإشعارات', icon: Bell, group: 'الدعم' },
];

const merchantNav: NavItem[] = [
  { id: 'merchant-dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, group: 'رئيسي' },
  { id: 'products', label: 'المنتجات', icon: Package, group: 'المتجر' },
  { id: 'orders', label: 'الطلبات', icon: ShoppingCart, group: 'المتجر' },
  { id: 'inventory', label: 'المخزون', icon: Warehouse, group: 'المتجر' },
  { id: 'storefront', label: 'واجهة المتجر', icon: Globe, group: 'الواجهة' },
  { id: 'themes', label: 'الثيمات', icon: Palette, group: 'الواجهة' },
  { id: 'apps', label: 'التطبيقات', icon: Puzzle, group: 'الإضافات' },
  { id: 'support', label: 'الدعم الفني', icon: Ticket, group: 'المساعدة' },
  { id: 'store-settings', label: 'إعدادات المتجر', icon: Settings, group: 'المساعدة' },
];

export default function Sidebar({ currentPage, onNavigate, role, collapsed, onToggle }: SidebarProps) {
  const navItems = role === 'platform_admin' ? platformNav : merchantNav;
  const groups = [...new Set(navItems.map(i => i.group))];

  return (
    <aside
      className="flex flex-col transition-all duration-300 bg-[#13092E] text-white h-full"
      style={{ width: collapsed ? 72 : 256 }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7C3AED] flex items-center justify-center font-black text-lg">س</div>
            <div>
              <div className="font-black text-base leading-tight">سلّة</div>
              <div className="text-[10px] text-white/40 leading-tight">{role === 'platform_admin' ? 'مشرف المنصة' : 'لوحة التاجر'}</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 mx-auto rounded-xl bg-[#7C3AED] flex items-center justify-center font-black text-lg">س</div>
        )}
        <button
          onClick={onToggle}
          className={`w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft size={14} className="text-white/60" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {groups.map(group => (
          <div key={group} className="mb-4">
            {!collapsed && (
              <p className="px-3 text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-1">{group}</p>
            )}
            {navItems.filter(i => i.group === group).map(item => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5
                    ${active
                      ? 'bg-[#7C3AED] text-white shadow-lg shadow-purple-900/40'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={18} className={active ? 'text-white' : ''} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all">
          <Settings size={18} />
          {!collapsed && <span>الإعدادات</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
          <LogOut size={18} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
}
