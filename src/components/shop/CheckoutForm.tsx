'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckoutFormData } from '@/types';
import { useCart } from '@/context/CartContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface CheckoutFormProps {
  onSuccess: () => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const t = useTranslations('shop.checkout');
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      clearCart();
      onSuccess();
    }
  };

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('shipping')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('form.firstName')}
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            label={t('form.lastName')}
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
          <Input
            label={t('form.email')}
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <Input
            label={t('form.phone')}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            required
          />
          <Input
            label={t('form.address')}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address}
            className="md:col-span-2"
            required
          />
          <Input
            label={t('form.city')}
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city}
            required
          />
          <Input
            label={t('form.zipCode')}
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('payment')}</h2>
        <div className="space-y-3">
          {(['credit', 'debit', 'cash'] as const).map((method) => (
            <label
              key={method}
              className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === method
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span className="font-medium">{t(`form.${method}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('orderSummary')}</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x Item
              </span>
              <span className="font-medium">
                {formatPrice(item.product.price * item.quantity, 'en')}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t('subtotal')}</span>
              <span>{formatPrice(totalPrice, 'en')}</span>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        {t('placeOrder')}
      </Button>
    </form>
  );
}
