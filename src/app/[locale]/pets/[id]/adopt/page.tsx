'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPetById } from '@/data/pets';
import AdoptionForm from '@/components/pets/AdoptionForm';
import { getLocalizedText } from '@/lib/utils';

export default function AdoptPage() {
  const params = useParams();
  const locale = params.locale as string;
  const pet = getPetById(params.id as string);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Pet not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}/pets`} className="hover:text-orange-500">
            Pets
          </Link>
          <span>/</span>
          <Link href={`/${locale}/pets/${pet.id}`} className="hover:text-orange-500">
            {getLocalizedText(pet.name, locale)}
          </Link>
          <span>/</span>
          <span className="text-gray-900">Adopt</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <AdoptionForm pet={pet} />
        </div>
      </div>
    </div>
  );
}
