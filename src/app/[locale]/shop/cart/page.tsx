'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/components/shop/CartItem';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const t = useTranslations('shop.cart');
  const locale = useLocale();
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('empty')}</h1>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link href={`/${locale}/shop`}>
              <Button>{t('continueShopping')}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-4 border-b">
                <div className="col-span-6">{t('item')}</div>
                <div className="col-span-2 text-center">{t('quantity')}</div>
                <div className="col-span-2 text-center">{t('price')}</div>
                <div className="col-span-2 text-right">{t('total')}</div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <CartItemCard key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span>{formatPrice(totalPrice, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(totalPrice, locale)}</span>
                </div>
              </div>

              <Link href={`/${locale}/shop/checkout`}>
                <Button size="lg" className="w-full mt-6">
                  {t('checkout')}
                </Button>
              </Link>

              <Link href={`/${locale}/shop`}>
                <Button variant="ghost" className="w-full mt-3">
                  {t('continueShopping')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
