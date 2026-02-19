'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { services } from '@/data/services';
import { ServiceCategory } from '@/types';
import ServiceCard from '@/components/services/ServiceCard';

export default function ServicesPage() {
  const t = useTranslations('services');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: { value: ServiceCategory | 'all'; label: string }[] = [
    { value: 'all', label: t('categories.all') },
    { value: 'grooming', label: t('categories.grooming') },
    { value: 'boarding', label: t('categories.boarding') },
    { value: 'veterinary', label: t('categories.veterinary') },
    { value: 'training', label: t('categories.training') },
  ];

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return services;
    return services.filter((service) => service.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-white/90 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
