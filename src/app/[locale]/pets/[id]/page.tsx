'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getPetById } from '@/data/pets';
import PetGallery from '@/components/pets/PetGallery';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getLocalizedText } from '@/lib/utils';

export default function PetDetailPage() {
  const params = useParams();
  const t = useTranslations('pets');
  const locale = params.locale as string;
  const pet = getPetById(params.id as string);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Pet not found</h1>
          <Link href={`/${locale}/pets`} className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg">
            Back to Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}/pets`} className="hover:text-orange-500">
            {t('detail.backToList')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{getLocalizedText(pet.name, locale)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <PetGallery pet={pet} />

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {getLocalizedText(pet.name, locale)}
                </h1>
                {pet.available && (
                  <Badge variant="success">{t('card.available')}</Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mt-2">
                {getLocalizedText(pet.breed, locale)}
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">{pet.gender === 'male' ? '♂ Male' : '♀ Female'}</Badge>
              <Badge variant="info">{t(`filter.${pet.size}`)}</Badge>
              <Badge variant="default">{pet.age} months old</Badge>
            </div>

            {/* Health Status */}
            <div className="flex flex-wrap gap-4">
              {pet.vaccinated && (
                <div className="flex items-center gap-2 text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{t('card.vaccinated')}</span>
                </div>
              )}
              {pet.neutered && (
                <div className="flex items-center gap-2 text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{t('card.neutered')}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900">{t('detail.about')}</h3>
              <p className="text-gray-600">{getLocalizedText(pet.description, locale)}</p>
            </div>

            {/* Personality */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('detail.personality')}</h3>
              <p className="text-gray-600">{getLocalizedText(pet.personality, locale)}</p>
            </div>

            {/* Adoption Button */}
            <div className="pt-4">
              <Link href={`/${locale}/pets/${pet.id}/adopt`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('detail.adoptButton')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
