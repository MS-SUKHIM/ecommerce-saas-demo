import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'merchant_owner' | 'merchant_staff' | 'customer' | 'platform_admin';
interface User { id: string; name: string; email: string; role: Role; avatar?: string; storeName?: string }
interface AuthCtx { user: User | null; isLoading: boolean; login: (email: string, password: string, role?: Role) => Promise<void>; logout: () => void; isAuthenticated: boolean }

const Ctx = createContext<AuthCtx | null>(null);

const DEMO_USERS: Record<string, User> = {
  'merchant@demo.com': { id: 'u-merch', name: 'نورة العتيبي', email: 'merchant@demo.com', role: 'merchant_owner', storeName: 'متجر الأناقة' },
  'customer@demo.com': { id: 'u-cust',  name: 'عبدالرحمن الغامدي', email: 'customer@demo.com', role: 'customer' },
  'admin@demo.com':    { id: 'u-adm',   name: 'أحمد المشرف', email: 'admin@demo.com', role: 'platform_admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string, role?: Role) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const found = DEMO_USERS[email] ?? { id: 'u-new', name: email.split('@')[0], email, role: role ?? 'merchant_owner', storeName: 'متجري الجديد' };
    setUser(found);
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <Ctx.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth outside AuthProvider');
  return ctx;
};
