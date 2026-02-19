'use client';

import { useTranslations } from 'next-intl';
import { ProductCategory } from '@/types';

interface ProductFilterProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  const t = useTranslations('shop.categories');

  const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'food', label: t('food') },
    { value: 'toys', label: t('toys') },
    { value: 'accessories', label: t('accessories') },
    { value: 'health', label: t('health') },
    { value: 'grooming', label: t('grooming') },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.value
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
