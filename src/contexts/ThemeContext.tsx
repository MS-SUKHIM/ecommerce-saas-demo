import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
interface ThemeCtx { theme: Theme; toggleTheme: () => void; isDark: boolean }
const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('dokan-theme') as Theme) ?? 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('dokan-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return <Ctx.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>{children}</Ctx.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme outside ThemeProvider');
  return ctx;
};
