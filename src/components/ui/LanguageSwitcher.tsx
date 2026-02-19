'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] || defaultLocale;

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as typeof locales[number])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLocale === 'en'
            ? 'bg-white text-orange-500 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('zh')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLocale === 'zh'
            ? 'bg-white text-orange-500 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        中文
      </button>
    </div>
  );
}
