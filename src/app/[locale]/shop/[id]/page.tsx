'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getLocalizedText, formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const t = useTranslations('shop');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const productId = params.id as string;
  const locale = params.locale as string;
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href={`/${locale}/shop`}>
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}/shop`} className="hover:text-orange-500">
            {t('detail.backToShop')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{getLocalizedText(product.name, locale)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
            <img
              src={product.images[0]}
              alt={getLocalizedText(product.name, locale)}
              className="w-full h-full object-cover"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getLocalizedText(product.name, locale)}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} {t('card.reviews')})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price, locale)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.originalPrice, locale)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <Badge variant="success">{t('detail.inStock')} ({product.stock})</Badge>
              ) : (
                <Badge variant="danger">{t('detail.outOfStock')}</Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('detail.description')}</h3>
              <p className="text-gray-600">{getLocalizedText(product.description, locale)}</p>
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <Button onClick={handleAddToCart} size="lg" className="flex-1">
                  {added ? '✓ Added!' : t('detail.addToCart')}
                </Button>
              </div>
            )}

            {/* Category */}
            <div className="pt-4 border-t">
              <span className="text-sm text-gray-500">Category: </span>
              <Badge>{product.category}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
