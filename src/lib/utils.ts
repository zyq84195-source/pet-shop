import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, locale: string): string {
  const currency = locale === 'zh' ? 'CNY' : 'USD';
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

export function formatDate(date: Date | string, locale: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function getLocalizedText(text: { en: string; zh: string }, locale: string): string {
  return locale === 'zh' ? text.zh : text.en;
}

export function getLocalizedArray(arr: { en: string[]; zh: string[] }, locale: string): string[] {
  return locale === 'zh' ? arr.zh : arr.en;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
