'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Product } from '@/types';
import Card, { CardImage, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { getLocalizedText, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('shop');
  const { addItem } = useCart();

  const categoryColors: Record<string, string> = {
    food: 'bg-green-100 text-green-800',
    toys: 'bg-blue-100 text-blue-800',
    accessories: 'bg-purple-100 text-purple-800',
    health: 'bg-red-100 text-red-800',
    grooming: 'bg-yellow-100 text-yellow-800',
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addItem(product);
    }
  };

  return (
    <Card className="group">
      <Link href={`/${locale}/shop/${product.id}`}>
        <div className="relative">
          <CardImage
            src={product.images[0]}
            alt={getLocalizedText(product.name, locale)}
            className="h-56"
          />
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% {t('card.off')}
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                {t('card.outOfStock')}
              </span>
            </div>
          )}
        </div>
      </Link>
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <Link href={`/${locale}/shop/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors line-clamp-1">
              {getLocalizedText(product.name, locale)}
            </h3>
          </Link>
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[product.category]}`}>
            {t(`categories.${product.category}`)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews} {t('card.reviews')})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price, locale)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice, locale)}
            </span>
          )}
        </div>

        <Button
          variant={product.stock > 0 ? 'primary' : 'secondary'}
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? t('card.addToCart') : t('card.outOfStock')}
        </Button>
      </CardContent>
    </Card>
  );
}
