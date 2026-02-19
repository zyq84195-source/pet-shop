'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getServiceById } from '@/data/services';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getLocalizedText, formatPrice, getLocalizedArray } from '@/lib/utils';

export default function ServiceDetailPage() {
  const params = useParams();
  const t = useTranslations('services');
  const locale = params.locale as string;
  const service = getServiceById(params.id as string);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}/services`} className="hover:text-orange-500">
            {t('detail.backToServices')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{getLocalizedText(service.name, locale)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Service Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-white">
            <img
              src={service.image}
              alt={getLocalizedText(service.name, locale)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {getLocalizedText(service.name, locale)}
                </h1>
                <Badge>{service.category}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration} min
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(service.price, locale)}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{getLocalizedText(service.description, locale)}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('card.features')}</h3>
              <ul className="space-y-2">
                {getLocalizedArray(service.features, locale).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Book Button */}
            <div className="pt-4">
              <Link href={`/${locale}/services/${service.id}/book`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('detail.bookButton')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
