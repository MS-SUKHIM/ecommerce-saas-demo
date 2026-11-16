import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'SAR') {
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency }).format(amount);
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'short', day: 'numeric', ...opts }).format(new Date(date));
}

export function formatRelative(date: string | Date) {
  const rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });
  const diff = (new Date(date).getTime() - Date.now()) / 1000;
  if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), 'second');
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  return rtf.format(Math.round(diff / 86400), 'day');
}

export function truncate(str: string, n = 50) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}
