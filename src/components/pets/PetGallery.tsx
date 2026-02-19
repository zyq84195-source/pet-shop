'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Pet } from '@/types';
import { getLocalizedText } from '@/lib/utils';

interface PetGalleryProps {
  pet: Pet;
}

export default function PetGallery({ pet }: PetGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale();

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
        <img
          src={pet.images[selectedIndex]}
          alt={getLocalizedText(pet.name, locale)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {pet.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {pet.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 transition-all ${
                selectedIndex === index
                  ? 'ring-2 ring-orange-500 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`${getLocalizedText(pet.name, locale)} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
