import { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings,
  Puzzle, Palette, CreditCard, UserCog, ChevronLeft, Bell, Search,
  Sun, Moon, LogOut, Menu, X, Store, Tag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from '../ui/dropdown-menu';
import { ROUTES } from '../../lib/routes';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'لوحة التحكم', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  { label: 'المنتجات', icon: Package, to: ROUTES.PRODUCTS },
  { label: 'التصنيفات', icon: Tag, to: ROUTES.CATEGORIES },
  { label: 'الطلبات', icon: ShoppingCart, to: ROUTES.ORDERS },
  { label: 'العملاء', icon: Users, to: ROUTES.CUSTOMERS },
  { label: 'التقارير', icon: BarChart3, to: ROUTES.REPORTS },
  { label: 'الثيمات', icon: Palette, to: ROUTES.THEMES },
  { label: 'التطبيقات', icon: Puzzle, to: ROUTES.APPS },
  { label: 'الاشتراك', icon: CreditCard, to: ROUTES.SUBSCRIPTION },
  { label: 'الموظفون', icon: UserCog, to: ROUTES.STAFF },
  { label: 'إعدادات المتجر', icon: Settings, to: ROUTES.SETTINGS },
];

interface Props { children: ReactNode }

export default function DashboardLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate(ROUTES.LOGIN); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center font-black text-white text-lg">د</div>
            <span className="font-black text-lg text-white">دكان</span>
          </Link>
        )}
        {collapsed && <div className="w-8 h-8 mx-auto rounded-lg bg-[#059669] flex items-center justify-center font-black text-white text-lg">د</div>}
        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 items-center justify-center text-white/60 hover:text-white transition-all">
          <ChevronLeft size={14} className={cn('transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Store badge */}
      {!collapsed && (
        <div className="mx-3 my-3 px-3 py-2 rounded-lg bg-white/10">
          <div className="flex items-center gap-2">
            <Store size={14} className="text-white/60" />
            <span className="text-xs text-white/80 font-medium truncate">{user?.storeName ?? 'متجري'}</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {navItems.map(item => {
          const active = pathname === item.to || (item.to !== ROUTES.DASHBOARD && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active ? 'bg-[#059669] text-white' : 'text-white/60 hover:text-white hover:bg-white/10',
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
          <LogOut size={18} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden" dir="rtl">
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar desktop */}
      <aside
        className="hidden lg:flex flex-col bg-[var(--sidebar-bg)] transition-all duration-300 flex-shrink-0"
        style={{ width: collapsed ? 72 : 260 }}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar mobile */}
      <aside className={cn('fixed inset-y-0 right-0 z-40 w-64 bg-[var(--sidebar-bg)] flex flex-col transform transition-transform duration-300 lg:hidden', mobileOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center font-black text-white text-lg">د</div>
            <span className="font-black text-lg text-white">دكان</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="text-white/60"><X size={18} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map(item => {
            const active = pathname === item.to || (item.to !== ROUTES.DASHBOARD && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all', active ? 'bg-[#059669] text-white' : 'text-white/60 hover:text-white hover:bg-white/10')}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10">
            <LogOut size={18} /><span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--border)] bg-[var(--bg-card)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-[var(--fg-muted)]">
              <Menu size={18} />
            </button>
            <div className="relative hidden md:block">
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
              <input type="text" placeholder="بحث سريع..." className="w-48 lg:w-64 pr-8 pl-3 h-8 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center text-[var(--fg-muted)] transition-colors">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link to={ROUTES.STORE} target="_blank" className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:border-[#059669] transition-all">
              <Store size={13} /> واجهة المتجر
            </Link>

            <button className="relative w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center text-[var(--fg-muted)]">
              <Bell size={16} />
              <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-[var(--fg)]">{user?.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to={ROUTES.SETTINGS}>الإعدادات</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
