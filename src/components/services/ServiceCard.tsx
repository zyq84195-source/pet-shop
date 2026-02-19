'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Service } from '@/types';
import Card, { CardImage, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getLocalizedText, formatPrice, getLocalizedArray } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const locale = useLocale();
  const t = useTranslations('services.card');

  const categoryColors: Record<string, string> = {
    grooming: 'bg-pink-100 text-pink-800',
    boarding: 'bg-blue-100 text-blue-800',
    veterinary: 'bg-green-100 text-green-800',
    training: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card className="group">
      <Link href={`/${locale}/services/${service.id}`}>
        <CardImage
          src={service.image}
          alt={getLocalizedText(service.name, locale)}
          className="h-48"
        />
      </Link>
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <Link href={`/${locale}/services/${service.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors">
              {getLocalizedText(service.name, locale)}
            </h3>
          </Link>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[service.category]}`}>
            {service.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {getLocalizedText(service.description, locale)}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.duration} {t('minutes')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(service.price, locale)}
          </span>
          <Link href={`/${locale}/services/${service.id}/book`}>
            <Button variant="primary">
              {t('book')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
