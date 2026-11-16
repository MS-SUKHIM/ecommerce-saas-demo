import { createContext, useContext, useState, ReactNode } from 'react';
import { stores } from '../data/mockData';

type Store = typeof stores[0];
interface TenantCtx { currentTenant: Store | null; setTenant: (s: Store) => void }
const Ctx = createContext<TenantCtx | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setTenant] = useState<Store | null>(stores[0]);
  return <Ctx.Provider value={{ currentTenant, setTenant }}>{children}</Ctx.Provider>;
}

export const useTenant = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTenant outside TenantProvider');
  return ctx;
};
