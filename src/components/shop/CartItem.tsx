'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { getLocalizedText, formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const locale = useLocale();
  const t = useTranslations('shop.cart');
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Product Image */}
      <Link href={`/${locale}/shop/${item.product.id}`} className="shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={item.product.images[0]}
            alt={getLocalizedText(item.product.name, locale)}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/${locale}/shop/${item.product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-orange-500 transition-colors">
            {getLocalizedText(item.product.name, locale)}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(item.product.price, locale)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-4 py-1 text-center min-w-[3rem]">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-50"
              disabled={item.quantity >= item.product.stock}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-sm text-red-500 hover:text-red-600"
          >
            {t('remove')}
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {formatPrice(item.product.price * item.quantity, locale)}
        </p>
      </div>
    </div>
  );
}
