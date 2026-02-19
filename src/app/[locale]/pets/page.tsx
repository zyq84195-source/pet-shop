'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { pets } from '@/data/pets';
import { PetSpecies, PetSize } from '@/types';
import PetCard from '@/components/pets/PetCard';
import PetFilter from '@/components/pets/PetFilter';

export default function PetsPage() {
  const t = useTranslations('pets');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<PetSize | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      if (selectedSpecies !== 'all' && pet.species !== selectedSpecies) return false;
      if (selectedSize !== 'all' && pet.size !== selectedSize) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = pet.name.en.toLowerCase().includes(query) || 
                           pet.name.zh.toLowerCase().includes(query);
        const matchesBreed = pet.breed.en.toLowerCase().includes(query) || 
                            pet.breed.zh.toLowerCase().includes(query);
        if (!matchesName && !matchesBreed) return false;
      }
      return pet.available;
    });
  }, [selectedSpecies, selectedSize, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-white/90 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="lg:w-72 shrink-0">
            <PetFilter
              selectedSpecies={selectedSpecies}
              selectedSize={selectedSize}
              searchQuery={searchQuery}
              onSpeciesChange={setSelectedSpecies}
              onSizeChange={setSelectedSize}
              onSearchChange={setSearchQuery}
            />
          </aside>

          {/* Pet Grid */}
          <main className="flex-1">
            {filteredPets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filteredPets.length} pets available
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
