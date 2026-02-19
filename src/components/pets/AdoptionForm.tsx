'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { AdoptionFormData, Pet } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getLocalizedText } from '@/lib/utils';

interface AdoptionFormProps {
  pet: Pet;
}

export default function AdoptionForm({ pet }: AdoptionFormProps) {
  const t = useTranslations('pets.adoption');
  const locale = useLocale();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<AdoptionFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    petExperience: '',
    reason: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdoptionFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AdoptionFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.reason.trim()) {
      newErrors.reason = 'Please tell us why you want to adopt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof AdoptionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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
          {t('subtitle')} {getLocalizedText(pet.name, locale)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('subtitle')} <span className="font-semibold text-orange-500">{getLocalizedText(pet.name, locale)}</span>
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

      <Input
        label={t('form.address')}
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        error={errors.address}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.petExperience')}
        </label>
        <textarea
          value={formData.petExperience}
          onChange={(e) => handleChange('petExperience', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Tell us about your experience with pets..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.reason')} <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.reason}
          onChange={(e) => handleChange('reason', e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
            errors.reason ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        {t('form.submit')}
      </Button>
    </form>
  );
}
