import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
  role: 'platform_admin' | 'merchant_owner';
}

export default function Header({ title, onMenuToggle, role }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors lg:hidden">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className={`relative hidden md:flex items-center transition-all duration-200 ${searchFocused ? 'w-72' : 'w-56'}`}>
          <Search size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pr-9 pl-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2.5 pr-2 pl-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {role === 'platform_admin' ? 'أحمد الشمري' : 'سارة العتيبي'}
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              {role === 'platform_admin' ? 'مشرف المنصة' : 'صاحبة المتجر'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-white font-bold text-sm">
            {role === 'platform_admin' ? 'أش' : 'سع'}
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
