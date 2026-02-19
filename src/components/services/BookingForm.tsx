'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { BookingFormData, Service } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getLocalizedText, formatPrice } from '@/lib/utils';

interface BookingFormProps {
  service: Service;
}

export default function BookingForm({ service }: BookingFormProps) {
  const t = useTranslations('services.booking');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.petName.trim()) newErrors.petName = 'Required';
    if (!formData.petType.trim()) newErrors.petType = 'Required';
    if (!formData.date) newErrors.date = 'Required';
    if (!formData.time) newErrors.time = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          {t('form.success')}
        </h2>
        <p className="text-green-600">
          {getLocalizedText(service.name, locale)} - {formData.date} at {formData.time}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold text-orange-500">{getLocalizedText(service.name, locale)}</span>
          {' '}• {formatPrice(service.price, locale)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('form.name')}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
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
      </div>

      <Input
        label={t('form.phone')}
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('form.petName')}
          value={formData.petName}
          onChange={(e) => handleChange('petName', e.target.value)}
          error={errors.petName}
          required
        />
        <Input
          label={t('form.petType')}
          value={formData.petType}
          onChange={(e) => handleChange('petType', e.target.value)}
          error={errors.petType}
          placeholder="e.g., Dog, Cat, Rabbit"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.date')} <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            min={today}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.time')} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.notes')}
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Any special requirements or notes..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        {t('form.submit')}
      </Button>
    </form>
  );
}
