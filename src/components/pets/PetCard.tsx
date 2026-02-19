'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Pet } from '@/types';
import Card, { CardImage, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getLocalizedText } from '@/lib/utils';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const locale = useLocale();
  const t = useTranslations('pets.card');

  const sizeBadgeVariant = {
    small: 'info' as const,
    medium: 'warning' as const,
    large: 'danger' as const,
  };

  return (
    <Card className="group">
      <Link href={`/${locale}/pets/${pet.id}`}>
        <CardImage
          src={pet.images[0]}
          alt={getLocalizedText(pet.name, locale)}
          className="h-64"
        />
      </Link>
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <Link href={`/${locale}/pets/${pet.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors">
              {getLocalizedText(pet.name, locale)}
            </h3>
          </Link>
          {pet.available && (
            <Badge variant="success">{t('available')}</Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="default">{getLocalizedText(pet.breed, locale)}</Badge>
          <Badge variant={sizeBadgeVariant[pet.size]}>
            {t(pet.size)}
          </Badge>
          <span className="text-sm text-gray-500">
            {pet.age} {t('months')}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {getLocalizedText(pet.description, locale)}
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {pet.vaccinated && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('vaccinated')}
            </span>
          )}
          {pet.neutered && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('neutered')}
            </span>
          )}
        </div>

        <Link href={`/${locale}/pets/${pet.id}`}>
          <Button variant="primary" className="w-full">
            {t('viewDetails')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
