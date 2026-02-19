'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';
import ProductCard from '@/components/shop/ProductCard';
import ProductFilter from '@/components/shop/ProductFilter';

export default function ShopPage() {
  const t = useTranslations('shop');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-white/90 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <ProductFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        <p className="text-sm text-gray-500 mb-4">
          {filteredProducts.length} products
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
