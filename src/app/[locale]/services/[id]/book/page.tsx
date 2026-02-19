'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getServiceById } from '@/data/services';
import BookingForm from '@/components/services/BookingForm';
import { getLocalizedText } from '@/lib/utils';

export default function BookServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const service = getServiceById(params.id as string);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}/services`} className="hover:text-orange-500">
            Services
          </Link>
          <span>/</span>
          <Link href={`/${locale}/services/${service.id}`} className="hover:text-orange-500">
            {getLocalizedText(service.name, locale)}
          </Link>
          <span>/</span>
          <span className="text-gray-900">Book</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <BookingForm service={service} />
        </div>
      </div>
    </div>
  );
}
