'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CheckoutForm from '@/components/shop/CheckoutForm';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutPage() {
  const t = useTranslations('shop.checkout');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('success')}</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order! We will send you a confirmation email shortly.
            </p>
            <Link href="/en">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        <CheckoutForm onSuccess={() => setOrderPlaced(true)} />
      </div>
    </div>
  );
}
