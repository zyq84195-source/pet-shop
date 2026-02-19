import { getRequestConfig } from 'next-intl/server';
import { Locale } from '@/types';

export const locales: Locale[] = ['en', 'zh'];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale || defaultLocale,
    messages: (await import(`./messages/${locale || defaultLocale}.json`)).default
  };
});
