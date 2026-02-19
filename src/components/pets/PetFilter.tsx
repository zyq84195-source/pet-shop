'use client';

import { useTranslations } from 'next-intl';
import { PetSpecies, PetSize } from '@/types';

interface PetFilterProps {
  selectedSpecies: PetSpecies | 'all';
  selectedSize: PetSize | 'all';
  searchQuery: string;
  onSpeciesChange: (species: PetSpecies | 'all') => void;
  onSizeChange: (size: PetSize | 'all') => void;
  onSearchChange: (query: string) => void;
}

export default function PetFilter({
  selectedSpecies,
  selectedSize,
  searchQuery,
  onSpeciesChange,
  onSizeChange,
  onSearchChange,
}: PetFilterProps) {
  const t = useTranslations('pets.filter');

  const speciesOptions: { value: PetSpecies | 'all'; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'dog', label: t('dogs') },
    { value: 'cat', label: t('cats') },
    { value: 'bird', label: t('birds') },
    { value: 'rabbit', label: t('rabbits') },
    { value: 'hamster', label: t('hamsters') },
  ];

  const sizeOptions: { value: PetSize | 'all'; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'small', label: t('small') },
    { value: 'medium', label: t('medium') },
    { value: 'large', label: t('large') },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Species Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">{t('all')}</h3>
        <div className="flex flex-wrap gap-2">
          {speciesOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSpeciesChange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSpecies === option.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">{t('size')}</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSizeChange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSize === option.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
